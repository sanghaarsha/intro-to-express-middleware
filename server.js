const express = require("express");
const app = express();
const port = 3000;

// global middleware
app.use(logger);

app.get("/", (req, res) => {
  console.log("Homepage");
  res.send(`
 <h1>Welcome to homepage.</h1>
  <br>
<a href="/users">Users</a>
`);
});

app.get("/users", auth, (req, res) => {
  console.log(`user has admin privilege : ${req.admin}`);
  console.log("User's Page");
  res.send(`
 <h1>Welcome to Users Page.</h1>
  <br>
<a href="/">Home</a>
`);
});

// Creating a middleware, it is just a function that has one extra parameter 'next'
function logger(req, res, next) {
  console.log("path : " + req.originalUrl + "\n");
  next();
}

// Auth middleware
function auth(req, res, next) {
  if (req.query.admin === "true") {
    // setting data from middleware
    req.admin = true;
    next();
    // after calling next() programs returns nothing, meaning its complete
    // NOTE: next() does not replace return in programs
    return;
  } else {
    res.send("<h1>You dont have enough privilage to access this page.</h1>");
  }
}

app.listen(port, () => {
  console.log(`App is live at http://localhost:${port}\n`);
});
