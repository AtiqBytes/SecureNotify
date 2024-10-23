# SecureNotify SSO
SecureNotify is a NestJS-based authentication and authorization service providing JWT tokens and Single Sign-On (SSO) functionality. It manages user onboarding, organization registration, and future notification services like email alerts. SecureNotify integrates with MooToYou, DairyFarm360, and DairyShop360.


## API Reference

#### Create Fake Users

```http
  POST  http://localhost:3000/faker
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `None ` | `null` | **Required**. Running database |

#### Create a User

```http
  POST  http://localhost:3000/user/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username,firstName,lastName,password,email,role,organizationId,organization` | `string` | **Required**. Running database |

#### Login User

```http
  POST  http://localhost:3000/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email,password`      | `string` | **Required**. Running database |

#### View User  Profile

```http
  GET http://localhost:3000/user/profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{{accesssToken}}`      | `string` | **Required**. Jwt Access Token |

#### View Protected Route (Based On Role based Access)

```http
  POST http://localhost:3000/user/profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{{accessToken}}`      | `string` | **Required**. Jwt Access Token |


---

**Secure Notify** is a user authentication and authorization service designed to support single sign-on (SSO) across multiple frontend microservices, such as **Daily Farm 360 UI** or **Daily Shop 360 UI**. It handles user onboarding, including the registration of users and organizations, and generates JWT tokens for secure communication between the backend and frontends.

#### Key Features:

1.  **User & Organization Onboarding**:
    
    -   Allows users and organizations to register.
    -   Supports creating users associated with specific organizations.
2.  **JWT Token Integration**:
    
    -   JWT tokens are issued during user authentication.
    -   These tokens are used to verify requests and are passed to frontend applications via guards (e.g., `JwtAuthGuard`).
3.  **Single Sign-On (SSO)**:
    
    -   Secure Notify manages user sessions and tokens across multiple frontend applications, ensuring seamless SSO functionality.
    -   Tokens generated by Secure Notify are used by frontend services like Daily Farm 360 UI and Daily Shop 360 UI.
4.  **Role-Based Access Control**:
    
    -   Role management is included, with support for different roles (e.g., ADMIN, USER, RIDER).
    -   Guards like `RolesGuard` ensure that only users with the proper roles can access certain resources.

#### Key Components:

1.  **Authentication Module (`auth.module.ts`)**:
    
    -   Responsible for user login and JWT token management.
    -   Integrates with **UsersService** for validating user credentials.
    -   Generates access and refresh tokens for sessions.
2.  **JWT Strategy (`jwt.strategy.ts`)**:
    
    -   Handles the extraction of JWT tokens from HTTP requests.
    -   Verifies the token and checks the user's role before allowing access.
3.  **Token Service (`token.service.ts`)**:
    
    -   Manages token creation, storage, and expiration.
    -   Tokens are stored in the database and linked to user accounts.
    -   On login, previous tokens are cleared, ensuring only one active session per user.
4.  **User Onboarding (`users.controller.ts`)**:
    
    -   Includes endpoints for registering new users and organizations.
    -   Provides signup functionality and basic profile access.
    -   Logout endpoint allows users to terminate their active sessions and clear tokens from the database.
5.  **Guards & Decorators**:
    
    -   `JwtAuthGuard`: Ensures that requests contain a valid JWT token.
    -   `RolesGuard`: Ensures that only users with the required role can access certain endpoints.
    -   `@Roles()`: A decorator used to specify the roles required to access specific routes.
    -   `@Public()`: Marks routes that do not require authentication.
6.  **Token Repository (`token.repository.ts`)**:
    
    -   Handles database operations for saving, updating, and removing tokens.
    -   Ensures that tokens are securely stored and can be managed per session.

#### Project Flow:

1.  **User Registration**:
    
    -   Users sign up via the `/user/signup` endpoint, providing personal and organization details.
    -   The service stores users in the database and links them to their corresponding organization.
2.  **User Login**:
    
    -   Users authenticate by sending credentials to `/auth/login`.
    -   If valid, a JWT token (access and refresh) is returned.
    -   This token is stored in the database and used for subsequent requests.
3.  **Token Verification**:
    
    -   Frontend applications pass the JWT token in requests.
    -   The `JwtAuthGuard` checks the token, and if valid, allows the user to access the required resources.
4.  **Single Sign-On (SSO)**:
    
    -   Once logged in, users can access multiple frontends (e.g., Daily Farm 360 UI) without logging in again.
    -   The JWT token is shared across these micro frontends.
5.  **Logout**:
    
    -   The `/user/logout` endpoint invalidates the active session by removing the user's tokens from the database.

### Technologies Used:

-   **NestJS** for building the API.
-   **TypeORM** for database management with **PostgreSQL**.
-   **JWT** for authentication and session management.

### Important Endpoints:

-   **User Signup**: `/user/signup`
-   **User Login**: `/auth/login`
-   **User Profile**: `/user/profile`
-   **Logout**: `/user/logout`

### Future Improvements:

-   Implement additional permissions for more fine-grained access control.
-   Enhance token security by adding token blacklisting upon logout.
---


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Demo
## Installation

Install my-project with npm

```bash
  cd my-project
  npm install 
 ```


## Deployment

To deploy this project run

```bash
  npm run start:dev
```


## Documentation

1.  [Jwt](https://jwt.io/)

2.  [Passport Js](https://docs.nestjs.com/recipes/passport)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You can customize it the way you want :

`DB_PORT='5432'`

`DB_USERNAME='postgres'`

`DB_PASSWORD='root'`

`DB_DATABASE='SecureNotifyy_db'`


# FAQS


---





## Features

-   Role-Based Access Control (RBAC)
-   JSON Web Token (JWT) Authentication
-   Customizable Authentication Flow
-   Single Sign-On (SSO)
-   Environment Variable Configuration
-   Database Support (PostgreSQL with TypeORM)
-   Error Handling and Logging
-   Cross-Platform Compatibility
-   Token Management (Access and Refresh Tokens)
-   User and Organization Management
-   Guard and Decorator Support (e.g., `JwtAuthGuard`, `RolesGuard`)

4o

## Feedback

If you have any feedback, please reach out to me at https://www.linkedin.com/in/atiq-ur-rehman-1314712aa/



# Hi, I'm Atiq Ur Rehman! 👋


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/AtiqBytes)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/atiq-ur-rehman-1314712aa/)








``


  
  



---


## Running Tests

To run tests, run the following command

```bash
  npm run test
```
unit tests : 
 ```
 
 npm run test
 ```

 e2e tests : 
```
$ npm run test:e2e
```
test coverage: 
```

 npm run test:cov
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/AtiqBytes/passport-jwt-nestjs.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

