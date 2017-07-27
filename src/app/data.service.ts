import {Tasks} from './tasks';

export class DataService {
  private data: Tasks[]= [
        { name:"Apple iPhone 7", description: 'fasf', complete: false},
        { name: "HP Elite x3", description: 'fasf', complete: false},
        { name: "Alcatel Idol S4", description: 'fasf', complete: false}
    ];
  getData(): Tasks[] {
    return this.data;
  }
  addData(item: string, description: string, complete: boolean) {
    this.data.push(new Tasks(item, description, complete))
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
    return this.data[index].name;
  }
  setItem(index: number, value: string) {
    this.data[index].name = value;
  }
  getDescription(index: number) {
    return this.data[index].description;
  }
  setDescription(index: number, value: string) {
    this.data[index].description = value;
  }
}