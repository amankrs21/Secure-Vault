const { decrypt } = require("./Cipher");
const NoteDB = require("../Models/NoteDB");
const VaultDB = require("../Models/VaultDB");


// Validate if required fields are provided
const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            return { isValid: false, message: `${key} is required!` };
        }
    }
    return { isValid: true };
};


// validating key with previous vault or note
const validateKey = async (userID, key) => {
    try {
        const prevVault = await VaultDB.findOne({ createdBy: userID });
        if (prevVault && decryptSafely(prevVault.password, key)) {
            return true;
        }

        const previousNote = await NoteDB.findOne({ createdBy: userID });
        if (previousNote && decryptSafely(previousNote.content, key)) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error validating key:", error);
        return false;
    }
};

const decryptSafely = (data, key) => {
    try {
        decrypt(data, key);
        return true;
    } catch {
        return false;
    }
};


// Exporting the functions
module.exports = { validateFields, validateKey };
