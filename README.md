# React Notes App

# Introduction
A web application with CRUD (Create, Retrieve, Update, Delete) functionality built using MERN stack (MongoDB, Express, React, Node.js) that allows the user to view, create, update and delete notes in the form of visual cards.

# Tech stacks used

* MongoDB - For database functionality
* Express - For handling server side (backend) functions
* React - For frontend and client side functions
* Node.js - For backend functions

# Prerequisites
Before you begin, ensure you have met the following requirements:
 *  Node.js: Make sure you have Node.js installed. You can download it from nodejs.org.
 * MongoDB: You will need a MongoDB instance. You can set up one locally or use a cloud-hosted solution like MongoDB Atlas.

# Approach
## Backend
### General
* Express routers are used to handle user and note functions.
* Mongoose is used to handle MongoDB connection.

  ### Creating Notes
   
    * Notes are in JSON form containing title and body.
    * The user for which note is created is identified from token.
    * Uses save method from Mongoose.

   ### Retrieving Notes
     * An HTTP GET request is sent.
     * The user ID is identified from token and the DB is searched for notes having user ID of current user.
     * Uses find method from Mongoose.
     * The notes are then sent back in JSON form.

  ### Updating Notes
    * An HTTP PATCH request is sent to the API whose header contains the ID of the required note.
    * The new title and body is sent in JSON form.
    * It uses findByIdAndUpdate method from Mongoose.

  ### Deleting Notes
    * An HTTP DELETE request is sent to the API.
    * It uses findByIdAndDelete method from Mongoose.
 
  ## Installation
  ####  1.Clone The Repository
  ```
   https://github.com/hemantsinghparihar/notes.git
  ```

  #### 2.Navigate to the repository
  ``` cd notes ```

  #### 3.Install server dependencies
  ```
      cd server
      npm i
   ```

  #### 4. Install frontend dependencies
  ```
  cd client
  npm i
  ```

  #### Run mongo db server
  run this command in terminal
  ```
  mongod
  ```

  #### run server
  ```
  cd server
  npm run dev
  ```

  #### run frontend
  ```
  cd client
  npm run dev
  ```
  
  
  
  
