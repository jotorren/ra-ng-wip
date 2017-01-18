import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RaNGModule } from 'ra-ng';
import { AppSharedModule } from '../shared';

@NgModule({
    imports: [RaNGModule, AppSharedModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: []
})
export class HomeModule {
}

