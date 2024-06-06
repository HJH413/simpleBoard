import CryptoJS from 'crypto-js';
const secretKey = process.env.REACT_APP_AES_SECRET_KEY;

export const encrypt = (value) => {
    const data = {
        password : value
    }

    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export const decrypt = (value) => {
    let bytes = CryptoJS.AES.decrypt(value, secretKey);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData.password;
}
