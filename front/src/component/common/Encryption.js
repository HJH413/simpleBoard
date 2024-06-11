import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_AES_SECRET_KEY;

// 비밀 키를 16바이트로 맞추는 함수
const formatKey = (key) => {
    return CryptoJS.enc.Utf8.parse(key.padEnd(16, ' '));
};

// 초기화 벡터를 생성하는 함수
const generateIV = () => {
    return CryptoJS.lib.WordArray.random(16);
};

export const encrypt = (value) => {
    const data = {
        password: value
    };

    const formattedKey = formatKey(secretKey);
    const iv = generateIV();
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), formattedKey, {iv: iv});

    // IV와 암호화된 데이터를 함께 반환
    return iv.toString(CryptoJS.enc.Hex) + encrypted.toString();
};

export const decrypt = (encrypted) => {
    const ivHex = encrypted.substring(0, 32); // 첫 32문자는 IV
    const encryptedData = encrypted.substring(32); // 나머지는 암호화된 데이터

    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const formattedKey = formatKey(secretKey);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, formattedKey, {iv: iv});
    const decryptedData = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

    return decryptedData.password;
};
