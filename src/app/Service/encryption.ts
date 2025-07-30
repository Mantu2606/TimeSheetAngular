import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class Encryption {
  private secretKey = 'MySuperSecretKey123!'; // ❗ Change this in production
// Install =>
//  1. npm install crypto-js
 // 2. npm install --save-dev @types/crypto-js

  encrypt(data: any): string {
    const stringData = JSON.stringify(data);
     return CryptoJS.AES.encrypt(stringData, this.secretKey).toString();
}

decrypt(data : string): any{
   const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
}
}