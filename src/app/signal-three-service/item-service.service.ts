import { Injectable, effect, signal, untracked } from '@angular/core';

function syncEffect<T>(key:string, valueGetter: () =>  T) {
  return effect(() => {
    localStorage.setItem(key, JSON.stringify(valueGetter()))
  })
}

type IItem = {
  id: number,
  name: string
}
@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  #items = signal(JSON.parse(localStorage.getItem('items')!) as IItem[] || [])

  // synchronizeItemsEffect = effect(() => {
  //   localStorage.setItem('item', JSON.stringify(this.#items()))
  // })

  synchronizeItemsEffect = syncEffect('items', () => this.#items())
  items = this.#items.asReadonly();

  clearItem(){
    this.#items.set([]);
  }

  append(name: string) {
    this.#items.update(prev => {
      let newArray: IItem[] = [];
      if(prev) {
        newArray = [...prev, {id: prev.length + 1, name}]
      }
      return newArray
    })
  }

}
