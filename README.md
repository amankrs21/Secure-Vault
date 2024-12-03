# Secure-Vault: Your Secure Organizer

The Security-Vault project leverages the power of the MERN stack (MongoDB, Express, React, Node.js) to provide a robust and secure platform for managing todo lists. It features JWT authentication for secure access and protected routes to ensure that only authenticated users can access certain functionalities.

Explore Our SecureVault🔒 – a powerful password manager and note storage app built with MERN, designed for ultimate privacy and top-notch security!🛡️ Your passwords and notes are encrypted 🔐 using advanced cipher text and Base64 encryption🚀, accessible only with your personal PIN🔑. Even we can’t decrypt your data!
If you lose your PIN,⚠️ all your encrypted information is gone forever!🗝️ This ensures maximum protection.
Secure✅ your digital life with confidence💪 and peace of mind!🧠

## Features

- **Password Encryption**: Encrypts user passwords using bcrypt to ensure secure storage in the database.
- **Note Encryption**: Encrypts user notes using AES encryption to ensure secure storage in the database.
- **Base64 Encryption**: Encrypts user notes using Base64 encryption to ensure secure storage in the database.
- **PIN Protection**: Requires users to set a PIN for accessing their encrypted passwords and notes, adding an extra layer of security.
- **MERN Stack**: Leverages MongoDB, Express.js, React.js, and Node.js for a robust full-stack JavaScript solution.
- **JWT Authentication**: Implements JSON Web Tokens to manage user sessions securely.
- **Protected Routes**: Restricts access to certain functionalities to authenticated users only.
- **Material UI (MUI)**: Utilizes MUI for an attractive and responsive user interface, enhancing usability and accessibility.
- **Responsive Design**: The UI adapts to various screen sizes, ensuring a seamless experience on desktops, tablets, and smartphones.
- **Toaster Notifications**: Incorporates toast notifications for real-time feedback on user actions, such as creating, updating, or deleting todos.


## Technologies Used

- **Frontend**: React.js, React Router, Axios, Material UI, Vite.js
- **Backend**: Express.js, MongoDB, Mongoose, JWT, Bcrypt, Cors, Dotenv, cypher-js
- **Development Tools**: ESLint, Prettier, Concurrently, Nodemon, Vite, Insonmia


## Installation

To get this project up and running on your local machine, follow the steps below for both the frontend (React) and backend (Express).

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your system.

### Backend Setup

1. **Navigate to the backend directory:**
    
    ```bash
    cd Security-Vault/server
    ```

2. **Install the required packages:**
    
    ```bash
    npm install
    ```

3. **Create a `.env` file in the root of the `server` directory and add the following environment variables:**

    ```env
    - MONGO_URI = "mongodb+srv://username:<password>@cluster0.nbgt3.mongodb.net/?retryWrites=true&w=majority"
    - SECRET_KEY = "i=UGrwJW8Bdp;twly82YdE=lwl!kav;lguCY/m" (EXAMPLE)
    - PASSWORD_KEY = "7Zrdf1sxdUGrwJW8BdGrwJl!kaE=lyptF0Rfd" (EXAMPLE)
    ```
    Note: Replace the `MONGO_URI` with your MongoDB connection string and generate a unique `SECRET_KEY` and `PASSWORD_KEY` for security purposes.
4. **Start the server:**
    
    ```bash
    npm run dev
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**
    
    ```bash
    cd Security-Vault/client
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