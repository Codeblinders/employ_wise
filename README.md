deployed here 
https://employ-wise.onrender.com

## it may take some time to open this site 
## !! try refreshing the page 2 to 3 times

# EmployWise Assignment - User Management Application

This is a React-based user management application that integrates with the ReqRes API to handle authentication, user listing, editing, and deletion. The project follows the assignment guidelines and includes bonus features such as client-side search and React Router navigation.

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Assumptions and Considerations](#assumptions-and-considerations)
- [Bonus Features](#bonus-features)
- [Hosting](#hosting)
- [Contributing](#contributing)
- [License](#license)

## Setup Instructions

### Prerequisites
- Node.js (v14.x or later)
- npm (comes with Node.js)

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/employwise-assignment.git
   cd employwise-assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This command installs all required packages, including `axios` for HTTP requests and `react-router-dom` for navigation.

3. **Run the Application**
   ```bash
   npm start
   ```
   The application will start on `http://localhost:3000`. Open this URL in your browser to access the login page.

4. **Credentials**
   - Email: `eve.holt@reqres.in`
   - Password: `cityslicka`
   Use these credentials to log in and access the user management features.

### Build for Production
To create a production build:
```bash
npm run build
```
This generates an optimized build in the `build` folder, which can be deployed to a hosting service.

## Features
- **Authentication**: Secure login screen with token persistence in localStorage.
- **User Listing**: Paginated display of users with first name, last name, and avatar.
- **User Management**: Edit and delete functionality for each user.
- **Search**: Client-side filtering of users by name.
- **Navigation**: Seamless page transitions using React Router (Login, User List, Edit User).
- **Error Handling**: Graceful handling of API errors with user-friendly messages.
- **Responsive Design**: Works well on both desktop and mobile devices.

## Technologies Used
- **React**: Frontend framework for building the user interface.
- **Axios**: HTTP client for API requests.
- **React Router DOM**: For navigation between pages.
- **CSS Modules**: Custom CSS for styling with a modern, professional look.
- **localStorage**: For persisting login tokens and user updates.

## Assumptions and Considerations
- **Mock API Limitation**: The ReqRes API (https://reqres.in/) is used, which is a mock API that doesn't persist changes (PUT/DELETE return success but don't modify data). To handle this:
  - User updates are stored in `localStorage` under `updatedUsers`.
  - Deleted users are tracked in `localStorage` under `deletedUserIds` and filtered client-side.
  - Updates and deletions persist locally until logout, after which they reset to the original API data.
- **No Backend Persistence**: Since ReqRes doesn't support real data persistence, the application relies on client-side storage. In a production environment, a real backend would be required.
- **ID Consistency**: Assumes user IDs from ReqRes remain stable. If the API rotates data, local updates might not align with new IDs.
- **Error Handling**: Basic form validation uses HTML5 `required` attributes. More sophisticated validation (e.g., email format) could be added but was deemed sufficient for this scope.
- **Performance**: The application fetches data per page load. For larger datasets, pagination or lazy loading could be optimized further.

## Bonus Features
- **Client-side Search and Filtering**: Implemented on the User List page to filter users by name.
- **React Router**: Used for navigation between Login, User List, and Edit User pages.
- **Hosting**: The project can be hosted on free services like Netlify or Vercel. See below for deployment instructions.

## Hosting
To host the application on a free service (e.g., Netlify):
1. Build the project:
   ```bash
   npm run build
   ```
## Login Page
![image](https://github.com/user-attachments/assets/2ccadb1d-1cee-40e9-9b7b-eba553e021bd)

## User Page
![image](https://github.com/user-attachments/assets/3aa15d39-6484-4490-bc7e-8cfac5c0d634)

## EditUser Page
![image](https://github.com/user-attachments/assets/c6198a0b-fc1e-4c7d-b6bc-659728c98f2f)



