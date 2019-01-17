import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class HelperService {
  
  constructor(private http: HttpClient) {
  }

  // Check object is undefined, null or blank
  isUndefinedOrNull = function (obj) {
    return ((typeof obj === 'undefined') || obj === null || obj === '');
  };

  // Check if string variable is blank
  isBlank = function (str) {
    return (!str || 0 === str.length);
  };

  // Encrypt data using AES algorithm
  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), 'binlab.bintechsol.com').toString();
    } catch (e) {
      console.log(e);
    }
  }

  // Decrypt data using AES algorithm
  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, 'binlab.bintechsol.com');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
