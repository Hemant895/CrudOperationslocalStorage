import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageKey = 'items';

  constructor() { }

  saveItem(item: any): void {
    const items = this.getItems();
    const existingItemIndex = items.findIndex(i => i.id === item.id);
    if (existingItemIndex > -1) {
      items[existingItemIndex] = item;
    } else {
      item.id = new Date().getTime(); 
      items.push(item);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getItems(): any[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }


  getItemById(id: number): any {
    const items = this.getItems();
    return items.find(item => item.id === id);
  }


  deleteItem(id: number): void {
    const items = this.getItems();
    const filteredItems = items.filter(item => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredItems));
  }
}
