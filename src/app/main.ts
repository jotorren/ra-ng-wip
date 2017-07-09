import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ConfigurationLoaderService, LoggerFactory, Logger, fromUri2Url } from 'ra-ng';

import { Config } from './shared';
import { AppModule } from './app.module';
import * as process from 'process';


// const selectorProperty = 'ld';
// let sPageURL = window.location.search.substring(1);
// let sURLVariables = sPageURL.split('&');
// let found = false;
// let selector = undefined;
// for (let i = 0; (i < sURLVariables.length && !found); i++) {
//   let sParameterName = sURLVariables[i].split('=');
//   if (sParameterName[0] === selectorProperty) {
//     selector = sParameterName[1];
//     found = true;
//   }
// }

let selector = location.hostname;
console.log(JSON.stringify({
  logger: 'console',
  message: 'Using configuration selector: [' + selector + ']'
}));

let cfgUrl = fromUri2Url('/environments/' + selector.trim() + '.json');
console.log(JSON.stringify({
  logger: 'console',
  message: 'Using configuration URL: [' + cfgUrl + ']'
}));

console.log(JSON.stringify({
  logger: 'console',
  message: 'Starting environment: [' + process.env.ENV + ']'
}));
if (process.env.ENV === 'production') {
  enableProdMode();
}

ConfigurationLoaderService.bootstrap(cfgUrl, Config).subscribe(
  (loaded) => {
    LoggerFactory.configure(Config);
    const LOG: Logger = LoggerFactory.getLogger('root');

    LOG.info('Imported JSON configuration for modules: ' + loaded);

    // Compile and launch the module
    platformBrowserDynamic().bootstrapModule(AppModule);
  },
  (err) => {
    console.error('Error loading configuration before launching Angular 2 bootstrap: ', err);
  });
