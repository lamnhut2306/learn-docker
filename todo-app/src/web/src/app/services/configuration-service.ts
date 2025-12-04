import { Injectable } from '@angular/core';
import { AppConfiguration } from '../models/app-configuration';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private configuration: AppConfiguration | null = null;

  async loadConfiguration() {
    if (this.configuration) return;

    const response = await fetch('config.json');
    const data = await response.json();
    this.configuration = data;
  }

  get getApiBaseUrl(): string {
    if (!this.configuration) {
      throw new Error('Configuration not loaded');
    }
    return this.configuration.apiBaseUrl;
  }

  get getConfiguration(): AppConfiguration {
    if (!this.configuration) {
      throw new Error('Configuration not loaded');
    }
    return this.configuration;
  }
}
