require("dotenv").config();
const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const port = process.env.PORT || 3000;

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const routes = require("./routes");
app.use(routes);

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
