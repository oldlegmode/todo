import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {DataService} from './data.service';
import {Tasks} from './tasks';

@Component({
    selector: 'todo',
    template: `
              <div class="todo">
                <h1 class="todo__header">todos</h1>
                <input class="todo__input" #box (keyup.enter)="onEnter(box.value)" placeholder="What needs to de done?">
                <router-outlet></router-outlet>
                <filter [data] = "items"></filter>
              </div>
              <todo-footer></todo-footer>
              `,
    providers: [DataService]
})
export class todo {
  item = '';
  items: Tasks[] = [];

  constructor(private data: DataService){};
  ngOnInit() {

    this.items = this.data.getData();
  };

  addItem(item: string, description: string, complete: boolean) {

    this.data.addData(item, description, complete)
  };

  onEnter(value: string, description: string) {
    if( (value = value.trim()) == '') {
      return;
    };
    this.data.addData(value, description, false);
  };

}