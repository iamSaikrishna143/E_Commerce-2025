const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectDb } = require("./db/connection");
dotenv.config();
app.use(express.json()); // ✅ Enables JSON body parsing
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data

const port = process.env.PORT || 5000;
const cors = require("cors");
const { readdirSync } = require("fs");
// app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cors({
  origin: 'http://localhost:5173', // Remove the trailing slash
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
// app.get('/',)
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

app.use(express.json());

connectDb();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
