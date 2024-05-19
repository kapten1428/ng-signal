import { UsersHTTPService } from './users-http.service';
import { Component, computed, inject, signal, untracked, effect } from '@angular/core';
import { ItemServiceService } from './item-service.service';
import { FormsModule } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { SignalThreeChildComponent } from './signal-three-child/signal-three-child.component';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signal-three-service',
  standalone: true,
  imports: [CommonModule ,FormsModule, SignalThreeChildComponent, HttpClientModule],
  template:`
  <h1>Angular Signals</h1>

@if (item) {
  {{ item.toLowerCase() }}
}

<ul>
  @for(item of itemsSvc.items(); track 'id') {
    <li>
      {{ item?.name }}
    </li>
  }
</ul>

<button (click)="handleClick()">Click Here</button>
<button (click)="itemsSvc.clearItem()">Clear</button>

<p>
  Last Candidate: {{ lastItem()?.name }}
</p>

<!-- Live Consumer -->
<!-- <ul>
  @for(item of filteredItems(); track 'id') {
    <li>{{ item.name }}</li>
  }
</ul> -->

<h3>Ascending</h3>
Filter:
<input type="text"
       [value]="nameFilter()"
       (input)="updateNameFilter($event)"
>

<div>
  <input type="text"
       [value]="newItemName()"
       (input)="updateNewItem($event)"
>
<button (click)="itemsSvc.append(newItemName())">Add</button>
</div>
<ul>
  @for(item of visibleItems(); track 'id') {
    <li (click)="chooseItem(item.id)"
        [ngClass]="{bold:(chooseItem$ | async) === item.id}"
    >{{ item.name }}</li>
  }
</ul>

<p></p>
<label>
  <input type="checkbox" [(ngModel)]="showChild">
  <p>Chose ID: {{ chooseItem$ | async}}</p>
  <p>Chose ID: {{ chosenItem() }}</p>
  Show Child Component
</label>
@if(showChild) {
  <app-signal-three-child/>
}

<p>------------------------</p>
<ul>
  @for (user of users(); track user.id) {
    <li>ID: {{user.id}}, name : {{user.name }}</li>
  }
</ul>
  `,
  styles:[
    `
    .bold {
      font-weight: bold;
    }
    `
  ],
  providers:[

  ]
})
export class SignalThreeServiceComponent {
  itemsSvc = inject(ItemServiceService);

  #item = signal<string | undefined>('Helslos');
  showChild!: boolean;
  chooseItem$ = new Subject<number>;

  usersHTTPService = inject(UsersHTTPService);
  users = toSignal(this.usersHTTPService.getUsers())

  get item() {
    return this.#item();
  }

  consoleLogEffect =  effect(() => {
    console.log('Console log Effect');

      console.log(this.itemsSvc.items());
      console.log(untracked(() => this.nameFilter()))

    });

  handleClick() {
    console.log(this.itemsSvc.items())
  }

  chooseItem(id: number) {
    this.chooseItem$.next(id);
  }

  chosenItem = toSignal(this.chooseItem$, {initialValue: 2});

  lastItem = computed(() => this.itemsSvc.items()?.slice(-1)[0]);

  nameFilter = signal('');
  nameFilter$ = toObservable(this.nameFilter);

  constructor() {
    this.nameFilter$.subscribe(console.log)
  }

  filteredItems = computed(() => {
    const name = this.nameOrder().toLowerCase();

    return this.itemsSvc.items()?.filter(item =>
      item.name.toLowerCase().includes(name)
    )
  })

  // ASCENDING
  ascOrder = signal(false);
  nameOrder = signal('');

  visibleItems = computed(() => {
    const order = this.ascOrder() ? 1 : -1;
    return this.filteredItems()?.sort((a, b) => {
      return a.name.localeCompare(b.name) * order
    })
  })

  // UPDATE SIGNAL
  updateNameFilter($event: Event) {
    console.log('test');

    this.nameOrder.set(($event.target as HTMLInputElement)['value'])
  }


  newItemName = signal('');

  updateNewItem($even: Event) {
    this.newItemName.set(($even.target as HTMLInputElement)['value']);
  }



}
