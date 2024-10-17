<h1>Users List Application (with Search, Filtering)</h1>
This project is a simple user list application built with React, featuring search and filtering functionality, and lazy loading (infinite scroll) to optimize performance when dealing with a large number of users.

<h3>Getting Started</h3>
These instructions will help you set up and run the project on your local machine for development and testing purposes.

<h4>Prerequisites</h4>
Make sure you have the following installed:

Node.js: Download and install Node.js from https://nodejs.org.<br>
npm (Node Package Manager): It comes with Node.js installation, but ensure you have the latest version by running:
<br>
npm install -g npm
<br>

Installation:
<br>

Clone the repository to your local machine:<br>

git clone https://github.com/Trilokrana/users.git<br>
cd users<br>

Install dependencies by running the following command in the root directory:<br>
npm install
<br>

Running the Project<br>
To run the project in development mode, use the following command:<br>

npm start
This will launch the application on http://localhost:3000. The page will automatically reload if you make any changes to the code.

Build the Project
To build the app for production, run:

npm run build
This will create an optimized build of the app, outputting the files to the build/ directory, ready for deployment.

Running Tests
If you want to run tests (if any are implemented), use:


npm test
This will start the test runner in interactive watch mode.

<h4>Key Features</h4>h4>
User List: Fetches and displays a paginated list of users from an API.
Search and Filter: You can search by a user's name or email. The search query dynamically filters the users list.
Logout Functionality: Logs out users and redirects to the login page.
Assumptions and Considerations
API Endpoint: The application fetches data from the ReqRes API (https://reqres.in/api/users). You can replace this with your own API if needed.
Authentication: It assumes a user authentication system is in place. The token stored in localStorage is used to check whether the user is logged in.
Responsive Design: The application is designed to be responsive, supporting mobile, tablet, and desktop views.
Lazy Loading: The application uses infinite scrolling to fetch and display more users when the user scrolls to the bottom of the page.
Search Functionality: The search is done client-side on the users that are already fetched and displayed. For large datasets, consider implementing server-side search.
