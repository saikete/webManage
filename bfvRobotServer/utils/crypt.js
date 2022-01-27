import crypto from 'crypto'
import config from '../config.js'
const des = config.des
export default {
  algorithm:{ ecb:'des-ecb', cbc:'des-cbc' },
  encrypt(plainText) {
    const cipher = crypto.createCipheriv('des-cbc', des.key, des.iv)
    cipher.setAutoPadding(true)
    let encryptedText = cipher.update(plainText, 'utf8', 'base64')
    encryptedText += cipher.final('base64')
    return encryptedText
  },
  decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('des-cbc', des.key, des.iv)
    decipher.setAutoPadding(true)
    let plainText = decipher.update(encryptedText, 'base64', 'utf8')
    plainText += decipher.final('utf8')
    return plainText
  }
};