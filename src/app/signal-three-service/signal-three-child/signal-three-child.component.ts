import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { ItemServiceService } from '../item-service.service';

@Component({
  selector: 'app-signal-three-child',
  standalone: true,
  imports: [],
  template: `
  <h1>Child Component</h1>
  `
})
export class SignalThreeChildComponent implements OnInit {
  itemSvc = inject(ItemServiceService);

  #inject = inject(Injector);

  ngOnInit() {
    effect((onCleanup) => {
      const timer = setInterval(() => {
       console.log(this.itemSvc.items().length);
     }, 1000);

     onCleanup(() => {
       console.log('clear efecct')
       clearInterval(timer)
     })
   }, {
     injector: this.#inject
   })
  }
}
