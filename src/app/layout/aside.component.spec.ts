import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';

import { MockComponent, ConfigurationService, LanguageConfigurationService } from 'ra-ng';
import { AsideComponent } from './aside.component';

describe('AsideComponent', () => {

    let config = {
        i18n_en:
        {
            'test.i18n.message': 'This message should appear in English'
        },
        i18n_es:
        {
            'test.i18n.message': 'Este mensaje debería aparecer en castellano'
        }
    };

    let component: AsideComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    MockComponent, AsideComponent
                ],
                imports: [
                    RouterTestingModule.withRoutes([
                        { path: 'login', component: MockComponent }
                    ]),
                    TranslateModule.forRoot({
                        provide: TranslateLoader,
                        useFactory: (cfgService: ConfigurationService) => {
                            return new LanguageConfigurationService(cfgService, 'i18n_');
                        },
                        deps: [ConfigurationService]
                    })
                ],
                providers: [
                    { provide: ConfigurationService, useFactory: () => new ConfigurationService(config) }
                ]
            })
            .overrideComponent(AsideComponent, {
                set: {
                    template: '<div>Overridden template here</div>'
                }
            })
            .compileComponents()
            .then((ar) => {
                let fixture = TestBed.createComponent(AsideComponent);

                fixture.detectChanges();

                component = fixture.componentInstance;
            })
            .catch(error => console.error(error.message));
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    describe('send()', () => {
        beforeEach(() => component.send());

        it('should checked be false', () => {
            expect(component.checked).not.toBeTruthy();
        });
    });

});
