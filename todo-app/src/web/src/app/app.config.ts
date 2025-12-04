import { ApplicationConfig, inject, InjectionToken, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfigurationService } from './services/configuration-service';
import { provideHttpClient } from '@angular/common/http';
import { AppConfiguration } from './models/app-configuration';
import { ITodoService } from './services/interfaces';
import { TodoService } from './services/todo-service';

export const APP_CONFIGURATION = new InjectionToken<AppConfiguration>('app.configuration');

export const TODO_SERVICE = new InjectionToken<ITodoService>('todo.service');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(async () => {
      const configurationService = inject(ConfigurationService);
      await configurationService.loadConfiguration();
    }),
    {
      provide: APP_CONFIGURATION,
      useFactory: (configurationService: ConfigurationService) => configurationService.getConfiguration,
      deps: [ConfigurationService]
    },
    {
      provide: TODO_SERVICE,
      useClass: TodoService
    }
  ]
};
