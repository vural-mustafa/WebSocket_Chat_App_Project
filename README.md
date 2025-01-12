# WebsocketChatApp

# Code Overview

## Dependencies

- expressjs - The server for handling and routing HTTP requests
- jsonwebtoken - For generating JWTs used by authentication
- mongoose - For modeling and mapping MongoDB data to JavaScript 
- bcrypt - Hashing Password
- dotenv - Zero-Dependency module that loads environment variables
- body-parser - For parse the req.body
- cookie-parser - Used for parse cookie
- ejs - View engine
- websocket - for send realtime data

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `controllers/` - This folder contains controllers for our API.
- `public/` - This folder contains static files for our API.
- `middlewares/` - This folder contains middlewares for our API.
- `repository/` - This folder contains database process.
- `service/` - This folder contains repository process.
- `views/` - This folder contains view files (ejs view engine) .
