# VIP Events - MERN Stack CRUD App

Welcome to **VIP Events**, a full-stack CRUD application developed using the MERN stack for managing and organizing various events like concerts, theater shows, and more!

## Features

- **Create Events:** Easily add new events with details such as name, description, location, date, time, duration, total capacity, and current number of attendants.
  
- **Update Events:** Modify event information to keep it up-to-date.

- **Delete Events:** Remove unnecessary or canceled events seamlessly.

## Tech Stack

- **Frontend:** React.js for a dynamic and responsive user interface.

- **Backend:** Node.js and Express.js for server-side logic.

- **Database:** MongoDB for efficient data storage, including user and event information.

## Getting Started

1. **Install dependencies and build:**

   ```bash
   # In the root directory:
   npm install
   cd frontend
   npm install
   npm run build
   ```
2. **Set up MongoDB:**

    1.  Make sure you have a MongoDB instance running.
    2.  Rename the .env.example file to .env and update the MONGO_URI variable with your MongoDB connection string. 
    3.  Change the JWT_SECRET to what you want.
    ```
    PORT = 5000
    NODE_ENV = development
    MONGO_URI = your mongodb uri
    JWT_SECRET = secret
    ```
    

3. **Run the development server:**
    ```bash
    # In the root directory:
    # Run frontend (:3000) & backend (:5000)
    npm run dev

    # Run backend only
    npm run server
    ```

4. **Open the app:**
    
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

