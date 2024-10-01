// importing Modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const restApis = require("./src/routes");
const DB = require("./src/dbConfig/mdbConnection");
const moment = require("moment");
const path = require("path");
const fs = require("fs");

// App Configuration
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// static serves
app.use("/static/files", express.static("./upload"));

// Sync Database

// API Routes
app.use("/api/", restApis);

// api status route
app.get("/status", (req, res) => {
  res.status(200).json({
    status: "Healthy",
    API: "Lead Management API",
    version: 1.0,
    developer: "Muhammad Afaq Khan",
  });
});

// server.listen(PORT, () => console.log(`CRM Is running on ${ENV.BASE_URL}`));
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
