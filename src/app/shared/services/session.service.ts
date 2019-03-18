import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HelperService } from './helper.service';

@Injectable()
export class SessionService {
  constructor(
    private cookieService: CookieService,
    private helperService: HelperService
  ) {}

  // Get item from session storage
  getItem = function(itemName) {
    return this.helperService.decryptData(sessionStorage.getItem(itemName));
  };

  // Add an item into session storage
  addItem = function(itemName, value) {
    sessionStorage.setItem(itemName, this.helperService.encryptData(value));
  };

  // Remove an existing item from session storage
  removeItem = function(itemName) {
    sessionStorage.removeItem(itemName);
  };

  // Clear all session variables
  clearAll = function() {
    sessionStorage.clear();
  };
}
