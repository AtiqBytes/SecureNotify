import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenService } from '../services/token.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly tokenService: TokenService, private reflector: Reflector) {
    console.log('AuthService instantiated with TokenService:', tokenService);
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true; // Allow public access
    }
    try {
      const httpReq: Request = context.switchToHttp().getRequest();

      console.log("jwt auth guard => http request : ", httpReq.rawHeaders)

      const token = httpReq.headers?.authorization?.split(' ')[1];

      console.log("jwt auth guard => token", token)
      
      if (!token) {
        throw new UnauthorizedException('Invalid credentials');
      }
      
      try {
        const result = await this.tokenService.findTokenAndCheckIfExpire(token);

        console.log("jwt auth guard => this is the result of try block : ",result);

    } catch (error) {
        console.error('Error fetching token:', error);
    }

      return super.canActivate(context) as Promise<boolean>;
    } catch (error) {
      console.log('JwtAuthGuard, canActivate => ', error);
      throw new UnauthorizedException(error.message);
    }
  }
}