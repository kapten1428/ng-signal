import { Component, OnInit, computed, signal } from '@angular/core';
export interface IUser {
  id: string;
  name: string;
}

@Component({
  selector: 'app-signal-start',
  standalone: true,
  imports: [],
  templateUrl: './signal-start.component.html',
  styleUrl: './signal-start.component.scss'
})
export class SignalStartComponent implements OnInit{
  // Title Section
  public title = signal<string>('');

  //Price Section
  public price = signal<number>(1000);
  public qty = signal<number>(0);

  public totalPrice = computed(() => this.price() * this.qty())

  public users = signal<IUser[]>([]);

  ngOnInit(): void {
    setTimeout(() => {
      // SET NEW VALUE
      this.users.set([{id: '123s', name:'Helen'}])

      // UPDATE , If you want use with prev value
      this.users.update((prevUsers) => [
        ...prevUsers,
        {id: 'abc', name: 'Mike'}
      ])

      console.log(this.users());

    }, 1000)
  }

  public renderTitle(event: Event): void {
    this.title.set((event.target as HTMLInputElement).value);
  }

  public qualityUpdate(event: Event): void {
    const qty = +(event.target as HTMLInputElement).value;
    this.totalPrice = computed(() => this.price() * qty)
  }
}
