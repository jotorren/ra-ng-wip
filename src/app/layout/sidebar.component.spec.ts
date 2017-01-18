import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { RaNGModule, MockComponent } from 'ra-ng';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {

  let component: SidebarComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          SidebarComponent
        ],
        imports: [
          TranslateModule.forRoot(), RaNGModule, RouterTestingModule
          // RouterTestingModule.withRoutes([
          //   { path: 'login', component: MockComponent },
          //   { path: 'forbidden', component: MockComponent }
          // ])
        ],
        providers: [
        ]
      })
      .compileComponents()
      .then((ar) => {
        let fixture = TestBed.createComponent(SidebarComponent);

        fixture.detectChanges();

        component = fixture.componentInstance;
      })
      .catch(error => console.error(error.message));
  }));

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

});

