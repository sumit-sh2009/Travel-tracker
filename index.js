import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let countries = [];

app.get("/", async (req, res) => {
  countries = [];
  const result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach(country => {
    countries.push(country.country_code);
  });
  res.render("index.ejs", { countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  try {
    const data = await db.query("SELECT country_name, country_code FROM countries");
    const result = data.rows.find(
      country => req.body.country.toLowerCase() === country.country_name.toLowerCase()
    );

    if (!result) {
      return res.render("index.ejs", {
        error: "Can't find the country you are looking for.",
        total: countries.length,
        countries,
      });
    }

    const visited = await db.query("SELECT country_code FROM visited_countries");
    const exists = visited.rows.find(
      country => result.country_code === country.country_code
    );

    if (exists) {
      return res.render("index.ejs", {
        error: "Already marked.",
        total: countries.length,
        countries,
      });
    }

    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      result.country_code,
    ]);

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("index.ejs", {
      error: "Unexpected error occurred.",
      total: countries.length,
      countries,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
