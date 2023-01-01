const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const connectDB = (app) => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected.");
      app.listen(PORT, () => {
        console.log(`Server listening at ${PORT}`);
      });
    })
    .catch((err) => console.log("Database connection error.", err));
};

module.exports = connectDB;
