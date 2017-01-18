// interface ClockInterface {
//     new (hour: number, minute: number);
// }

// class Clock implements ClockInterface  {
//     currentTime: Date;
//     constructor(h: number, m: number) { }
// }

// raises an error
// let c = new Clock(1, 2);

interface ClockStatic {
    new (hour: number, minute: number);
}

class Clock  {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

let cs: ClockStatic = Clock;
let newClock = new cs(7, 30);

// import { LogLevel } from './LogLevel';
// console.log(LogLevel.parseLevel('TRACE'));

import 'reflect-metadata';
// import { AppenderProvider, Logger, LogLevel, ConsoleAppender } from './shared';

// let availableAppenders: {[name: string]: AppenderConstructor} = {
//     Console
// };

// let availableAppenders: {[name: string]: AppenderProvider} = { };
// availableAppenders['Console'] = ConsoleAppender;

// console.log(availableAppenders);

// const logger = new availableAppenders['Console'](LogLevel.DEBUG, null, 'hhhhh');
// console.log(logger);
// console.log(availableAppenders);

//import {Logger, getLogger, Level, Appender, LoggingEvent, BrowserConsoleAppender, Layout, PatternLayout} from 'log4javascript';

// log4javascript requires window object and could not be tested on node.js

// class ConsoleAppender extends Appender {
//     append(loggingEvent: LoggingEvent): void{
//         console.log(loggingEvent);
//     }
// }

// let myLogger: Logger = getLogger('my-logger');

// let myAppender: Appender = new ConsoleAppender();
// let myLayout: Layout = new PatternLayout('%d{HH:mm:ss} %-5p - %m%n');
// myAppender.setLayout(myLayout);
// myLogger.addAppender(myAppender);
// myLogger.setLevel(Level.ALL);

// myLogger.info('is this running');

// let some = null;
// console.log(!some);

// import * as CacheFactory from 'cachefactory';
// import {ICache} from 'cachefactory';
// let ca: ICache = CacheFactory.createCache('appDataCache');
// console.log(ca.info());

import { Observable } from 'rxjs/Rx';
import { sendHttpRequest } from 'ra-ng';


// let source = Observable.forkJoin(
//     Observable.range(0, 10),
//     Observable.from([1, 2, 3]),
//     Observable.fromPromise(sendHttpRequest({
//         method: 'GET',
//         url: 'http://www.google.com'
//     }))
// );

let urls: string[] = ['http://www.google.com', 'http://www.sport.es'];
let observableBatch = [];

urls.forEach((url) => {
    observableBatch.push(Observable.fromPromise(sendHttpRequest({
        method: 'GET',
        url: url
    })));
});

let source = Observable.forkJoin(observableBatch);

let subscription = source.subscribe(
function (x) {
    console.log('Next: %s', x);
},
function (err) {
    console.log('Error: %s', err);
},
function () {
    console.log('Completed');
});
