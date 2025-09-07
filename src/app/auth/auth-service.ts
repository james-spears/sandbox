import { computed, inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);

  // Reactive state for the current user using Angular Signals
  // The user signal holds the current User object or null if logged out.
  readonly user = signal<User | null>(null);

  // Computed signal to easily check if a user is logged in.
  readonly isLoggedIn = computed(() => this.user() !== null);

  constructor() {
    // Listen to authentication state changes from Firebase
    // and update our user signal accordingly.
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
    });
  }

  /**
   * Signs up a new user with email and password.
   * @param email The user's email.
   * @param password The user's chosen password.
   * @returns An observable that resolves with the UserCredential on success.
   */
  emailPasswordSignUp(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  /**
   * Logs in an existing user with their email and password.
   * @param email The user's email.
   * @param password The user's password.
   * @returns An observable that resolves with the UserCredential on success.
   */
  emailPasswordLogin(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  /**
   * Initiates the Google Sign-In flow using a popup window.
   * @returns An observable that resolves with the UserCredential on success.
   */
  googleLogin(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  /**
   * Sends a password reset email to the specified email address.
   * @param email The email to send the reset link to.
   * @returns An observable that completes when the email is sent.
   */
  sendPasswordReset(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  /**
   * Logs out the currently authenticated user.
   * @returns An observable that completes when the user is logged out.
   */
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
