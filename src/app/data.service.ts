import {Tasks} from './tasks';

export class DataService {
  private data: Tasks[]= [
        { item:"Apple iPhone 7", complete: false},
        { item: "HP Elite x3", complete: false},
        { item: "Alcatel Idol S4", complete: false}
    ];
  getData(): Tasks[] {
    return this.data;
  }
  addData(item: string, complete: boolean) {
    this.data.push(new Tasks(item, complete))
  }
  removeData(index: number) {
    this.data.splice(index, 1);
  }
  setComplete(index: number) {
    this.data[index].complete = true;
  }
  setUncomplete(index: number) {

    this.data[index].complete = false;
  }
  getStatus(index: number) {
    return this.data[index].complete;
  }
  getAnyComplete() {
    for (let item of this.data) {
      if(item.complete) {
        return 'visible';
      }
    }
    return 'hidden'
  }
  getItem(index: number) {
    return this.data[index].item;
  }
  setItem(index: number, value: string) {
    this.data[index].item = value;
  }
}