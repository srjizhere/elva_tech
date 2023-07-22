const editCompanyController = 
  async (req, res) => {
    const companyId = req.params.companyId;
    const {
      companyName,
      companyDescription,
      contactNumber,
      contactEmail,
      logoUploaded,
      State,
      City,
    } = req.body;

    if (
      !companyName ||
      !companyDescription ||
      !contactNumber ||
      !contactEmail ||
      !logoUploaded ||
      !State ||
      !City
    ) {
      return res.status(400).send({ err: "All fields are required" });
    }

    try {
      // Check if the company with the given ID exists
      const company = await CompanyModel.findById(companyId).exec();
      if (!company) {
        return res.status(404).send({ err: "Company not found" });
      }
      const existingCompany = await CompanyModel.findOne({
        $and: [
          { _id: { $ne: companyId } },
          { $or: [{ companyName }, { contactEmail }, { contactNumber }] },
        ],
      }).exec();

      if (existingCompany) {
        return res
          .status(409)
          .send({
            err: "Another company with the same email or contact number already exists",
          });
      }

      // Update the company details
      company.companyName = companyName;
      company.companyDescription = companyDescription;
      company.contactNumber = contactNumber;
      company.contactEmail = contactEmail;
      company.logoUploaded = logoUploaded;
      company.State = State;
      company.City = City;

      const updatedCompany = await company.save();
      console.log("Company updated", updatedCompany);
      return res.status(200).send(updatedCompany);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ err: error.message });
    }
  };


  const getAllCompanyComtroller = async (req, res) => {
    try {
      let allCompanies = await CompanyModel.find().exec();
      return res.status(200).send({ allCompanies });
    } catch (error) {
      return res.status(500).send({ err: error.message });
    }
  };

  const postNewCompanyController = async (req, res) => {
    let {
      companyName,
      companyDescription,
      contactNumber,
      contactEmail,
      logoUploaded,
      State,
      City,
    } = req.body;

    if (
      !companyName ||
      !companyDescription ||
      !contactNumber ||
      !contactEmail ||
      !logoUploaded ||
      !State ||
      !City
    ) {
      return res.status(400).send({ err: "All fields are required" });
    }

    try {
      let anotherCompany = await CompanyModel.findOne({
        $or: [{ companyName }, { contactEmail }, { contactNumber }],
      }).exec();

      if (anotherCompany)
        return res.status(409).send({ err: "Another User already present" });

      const newCompany = new CompanyModel({
        companyName,
        companyDescription,
        contactNumber,
        contactEmail,
        logoUploaded,
        State,
        City,
      });

      const savedCompany = await newCompany.save();
      console.log("new Company saved", savedCompany);
      return res.status(201).send(savedCompany);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ err: error.message });
    }
  };


  module.exports = {
    getAllCompanyComtroller,postNewCompanyController,editCompanyController
  }