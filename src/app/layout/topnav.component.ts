import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityAuthorizationService } from 'ra-ng';

@Component({
  moduleId: module.id,
  selector: 'app-topnav',
  templateUrl: 'topnav.component.html',
  styleUrls: ['topnav.component.css']
})
export class TopnavComponent {

  constructor(private router: Router, private auth: SecurityAuthorizationService) {
  }

}
