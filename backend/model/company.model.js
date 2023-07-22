const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { required: true, type: String },
  companyDescription: { required: true, type: String },
  contactNumber: { required: true, type: Number },
  contactEmail: { required: true, type: String },
  logoUploaded: { type: String },
  State: { required: true, type: String },
  City: { required: true, type: String },
});

const CompanyModel = mongoose.model("Company", companySchema);
module.exports = {
  CompanyModel,
};
