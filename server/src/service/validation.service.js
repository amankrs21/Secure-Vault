const validator = require("validator");


// santize the id
const santizeId = (id) => {
    if (!validator.isMongoId(id)) { return null; }
    return validator.escape(id);
}


// Validate if required fields are provided
const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
        if (value === null || value === undefined) {
            return { isValid: false, message: `${key} is required!` };
        }
    }
    return { isValid: true };
};


// Exporting the functions
module.exports = { santizeId, validateFields };
