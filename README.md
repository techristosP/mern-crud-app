# VIP Events - MERN Stack CRUD App

Welcome to **VIP Events**, a full-stack CRUD application developed using the MERN stack for managing and organizing various events like concerts, theater shows, and more! It uses Auth0 for user authentication and authorization with JWT token. Each user can update their profile information and view all events. Users can also create, update, and delete events that they have created.

## Features
- **User Authentication:** Users can sign up and log in to the app using Auth0. Each user has a profile page where they can view and update their profile information.

- **Create Events:** Easily add new events with details such as name, description, location, date, time, duration, and total capacity.

- **View Events:** User can view all the events he has created in a grid. Each event card displays the event's information and the current number of attendants.
  
- **Update Events:** Modify event information to keep it up-to-date.

- **Delete Events:** Remove unnecessary or canceled events seamlessly.

- **Event Overlap Checking:** Prevent users from creating events that overlap with each other by the same date, time and location.

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

