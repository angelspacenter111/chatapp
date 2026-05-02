// app.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Routes
const webRoutes = require("./routes/web"); 

app.use("/", webRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Server running on https://cahtapp.netlify.app:${PORT}`);
});
