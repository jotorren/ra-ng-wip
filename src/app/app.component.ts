import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import {
  LogService, TranslateService, CacheService, EventBusService, BroadcastEvent,
  BroadcastMessageType, Message
} from 'ra-ng';

import { Constants, Config } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-rang',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None // the style is not scoped, therefore it will be globally applied
})
export class AppComponent implements OnDestroy, OnInit {
  appName = Constants.appName;
  appVersion = Constants.appVersion;
  appLang = Config.appLang;

  notifications: Message[] = [];

  private className = this.constructor.name;
  private busSubs: Subscription;

  constructor(
    private log: LogService,
    private cacheService: CacheService,
    private translate: TranslateService,
    private busService: EventBusService) {
  }

  ngOnInit() {
    // Resources initialization
    if (!this.translate.currentLang) {
      this.translate.use(Config.appLang);
    }

    this.log.debug(this.translate.instant('log.app.init.cache', {
      class: this.className, name: this.cacheService.get('application').id
    }));

    this.translate.get('log.app.init.cache', {
      class: this.className, name: this.cacheService.get('memory').id
    }).subscribe((msg) => { this.log.debug(msg); });

    this.busSubs = this.busService.listenByFilter(message => {
      this.notifications.push(message.data);
      this.notifications = this.notifications.slice();
    }, BroadcastMessageType);
  }

  ngOnDestroy() {
    this.busSubs.unsubscribe();
    // Resources release
    this.cacheService['application'].destroy();
  }

  onNotify(message: Message) {
    this.notifications.push(message);
    this.notifications = this.notifications.slice();
  }

  onClear(event: BroadcastEvent) {
    if ('clear' === event.type && 'MessagesComponent' === event.source) {
      this.notifications = [];
    }
  }
}
