# CRUD Application with Node.js and MongoDB

## Overview
This project is a fully functional CRUD (Create, Read, Update, Delete) application built using Node.js and MongoDB. The application includes advanced features like form validation, pagination, search functionality, soft delete, and multiple record deletion, ensuring a user-friendly and robust data management system.

---

## Features
1. **CRUD Operations**
   - Create, Read, Update, and Delete records.
   - Fields include:
     - Name: Full name of the user.
     - Email: User's email address.
     - Phone: User's phone number.
     - Image: Image URL or path.
     - Status: Active or Inactive status.
     - Created Date: Record creation timestamp.
     - Updated Date: Record update timestamp.

2. **Form Validation**
   - Uses `express-validator` to ensure the following:
     - Name: Not empty and is a string.
     - Email: Valid email format.
     - Phone: Only digits with valid phone format.
     - Image: Valid URL or file type.
     - Status: Boolean value.

3. **Search Functionality**
   - Search records by Name, Email, or Phone.

4. **Pagination**
   - Display records with page numbers for navigation.
   - Option to choose the number of records .

5. **Integrated Search with Pagination**
   - Filtered results are paginated seamlessly.

6. **Soft Delete**
   - Mark records as inactive (`status: false`) instead of permanently deleting them.
   - Exclude soft-deleted records from the active records list.

7. **Multiple Record Deletion**
   - Delete multiple records simultaneously with options for soft delete or permanent deletion.

---

## Tools & Technologies
- **Backend**: Node.js (Express.js)
- **Database**: MongoDB (via Mongoose)
- **Validation**: `express-validator`
- **Pagination**: Custom logic or a pagination library
- **Image Handling**: `multer`

---

## Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- Package Manager (e.g., npm or yarn)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Deeppatel-4032/CRUD_Record_Project.git
   cd crud-nodejs-mongodb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:8000`.


## Folder Structure
```
crud-nodejs-mongodb/
├── controllers/     # Controllers for handling requests
├── models/          # Mongoose schemas
├── routes/          # API routes
├── middlewares/     # Custom middlewares (e.g., validation)
├── public/          # Static files
├── views/           # Frontend templates (if applicable)
├── .env             # Environment variables
├── index.js           # Main application entry point
├── package.json     # Dependencies and scripts
```


## Contributors
- **Your Name** - [GitHub Profile](https://github.com/Deeppatel-4032)

---

