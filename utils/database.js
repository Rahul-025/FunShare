const mongoose = require("mongoose");
const cron = require("node-cron");
const cronJob = require("./cron-job");

const PORT = process.env.POR || 3001;

const connectDB = (app) => {
  mongoose.set("strictQuery", true);
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
      cron.schedule("0 */8 * * *", cronJob, {
        scheduled: true,
      });
    })
    .catch((err) => console.log("Database connection error.", err));
};

module.exports = connectDB;
