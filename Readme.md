# Visited Countries Tracker 🌍

A Node.js + Express + PostgreSQL web app that allows users to track the countries they have visited.  
Users can input a country name, and the app checks if it exists in the master `countries` table.  
If valid and not already added, it is stored in the `visited_countries` table and displayed on the home page.

---

## Features

- Add visited countries by typing the country name
- Case-insensitive matching
- Prevents duplicates from being added
- Displays total count of visited countries
- Uses PostgreSQL for persistent data storage
- Simple EJS-based UI

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Backend runtime |
| Express.js | Server framework |
| PostgreSQL | Database |
| EJS | Template rendering |
| Body-Parser | Handling form submissions |

---

## Setting Up the Project

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-folder>

### 2. Install dependencies
npm install

3. Install Dependencies
npm install

4. Create the Database

Open pgAdmin or psql, then run:

CREATE DATABASE world;

Create Required Tables
CREATE TABLE countries (
  country_name VARCHAR(100),
  country_code VARCHAR(10) PRIMARY KEY
);

CREATE TABLE visited_countries (
  country_code VARCHAR(10) REFERENCES countries(country_code)
);

(Optional) Insert Starter Countries
INSERT INTO countries (country_name, country_code) VALUES
('India', 'IN'),
('Japan', 'JP'),
('Canada', 'CA'),
('Brazil', 'BR'),
('United States', 'US');

5. Environment Variables Setup

Create a file named .env in the project root:

DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=your_postgres_password
DB_NAME=world
DB_PORT=5432


Important: Do not upload .env to GitHub.
Ensure .env is listed in .gitignore.

6. Start the Server
node index.js


or if using nodemon:

nodemon index.js

7. Open the App

Go to:

http://localhost:3000


You can now add countries and track your visited list.

8. Project Structure
project-folder/
│
├── public/           # Static files
├── views/
│   └── index.ejs     # Frontend page
├── index.js          # Main server code
├── .env              # Your database credentials (not pushed)
└── package.json

9. Notes

Each person running this project will use their own local database.

The project does not connect to any remote or shared database.

If someone else clones your project, they must repeat the setup steps.

Done! The project is now fully set up and running locally.
