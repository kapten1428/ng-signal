import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signal-two',
  standalone: true,
  imports: [],
  template: `
  <h1>Angular Signals</h1>

  @if (item) {
    {{ item.toLowerCase() }}
  }

  <ul>
    @for(item of items(); track 'id') {
      <li>
        {{ item?.name }}
      </li>
    }
  </ul>

  <button (click)="handleClick()">Click Here</button>
  <button (click)="clearItem()">Clear</button>

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
  <button (click)="append(newItemName())">Add</button>
  </div>
  <ul>
    @for(item of visibleItems(); track 'id') {
      <li>{{ item.name }}</li>
    }
  </ul>



  `,
})
export class SignalTwoComponent {


  #item = signal<string | undefined>('Helslos');

  get item() {
    return this.#item();
  }

  items = signal([
    { id: 1, name: "Andy" },
    { id: 2, name: "Bon" },
    { id: 3, name: "Charly" }
  ])

  readOnlyItems = this.items.asReadonly();

  handleClick() {
    console.log(this.items())
    console.log('readonly', this.readOnlyItems())
  }

  lastItem = computed(() => this.items().slice(-1)[0]);

  nameFilter = signal('');

  filteredItems = computed(() => {
    const name = this.nameOrder().toLowerCase();

    return this.items().filter(item =>
      item.name.toLowerCase().includes(name)
    )
  })

  // ASCENDING
  ascOrder = signal(false);
  nameOrder = signal('');

  visibleItems = computed(() => {
    const order = this.ascOrder() ? 1 : -1;
    return this.filteredItems().sort((a, b) => {
      return a.name.localeCompare(b.name) * order
    })
  })

  // UPDATE SIGNAL
  updateNameFilter($event: Event) {
    console.log('test');

    this.nameOrder.set(($event.target as HTMLInputElement)['value'])
  }

  clearItem(){
    this.items.set([]);
  }

  newItemName = signal('');

  updateNewItem($even: Event) {
    this.newItemName.set(($even.target as HTMLInputElement)['value']);
  }

  append(name: string) {
    this.items.update(prev => [...prev, {id: prev.length + 1, name}])
  }


}
