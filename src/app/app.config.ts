import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
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
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';

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
      })
    ),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideAppCheck(() => {
      const provider = new ReCaptchaEnterpriseProvider('6LcJEsErAAAAAKvTyfYWwZB-LZ8UPZuREj7ob0c9');
      return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    }),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
  ],
};
