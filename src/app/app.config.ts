import {
  ApplicationConfig,
  inject,
  PLATFORM_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  provideAppCheck,
} from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.development';
import { connectFirestoreEmulator } from '@firebase/firestore';
import { isPlatformServer } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sandbox-471412',
        appId: '1:673123653607:web:457aa80d3ef2dac57ecf42',
        storageBucket: 'sandbox-471412.firebasestorage.app',
        apiKey: 'AIzaSyCnz3WnIeA5r1Ys84yJjcyyX9XCwXAio-g',
        authDomain: 'sandbox-471412.firebaseapp.com',
        messagingSenderId: '673123653607',
        measurementId: 'G-Y405YC6PYS',
      }),
    ),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      return auth;
    }),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideAppCheck(() => {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformServer(platformId)) {
        return {} as any;
      }
      const provider = new ReCaptchaEnterpriseProvider(environment.reCaptchaSiteKey);
      return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (environment.useEmulators) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      }
      return functions;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (environment.useEmulators) {
        connectStorageEmulator(storage, 'localhost', 9199);
      }
      return storage;
    }),
  ],
};
