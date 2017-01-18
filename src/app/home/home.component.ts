import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Headers } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { MenuItem } from 'primeng/primeng';

import {
  LogI18nService, TranslateService, EventBusService, BroadcastMessage,
  SecurityAuthorizationService, SecurityTokenRequestService, ErrorsService,
  LangChangeEvent, BreadcrumbItem, BroadcastEvent, EnterAnnouncedEventType,
  UpdateAnnouncedEventType, ProfileManagerService
} from 'ra-ng';

import { Config } from '../shared';

@Component({
  // there's no selector because we render this component
  // through the router-outlet
  template: `
    <rang-breadcrumb [baseUrl]="" [home]="moduleHome"></rang-breadcrumb>
    <p></p>
    <br><br><h3>{{ 'ui.main.message' | translate }}</h3>
    <div *ngIf="authz.hasAnyRole(['admin'])"><h4>You are an admin!!!!</h4></div>
    {{ 'ui.home.message' | translate:{uri: url} }}
    <p></p>
    <button type="button" class="btn btn-default" (click)="onClickGet($event)">Get</button>
    <p></p>
    <button type="button" class="btn btn-default" *ngIf="authz.hasAnyPerm(['age@crear'], { id: this.objid })">Crear</button>
    <button type="button" class="btn btn-default" *ngIf="authz.hasAnyPerm(['age@modificar'], { id: this.objid })">Modificar</button>
    <button type="button" class="btn btn-default" *ngIf="authz.hasAnyPerm(['age@publicar'], { id: this.objid })">Publicar</button>
  `
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private className = this.constructor.name;

  private url: String;
  private moduleHome: MenuItem;

  private label = 'ui.breadcrumb.label.welcome';
  private item: BreadcrumbItem;

  private translate$: Subscription;

  private objid = '1-1';

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private eventbus: EventBusService,
    private log: LogI18nService,
    private authz: SecurityAuthorizationService,
    private authHttp: SecurityTokenRequestService,
    private profileMgr: ProfileManagerService) {
    let uri: string;
    route.snapshot.url.forEach((elem) => {
      uri = uri ? uri + '/' + elem.path : elem.path;
    });

    this.item = { route: uri, label: this.translate.instant(this.label) };
  }

  ngOnInit() {
    this.moduleHome = { disabled: true, label: this.translate.instant('ui.breadcrumb.label.home') };

    this.translate$ = this.translate.onLangChange.subscribe(
      (params: LangChangeEvent) => {
        this.moduleHome = { disabled: true, label: this.translate.instant('ui.breadcrumb.label.home') };
        this.item.label = this.translate.instant(this.label);
        this.eventbus.dispatch(new BroadcastEvent(UpdateAnnouncedEventType, this.item));
      }
    );

    this.route.url.subscribe((url: UrlSegment[]) => {
      this.url = url[0].path;
    });

    /**
     * If we’re not interested in future changes of a route parameter, an Observable 
     * can bit a bit of an overkill, which is why the router supports snapshots. 
     * A snapshot is simply a snapshot representation of the activated route
     */
    this.log.debug('log.home.init', { class: this.className, route: this.route.snapshot.url[0].path });
    this.log.debug('log.home.xxx', { class: this.className, route: this.route.snapshot.url[0].path });

    this.eventbus.dispatch(new BroadcastMessage({
      severity: 'info',
      summary: this.translate.instant('ui.home.message.summary'),
      detail: this.translate.instant('ui.home.message.detail', { uri: this.route.snapshot.url[0].path })
    }));

    this.profileMgr.setUserInstancePerms(['age@crear']);
  }

  ngAfterViewInit() {
    this.eventbus.dispatch(new BroadcastEvent(EnterAnnouncedEventType, this.item));

    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    this.authHttp.get(Config.api.test, { headers: myHeader }).subscribe(
      data => {
        this.eventbus.dispatch(new BroadcastMessage({
          severity: 'info',
          summary: this.translate.instant('ui.home.api.ok.message.summary'),
          detail: data.text()
        }));
      },
      error => {
        let message: string = ErrorsService.extractMessage(error);
        this.log.error(message);

        this.eventbus.dispatch(new BroadcastMessage({
          severity: 'error',
          summary: this.translate.instant('ui.home.api.err.message.summary'),
          detail: message
        }));
      },
      () => this.log.debug('log.home.api.completed', { class: this.className })
    );
  }

  ngOnDestroy() {
    this.translate$.unsubscribe();
  }

  onClickGet(event) {
    let versio = 1;

    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    myHeader.append('ETag', versio + '');

    this.authHttp.get(Config.api.getage, { headers: myHeader }).subscribe(
      data => {
        this.log.info(data.text());
        let resp = JSON.parse(data.text());
        this.eventbus.dispatch(new BroadcastMessage({
          severity: 'info',
          summary: 'Permissions',
          detail: JSON.stringify(resp.metadata.scopes)
        }));
        this.profileMgr.setUserInstancePerms(resp.metadata.scopes, { id: this.objid });
      },
      error => {
        let message: string = ErrorsService.extractMessage(error);
        this.log.error(message);
      },
      () => this.log.debug('log.home.api.completed', { class: this.className })
    );
  }
}
