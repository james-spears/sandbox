import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

if (environment.useEmulators) {
  console.log('emulation enabled');
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
