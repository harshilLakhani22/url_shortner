const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const connectToMongoDB = require("./connect");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => console.log("mongodb connecting error ", error));

app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views"));
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Correctly setup body-parser middleware

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server Started At Port :- ${PORT}`));
