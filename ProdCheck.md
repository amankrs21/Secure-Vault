## Security Vault Deployment Checks

### Backend-Express Check
1. In the indexProd.js file comment out the "Middleware to log all the requests"

2. In the indexProd.js file comment out the "setting up the server locally run" and enable the "setting up the server for production"

3. Setup the CORS access for the frontend to access the backend.

4. Configure the .env file with the following variables:
    - MONGO_URI = "mongodb+srv://username:<password>@cluster0.nbgt3.mongodb.net/?retryWrites=true&w=majority"
    - SECRET_KEY = "i=UGrwJW8B1nwlyY9y;bM!4v;lguCY/m" (EXAMPLE)
    - PASSWORD_KEY = "7Zrdf1sxdCZs&mri?&0@CY&0m!kaE=lyptF0Rfd" (EXAMPLE)



### Frontend-React Check
1. In the src/components/AuthUser.jsx change the baseURL to the backend server URL. (Like - https://security-vault.onrender.com)


### Database-MongoDB Check
