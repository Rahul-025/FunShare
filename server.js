const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// User Imports
const connectDB = require("./utils/database");
const fileRoutes = require("./routes/file-routes");

// dotenv
dotenv.config();

const app = express();

// Set up EJS
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Global Middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/api/files", fileRoutes);
app.use("/files", fileRoutes);

// Database
connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
