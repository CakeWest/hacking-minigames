const express = require("express");
const path = require("path");

const app = express();

// CORS
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mongoose
const mongoURI = require("./config/keys").mongoURI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API
app.use("/api/ai/play", require("./routes/api/ai/play"));
app.use("/api/ai/scores", require("./routes/api/ai/scores"));

// SPA
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Serve
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
