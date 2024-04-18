
/* 产引入jsencrypt实现数据RSA加密 */
import JSEncrypt from 'jsencrypt' // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 产引入encryptlong实现数据RSA加密 */
import Encrypt from 'encryptlong' // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。

// 密钥对生成 http://web.chacuo.net/netrsakeypair

// 公钥key
const publicKey =
  "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJm9GoXf7VgfOMzCVzAHndvLUzosXHMDAYLJzwezZL1UAZukXWosvFYONY1J1sLZqq9c0nB4v1Hz08RbZRDfmP0CAwEAAQ==";
// 私钥key
const privateKey =
  "MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAmb0ahd/tWB84zMJXMAed28tTOixccwMBgsnPB7NkvVQBm6Rdaiy8Vg41jUnWwtmqr1zScHi/UfPTxFtlEN+Y/QIDAQABAkAMazgvRE155tvBvpkoahUYYi5Q7rBxIfcHR6IPrzAeEwDzA6qKxUFRPE3liATABhwMQ7cYmAqGNTqmZw+xSxdBAiEA2nLb98Jits6hLzRY6JJK9p2VEJgXLkXDfoPAwv/GQMUCIQC0KpcxBbUglcH7IvqvUvIfBCe6SWJJRjqLCvEv1M8K2QIhALrxcqeL9diF6lCwVqnpkDeO0eOalLPnxg5+CDeYlfwVAiEAhKEZ3f+6n/s+6taMPsbL8KNJb6yYCyME89ihRrndlLkCIBlDtrIfpQ2qk17VCGQu6J/a6DNTMEGZ+03WpuWa955h";

export default {
    /* JSEncrypt加密 */
    rsaPublicData(data) {
        var jsencrypt = new JSEncrypt()
        jsencrypt.setPublicKey(publicKey)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        var result = jsencrypt.encrypt(data)
        return result
    },
    /* JSEncrypt解密 */
    rsaPrivateData(data) {
        var jsencrypt = new JSEncrypt()
        jsencrypt.setPrivateKey(privateKey)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        var result = jsencrypt.encrypt(data)
        return result
    },
    /* 加密 */
    encrypt(data) {
        const PUBLIC_KEY = publicKey
        var encryptor = new Encrypt()
        encryptor.setPublicKey(PUBLIC_KEY)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        const result = encryptor.encryptLong(data)
        return result
    },
    /* 解密 - PRIVATE_KEY - 验证 */
    decrypt(data) {
        const PRIVATE_KEY = privateKey
        var encryptor = new Encrypt()
        encryptor.setPrivateKey(PRIVATE_KEY)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        var result = encryptor.decryptLong(data)
        return result
    }
}