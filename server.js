const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

// User Imports
const connectDB = require("./utils/database");
const viewRoutes = require("./routes/view-routes");
const fileRoutes = require("./routes/file-routes");

// dotenv
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.ALLOWED_CLIENT,
  })
);

// Set up EJS
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Global Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.use("/api/files", fileRoutes);
app.use("/", viewRoutes);

// Database
const PORT = process.env.PORT || 3001;
connectDB();

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
