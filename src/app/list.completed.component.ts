import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import {DataService} from './data.service';
import {Tasks} from './tasks';

@Component({
    selector: 'list',
    template: `<section *ngIf="items.length" class="todo__list-wrap" (click)="oneClick($event)" (dblclick)="editing($event)">
                <input class="todo__list-all-complete" type="checkbox" name="checkAll" [ngModel]="checkAll" #all (change)="completeAll(all)">
                <ul class="todo__list">
                  <li class="todo__li" *ngFor="let item of items; let i = index" [attr.data-index]="i" [hidden]="!item.complete">
                    <input class="todo__task-input-complete" id="task-{{i+1}}" type="checkbox" [checked]="item.complete" #input 
                    [attr.data-index]="i" (change)="complete(input, input-index)" (blur)="onblur($event)" >
                    <label class="todo__task-label" for="task-{{i+1}}" [attr.data-index]="i">
                      {{item.name}}
                    </label>
                    <p class="todos__description">{{item.description}}</p>
                    <button #but class="todo__del-btn" [attr.data-index]="i" (click)="removeItem(but)">[x]</button>
                  </li>
                </ul>
              </section>
              `
})
export class listCompleted {
// реализация сервиса
  items: Tasks[] = [];
  constructor(private dataService: DataService){}; // !Локальная переменная с маленькой буквы! !dataService!
  ngOnInit() {
    this.items = this.dataService.getData();
  };
  ngDoCheck() {
  };
  
  removeItem(but: any) {
    let i = (but.dataset.index as number);
   
    this.dataService.removeData(i);
  };
  completeAll(all: any) {
    if(!all.checked) {
      let itemsLi = all.nextElementSibling.children;
      for(var i = 0; i < this.items.length;i++) {

        this.dataService.setUncomplete(i);
        itemsLi[i].children[0].checked = false;
      }
      return;
    };
    let itemsLi = all.nextElementSibling.children;
    for(var i = 0; i < this.items.length;i++) {

      this.dataService.setComplete(i);
      itemsLi[i].children[0].checked = true;
    }
  }
  complete(input: any) {
    let i = (input.dataset.index as number);
    if(input.type == 'text') {
      this.returnToCheckbox(input);
      return;
    }
    
    if(input.checked) {
      this.dataService.setComplete(i);
      return;
    }
    this.dataService.setUncomplete(i);
  }
  oneClick($event: any) {
    if($event.target.tagName == 'LABEL') {
      $event.preventDefault();
    }
  }
  editing($event: any) {
    if($event.target.tagName == 'LABEL') {
      $event.preventDefault();

      $event.target.classList.toggle('visibility');
      let input: any = $event.target.previousElementSibling;
      let index: number = input.dataset.index;
      let task: string = this.dataService.getItem(index);
      let btnDel: any = $event.target.nextElementSibling;

      btnDel.classList.toggle('visibility');
      input.type = 'text';
      input.value = task;
      input.focus();
      input.classList.toggle('todo__edit-input');
    }
  }
  onblur($event: any) {
    let input: any = $event.target;
    if (input.type == 'text') {
      this.returnToCheckbox(input);
      return;
    }
  }
  returnToCheckbox(input: any): void {
    let newTask: string = input.value;
    let index: number = input.dataset.index;
    let btnDel: any = input.nextElementSibling.nextElementSibling;
    let label: any = input.nextElementSibling;

    label.classList.toggle('visibility');
    btnDel.classList.toggle('visibility');
    input.type = 'checkbox';
    input.classList.toggle('todo__edit-input');
    this.dataService.setItem(index, newTask);
  }
}