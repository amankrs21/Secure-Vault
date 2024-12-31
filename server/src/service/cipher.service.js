const crypto = require('crypto');

const passwordKey = process.env.PASSWORD_KEY;


// function to encrypt the password
const encrypt = (text, key) => {
    key = decodeURIComponent(encodeURIComponent(atob(key)));
    let finalKey = Buffer.from(key + passwordKey.slice(key.length), 'utf-8').slice(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', finalKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return iv.toString('hex') + ':' + encrypted + ':' + authTag;
};


// function to decrypt the password
const decrypt = (text, key) => {
    key = decodeURIComponent(encodeURIComponent(atob(key)));
    let finalKey = Buffer.from(key + passwordKey.slice(key.length), 'utf-8').slice(0, 32);
    const textParts = text.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedText = Buffer.from(textParts[1], 'hex');
    const authTag = Buffer.from(textParts[2], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', finalKey, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};


// export the functions
module.exports = { encrypt, decrypt };
