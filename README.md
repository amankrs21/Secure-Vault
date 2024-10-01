# MERN Vault: Your Secure Organizer

The TodoMERN project leverages the power of the MERN stack (MongoDB, Express, React, Node.js) to provide a robust and secure platform for managing todo lists. It features JWT authentication for secure access and protected routes to ensure that only authenticated users can access certain functionalities.

## Features

- **MERN Stack**: Leverages MongoDB, Express.js, React.js, and Node.js for a robust full-stack JavaScript solution.
- **JWT Authentication**: Implements JSON Web Tokens to manage user sessions securely.
- **Protected Routes**: Restricts access to certain functionalities to authenticated users only.
- **Admin Capabilities**: Admin users can manage user accounts and reset passwords, providing an extra layer of management and security.
- **Dark and Light Mode**: Users can toggle between dark and light themes for a personalized UI experience.
- **Material UI (MUI)**: Utilizes MUI for an attractive and responsive user interface, enhancing usability and accessibility.
- **Responsive Design**: The UI adapts to various screen sizes, ensuring a seamless experience on desktops, tablets, and smartphones.
- **Toaster Notifications**: Incorporates toast notifications for real-time feedback on user actions, such as creating, updating, or deleting todos.


## Technologies Used

- **Frontend**: React.js, React Router, Axios, Material UI, Vite.js
- **Backend**: Express.js, MongoDB, Mongoose, JWT, Bcrypt, Cors, Dotenv
- **Development Tools**: ESLint, Prettier, Concurrently, Nodemon, Vite, Postman


## Installation

To get this project up and running on your local machine, follow the steps below for both the frontend (React) and backend (Express).

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your system.

### Backend Setup

1. **Navigate to the backend directory:**
    
    ```bash
    cd TodoMERN/express
    ```

2. **Install the required packages:**
    
    ```bash
    npm install
    ```

3. **Create a `.env` file in the root of the `express` directory and add the following environment variables:**

    ```env
    MONGO_URI=your_mongodb_uri
    SECRET_KEY=your_jwt_secret
    ```

    Replace `your_mongodb_uri` with your MongoDB connection string and `your_jwt_secret` with a secret key for JWT.

4. **Start the server:**
    
    ```bash
    npm run server
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**
    
    ```bash
    cd TodoMERN/react
    ```

2. **Install the required packages:**
    
    ```bash
    npm install
    ```

3. **Start the development server:**
    
    ```bash
    npm run dev
    ```

## Error Handling
- Make sure your frontend should work on port 5173 and backend on 3000, otherwise you need to make changes in backend index.js and need to provide the new frontend url in allowedOrigins. If you are using different port for backend then you need to change the AuthUser.js baseURL in frontend.
- If you encounter any issues while running the application, please feel free to open an issue on this repository. We will be happy to help you troubleshoot the problem.

## Usage
Once the backend and frontend are set up, you can access the application by navigating to `http://localhost:5173` in your web browser. You can then register a new account or log in with the default credentials:

## Contributers
- Aman Singh - [@amankrs21](https://www.github.com/amankrs21)


## License

This project is private and not licensed.


## Note
Note: This is a project created for educational purposes and is not intended for commercial use.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.