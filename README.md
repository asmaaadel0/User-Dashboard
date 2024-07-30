# User Dashboard Application

## Overview
The User Dashboard application is an Angular-based web application that displays user information and allows for searching and viewing user details. The application utilizes Angular Material for UI components and includes features like pagination, search functionality, and user detail view. Caching mechanisms are implemented to optimize performance by reducing redundant HTTP requests.

## Features
User List View: Display a list of users with pagination and the ability to load more users.
User Detail View: View detailed information for a specific user.
Search by ID: Search for users by their ID and view their details.
Loading Indicators: Visual feedback with progress bars during data fetching.
# Getting Started
## Prerequisites
Node.js (v14 or later)
Angular CLI
## Installation
### Clone the Repository:
git clone https://github.com/asmaaadel0/User-Dashboard.git
cd User-Dashboard
### Install Dependencies:
npm install

## Configuration
### Update API URL (if needed):
If you need to change the API URL, modify the apiUrl property in src/app/user.service.ts.
## Running the Application
### Development Server:
Start the development server to run the application locally:
ng serve

### Production Build:
Build the application for production:
ng build --prod

## Features and Functionality
### Header:
- Search by ID: Use the input field to search for users by their ID.
### User List:
- Displays a paginated list of users.
- Click on a user to view their details.
- Pagination controls to navigate between pages and load more users.
### User Detail Card:
- Shows detailed information of the selected user, including avatar, name, and email.
- Button to navigate back to the user list.
### Code Structure
src/app/user.service.ts: Service for handling user-related API requests with caching.
src/app/user-list/user-list.component.ts: Component for displaying the list of users.
src/app/user-list/user-list.component.html: Template for the user list view.
src/app/user-list/user-list.component.css: Styles for the user list view.
src/app/user-detail/user-detail.component.ts: Component for displaying user details.
src/app/user-detail/user-detail.component.html: Template for the user detail view.
src/app/user-detail/user-detail.component.css: Styles for the user detail view.

## Contributing
Feel free to open issues or submit pull requests for improvements or bug fixes.
