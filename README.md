# Digital Contact Book

A simple app to add, view, search, edit and delete contacts.

- `backend/` - Spring Boot REST API (Java 17, Maven, MySQL)
- `frontend/` - React app (Vite, axios)

## Requirements

- Java 17 or newer
- Maven
- MySQL
- Node.js 18 or newer

## How to run

### 1. Create the database

Log in to MySQL and run:

```sql
CREATE DATABASE contact_book;
```

The `contacts` table is created automatically when the backend starts.

### 2. Set your MySQL username and password

Open `backend/src/main/resources/application.properties` and change these two lines:

```
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Start the backend

```
cd backend
mvn spring-boot:run
```

The API runs at http://localhost:8080/api/contacts

### 4. Start the frontend

Open a second terminal:

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## API endpoints

| Method | URL                            | Description         |
|--------|--------------------------------|---------------------|
| GET    | /api/contacts                  | Get all contacts    |
| GET    | /api/contacts/search?name=xyz  | Search by name      |
| POST   | /api/contacts                  | Add a contact       |
| PUT    | /api/contacts/{id}             | Update a contact    |
| DELETE | /api/contacts/{id}             | Delete a contact    |
