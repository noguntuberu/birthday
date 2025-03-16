# Software Requirements Document (SRD)

## 1. Introduction
### 1.1 Purpose
The Birthday Web App is a simple web-based application that allows users to register, store their birthdays, and connect with other users via usernames. The system will provide birthday reminders and allow users to view friends’ birthdays.

### 1.2 Scope
The application will include user authentication, birthday management, and a friend connection system. Users will be able to:
- Register and log in securely
- Store and update their birth date
- Search and connect with other users via usernames
- Receive birthday reminders for connected friends

### 1.3 Definitions, Acronyms, and Abbreviations
- **SRD**: Software Requirements Document
- **UI**: User Interface
- **UX**: User Experience
- **DB**: Database
- **Auth**: Authentication

## 2. Functional Requirements
### 2.1 User Registration and Authentication
- Users must be able to create an account with a username, email, and password.
- The system must provide secure login functionality.
- Passwords must be encrypted and stored securely.
- Users must have the option to reset their password via email.

### 2.2 Birthday Management
- Users can enter and edit their birth date.
- The birth date should not be publicly visible except to connected friends.

### 2.3 Friend Connection System
- Users can search for other users by username.
- Users can send and accept friend requests.
- Users can view a list of their connected friends.

### 2.4 Birthday Notifications
- The system should notify users of upcoming birthdays of their connected friends.
- Users should have the ability to enable or disable notifications.

## 3. Non-Functional Requirements
### 3.1 Security
- User authentication should follow industry standards (e.g., hashed passwords, secure sessions).
- The application should prevent SQL injection and other common security threats.

### 3.2 Performance
- The system should handle concurrent user requests efficiently.
- The birthday lookup feature should have a response time of less than 1 second.

### 3.3 Usability
- The UI should be simple and intuitive.
- The app should be mobile-friendly and responsive.

### 3.4 Scalability
- The system should allow future enhancements, such as integration with social media or additional notification options.

## 4. System Architecture
### 4.1 Frontend
- HTML, CSS, JavaScript (React)

### 4.2 Backend
- Node.js with Express
- RESTful API endpoints

### 4.3 Database
- MongoDB for storing user data and connections

## 5. Constraints
- The system should comply with data privacy regulations (GDPR, etc.).
- The username must be unique and no longer than 30 characters.
