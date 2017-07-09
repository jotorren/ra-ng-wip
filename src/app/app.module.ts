import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';

import {
    RaNGModule, ConfigurationService, LogService, LogI18nService, LanguageConfigurationService,
    TranslateService, UncontrolledErrorsService
} from 'ra-ng';

import { LayoutModule } from './layout';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core';
import { AppSharedModule } from './shared';
import { HomeModule } from './home';

import { Config } from './shared';
import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule, TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (cfgService: ConfigurationService) => new LanguageConfigurationService(cfgService, 'i18n_'),
        deps: [ConfigurationService, Http]
    }), RaNGModule.forRoot('security-oauth2'), LayoutModule, AppRoutingModule, CoreModule, AppSharedModule, HomeModule],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ConfigurationService, useFactory: () => new ConfigurationService(Config) },
        { provide: LogService, useFactory: () => new LogService('app') },
        {
            provide: LogI18nService,
            useFactory: (i18n: TranslateService) => {
                if (!i18n.currentLang) {
                    i18n.use(Config.appLang);
                }
                return new LogI18nService('app', i18n);
            },
            deps: [TranslateService]
        },
        { provide: ErrorHandler, useClass: UncontrolledErrorsService, deps: [LogI18nService] }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
