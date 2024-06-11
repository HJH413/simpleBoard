package com.simpleboard.api.common;

import lombok.extern.slf4j.Slf4j;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

@Slf4j
public class BoardAESCrypto {

    private static final String AES_SECRET_KEY = "simpleBoard";
    private static final SecretKeySpec KEY;

    static {
        KEY = new SecretKeySpec(padKey(AES_SECRET_KEY.getBytes(StandardCharsets.UTF_8)), "AES");
    }

    private static byte[] padKey(byte[] keyBytes) {
        byte[] paddedKey = new byte[16];
        System.arraycopy(keyBytes, 0, paddedKey, 0, Math.min(keyBytes.length, paddedKey.length));
        return paddedKey;
    }

    // 비번 암호화
    public static String encrypt(String decryptedPassword) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

        // 무작위 IV 생성
        SecureRandom random = new SecureRandom();
        byte[] ivBytes = new byte[16];
        random.nextBytes(ivBytes);
        IvParameterSpec iv = new IvParameterSpec(ivBytes);

        cipher.init(Cipher.ENCRYPT_MODE, KEY, iv);
        byte[] encryptedBytes = cipher.doFinal(decryptedPassword.getBytes(StandardCharsets.UTF_8));

        // IV와 암호화된 데이터를 함께 반환
        byte[] encryptedDataWithIv = new byte[ivBytes.length + encryptedBytes.length];
        System.arraycopy(ivBytes, 0, encryptedDataWithIv, 0, ivBytes.length);
        System.arraycopy(encryptedBytes, 0, encryptedDataWithIv, ivBytes.length, encryptedBytes.length);

        return Base64.getEncoder().encodeToString(encryptedDataWithIv);
    }

    // 비번 디코딩
    public static String decrypt(String encryptedPassword) throws Exception {
        byte[] encryptedDataWithIv = Base64.getDecoder().decode(encryptedPassword);

        // IV 추출
        byte[] ivBytes = new byte[16];
        System.arraycopy(encryptedDataWithIv, 0, ivBytes, 0, ivBytes.length);
        IvParameterSpec iv = new IvParameterSpec(ivBytes);

        // 암호화된 데이터 추출
        byte[] encryptedBytes = new byte[encryptedDataWithIv.length - ivBytes.length];
        System.arraycopy(encryptedDataWithIv, ivBytes.length, encryptedBytes, 0, encryptedBytes.length);

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, KEY, iv);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }
}
