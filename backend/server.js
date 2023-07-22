const express = require("express");

require("dotenv").config();
const app = express();


app.use(express.json());


const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send({ msg: "this is base route for Eleva-Tech assignment" });
});



 app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
});
