import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/services/app.config';
import { App } from './app/services/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
