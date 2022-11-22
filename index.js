const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const app = express();
const pool = require('./db_connect');
const routes = require('./src/routes/routes');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

app.use("", routes);

app.listen(port, ()=>{console.log("Server listening on port " + port)});

