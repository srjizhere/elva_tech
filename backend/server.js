const express = require("express");
const cors = require('cors')
require("dotenv").config();
const app = express();

const { connection } = require("./config/db");
const { CompanyModel } = require("./model/company.model");


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send({ msg: "this is base route for Eleva-Tech assignment" });
});


const startServer = async () => {
  try {
    await connection;
    console.log("connection to DB sucessfully");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
startServer();

