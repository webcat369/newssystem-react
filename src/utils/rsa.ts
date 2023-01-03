import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'

// 加密用的公钥
const PUBLIC_KEY = 'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGmXRsrvO/qLy28dBZyo6gFiDDgZyK/qU4prEsyDBr7Poug2Omew/5a1bozyeuoX8+rL5qtvum+/pQHSHtuvCXcbDxn2g/xGZc0/fH1hHPaV8O++LNADmtAQfulWRDrO+a5W10MD7zLhkgKHU3jmMutX/+OcmORLUeFDR7FOPtBXAgMBAAE='

// 解密用的私钥 [和公钥并不是一对]
const PRIVATE_KEY = 'MIICXQIBAAKBgQC/U9I+YZF5bVJ7TBubW2WA+xZkeKOqQy1d5USgLC1lT3ZZGnrshirkttNZxirP89+PpoKFp/XZjEmCIIBARawUUc/9GIJV13E8lyIGIOPmZrn4fnb3ZgD4gd+tN0L1Bviz7C0v9a+eIhuNiCbv4NbvGtMVNcq+WNAl7asoZwqScQIDAQABAoGAItWEBc+FyPHafpBQxmxRgrY0UX6Vbb5lWB8R64efjD53camcj8utq46N1F58FPh1z5WlVehKnp0oFQUN1KXaulckDsU1J3Pl5fg2EVPEiEsKh3bDL+R2tYR8RxsJOt9ZBQ983N1OpN+p/+v4DMoRS2HnGAbyzu/klpgtQagngwECQQD6q0E/Lf6jPqx872pJGCLXPPsGJfrhkLnN7b5KVhtVYwLM+DCiSTCPxkyTHoac+nqtNv+LsRIzU4Cis18asbHJAkEAw2V8kp2dz5aAsgMIG6OvUPN0C4anDGgiqDwtEtmr8H4rJYQzixuL5vmxbKqCG3swpdqxCj5G6DjLd1cBvL7vaQJBAOARMTOek52sqlbLVACemJY5plGqpYX37n7LY2vjaG99H8XEnQST09rQ8SYZBU9Q/1PSc7+UuqYyoCvPltWvvTECQEU6y+xWk/dc57QqhtDkKdWQrGj5CG7I5p6c04t+PAE1cqwULv72f5cSmN5be0WpXA8ncNqkPhNBLDXYSfFJ5SECQQDXH2stWkUxXL6ogr9FoE5HtVC9PTZ1+Dwqi26noB6W6a1U4AQYAiLEOQj2QSVaOLsIlPljsFDHBXX8KknOcDkq'

/**
 * 订单信息加密
 * @param orderNum 订单号
 * @param uid uid
 * @returns
 */
export function createdEncrypedData (orderNum: string, uid: string) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----')
  return encrypt.encrypt(`from=APP&order_num=${orderNum}&uid=${uid}`)
}

/**
 * 任意字符加密
 * @param plaintext 明文
 * @returns
 */
export function encrypt (plaintext: string) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----')
  return encrypt.encrypt(plaintext)
}

/**
 * 解密
 * @param ciphertext 密文
 * @param secretKey 密钥
 * @returns
 */
export function decode (ciphertext: string, secretKey: string) {
  if (!ciphertext) {
    throw new Error('密文不能为空')
  }
  if (!secretKey) {
    throw new Error('密钥不能为空')
  }
  try {
    const decryptRSA = new JSEncrypt()
    decryptRSA.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----' + PRIVATE_KEY + '-----END RSA PRIVATE KEY-----')
    const secretKeyDecryption = decryptRSA.decrypt(secretKey)+''
    const arrMsg = secretKeyDecryption?.split?.('____')

    const aseKey = arrMsg[0] // 秘钥
    const key = CryptoJS.enc.Utf8.parse(aseKey)
    const iv = arrMsg[1]

    const decrypt = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8))
  } catch (err) {
    console.log(err)
  }
}

/**
 *
 * @param data 需要加载的数据
 * @returns
 */
export function encode (data: string): string {
  const splitString = (str: string, num: number) => {
    const strArr = []
    const len = Math.ceil(str.length / num)
    for (let i = 0; i < len; i++) {
      strArr.push(str.substr(i * num, num ))
    }
    return strArr
  }
  const arrData = splitString(data, 64) // 按照64位对数据进行拆分
  const arrCipher = []
  for (let item of arrData) {
    arrCipher.push(encrypt(item))
  }
  return arrCipher.join('')
}
