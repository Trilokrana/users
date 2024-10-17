<h1>Users List Application (with Search, Filtering)</h1>h1>
This project is a simple user list application built with React, featuring search and filtering functionality, and lazy loading (infinite scroll) to optimize performance when dealing with a large number of users.

#Getting Started#
These instructions will help you set up and run the project on your local machine for development and testing purposes.

Prerequisites
Make sure you have the following installed:

Node.js: Download and install Node.js from https://nodejs.org.
npm (Node Package Manager): It comes with Node.js installation, but ensure you have the latest version by running:
bash
Copy code
npm install -g npm
Installation
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/users-list-app.git
cd users-list-app
Install dependencies by running the following command in the root directory:

bash
Copy code
npm install
Running the Project
To run the project in development mode, use the following command:

bash
Copy code
npm start
This will launch the application on http://localhost:3000. The page will automatically reload if you make any changes to the code.

Build the Project
To build the app for production, run:

bash
Copy code
npm run build
This will create an optimized build of the app, outputting the files to the build/ directory, ready for deployment.

Running Tests
If you want to run tests (if any are implemented), use:

bash
Copy code
npm test
This will start the test runner in interactive watch mode.

Key Features
User List: Fetches and displays a paginated list of users from an API.
Search and Filter: You can search by a user's name or email. The search query dynamically filters the users list.
Lazy Loading (Infinite Scroll): Users are loaded in chunks as the user scrolls down, optimizing the loading of large datasets.
Logout Functionality: Logs out users and redirects to the login page.
Assumptions and Considerations
API Endpoint: The application fetches data from the ReqRes API (https://reqres.in/api/users). You can replace this with your own API if needed.
Authentication: It assumes a user authentication system is in place. The token stored in localStorage is used to check whether the user is logged in.
Responsive Design: The application is designed to be responsive, supporting mobile, tablet, and desktop views.
Lazy Loading: The application uses infinite scrolling to fetch and display more users when the user scrolls to the bottom of the page.
Search Functionality: The search is done client-side on the users that are already fetched and displayed. For large datasets, consider implementing server-side search.
