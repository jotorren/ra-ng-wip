import { Component, EventEmitter, Output  } from '@angular/core';

import { TranslateService, Message } from 'ra-ng';

@Component({
  moduleId: module.id,
  selector: 'app-aside',
  templateUrl: 'aside.component.html',
  styleUrls: ['aside.component.css']
})
export class AsideComponent {

    @Output() notify = new EventEmitter<Message>();

    checked: boolean = false;

    constructor(private i18n: TranslateService) {
    }

    send() {
      // this.checked = !this.checked;

      if (this.checked) {
        this.notify.emit({
          severity: 'error',
          summary: this.i18n.instant('ui.aside.toggle.button.message.summary'),
          detail: this.i18n.instant('ui.aside.toggle.button.message.detail')});
      }
    }
}
