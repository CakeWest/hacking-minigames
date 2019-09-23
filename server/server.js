const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const AIDatabaseCleaner = require("./util/AI/AIDatabaseCleaner");
const app = express();
const port = process.env.PORT || 5000;

AIDatabaseCleaner.updateTimedOutGames();
AIDatabaseCleaner.updateOldGames();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(cors());
  require("dotenv").config();
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/ai/play", require("./routes/api/ai/play"));

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
