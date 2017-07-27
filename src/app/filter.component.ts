import { Input, NgModule, Component, OnInit, OnChanges, SimpleChanges, DoCheck} from '@angular/core';
import {DataService} from './data.service';
import {Tasks} from './tasks';

@Component({
    selector: 'filter',
    template: `
              <div class="todo__filter" *ngIf="data.length">
                <span class="todo__filter-text">
                  <span class="todo__filter-counter">{{data.length}}</span> 
                  item left
                </span>
                <ul class="todo__filter-list" (click)="filter($event)">
                  <li class="todo__filter-li">
                    <a class="todo__filter-link" routerLink="#" routerLinkActive="todo__filter-link--active">All</a>
                  </li>
                  <li  class="todo__filter-li">
                    <a class="todo__filter-link" routerLink="/active" routerLinkActive="todo__filter-link--active">Active</a>
                  </li>
                  <li class="todo__filter-li">
                    <a class="todo__filter-link" routerLink="/completed" routerLinkActive="todo__filter-link--active">Completed</a>
                  </li>
                </ul>
                <a href="#" class="todo__del-completed {{this.class}}" (click)="clear($event)">Clear completed</a>
              </div>
              `
})
export class filter {
  @Input() data: any[];
  
  filter(e: any) {
    let target: any = e.target;
    if(target.tagName != 'A') {
      return;
    };
  };
  // реализация сервиса
  class: string;
  items: Tasks[] = [];
  constructor(private dataService: DataService){}; // !Локальная переменная с маленькой буквы! !dataService!
  
  ngOnInit() {
    this.items = this.dataService.getData();
  };
  ngDoCheck() {
    this.class = this.dataService.getAnyComplete();
  };

  clear($event: any) {
    $event.preventDefault();
    for (let i = 0; i < this.items.length; i++) {
      if(this.items[i].complete) {
        this.dataService.removeData(i);
        --i;
      }
    }
  }
}