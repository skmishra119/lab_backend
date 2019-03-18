import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  userClaim: any;

  constructor(private sessionService: SessionService) {
    // Get userCliam from session storage
    const claim = this.sessionService.getItem('userClaim');

    // Check if userClaim exists into session storage
    if (claim) {
      this.userClaim = claim;
    } else {
      // Create a default userClaim
      this.userClaim = {
        userId: null,
        lab_id: null,
        isAuthenticated: false,
        token: null,
        fullName: null
      };
    }
  }

  // Check for user authenticity
  isAuthorised = function () {
    return this.userClaim.isAuthenticated;
  };

  // Logout user
  logout = function () {
    // Reset userClim in default state
    this.userClaim = {
      userId: null,
      lab_id: null,
      isAuthenticated: false,
      token: null,
      fullName: null
    };
    // Remove userClaim from session storage
    this.sessionService.removeItem('userClaim');
    // Clear all session store
    this.sessionService.clearAll();
  };
}
