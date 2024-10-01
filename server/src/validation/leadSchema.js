const yup = require("yup");
const enums = require("../Helper/enums");
const phoneRegExp = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/; // Define your phone number regex here

const createLeadSchema = yup.object().shape({
  body: yup.object().shape({
    project_title: yup.string().required("Project Title is Required"),
    description: yup.string().required("Description is Required"),
    lead_status: yup.string().oneOf(enums.LeadStatus, "Invalid Lead Status").required("Lead Status is Required"),
    lead_source: yup.string().oneOf(enums.LeadSource, "Invalid Lead Source").required("Lead Source is Required"),
    client_name: yup.string().required("Client Name is Required"),
    contact_details: yup.string().required("Contact Details is Required"),
    assigned_to: yup.string().required("Assigned To is Required"),
  }),
});

const updateLeadSchema = yup.object().shape({
  body: yup.object().shape({
    project_title: yup.string().required("Project Title is Required"),
    description: yup.string().required("Description is Required"),
    lead_status: yup.string().oneOf(enums.LeadStatus, "Invalid Lead Status").required("Lead Status is Required"),
    lead_source: yup.string().oneOf(enums.LeadSource, "Invalid Lead Source").required("Lead Source is Required"),
    client_name: yup.string().required("Client Name is Required"),
    contact_details: yup.string().required("Contact Details is Required"),
    assigned_to: yup.string().required("Assigned To is Required"),
  }),
  params: yup.object().shape({
    id: yup
      .mixed()
      .test("is-number", "ID must be a number", (value) => {
        const parsedValue = Number(value);
        return !isNaN(parsedValue) && parsedValue > 0;
      })
      .transform((value, originalValue) => {
        const parsedValue = Number(originalValue);
        return !isNaN(parsedValue) ? parsedValue : originalValue;
      })
      .required("ID is Required"),
  }),
});
const leadParamsIDSchema = yup.object().shape({
  params: yup.object().shape({
    id: yup.string().required("ID is Required"),
  }),
});

module.exports = {
  createLeadSchema,
  updateLeadSchema,
  leadParamsIDSchema,
};
