const express = require('express');
const { getAllCompanyComtroller, postNewCompanyController, editCompanyController } = require('../controller/company.Controller');

const companyRouter = express.Router();

app.get("/getall",getAllCompanyComtroller);
app.post("/post",postNewCompanyController);
app.put("/edit/:id",editCompanyController);

module.exports = {
    companyRouter
}