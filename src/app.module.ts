import { NgModule }      from '../node_modules/@angular/core';
import { BrowserModule } from '../node_modules/@angular/platform-browser';
import { FormsModule }   from '../node_modules/@angular/forms';
import { todo }  from './app/app.component';
import { list }  from './app/list.component';
import { listActive }  from './app/list.active.component';
import { listCompleted }  from './app/list.completed.component';
import { footer }  from './app/footer.component';
import { filter }  from './app/filter.component';
import {DataService} from './app/data.service';

import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
    { path: 'active', component: listActive},
    { path: 'completed', component: listCompleted },
    { path: '#', component: list }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
    declarations: [ todo, list, footer, filter, listActive, listCompleted],
    providers: [DataService],
    bootstrap:    [ todo ]
})
export class AppModule { }