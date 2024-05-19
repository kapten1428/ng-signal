import { Routes } from '@angular/router';
import { SignalStartComponent } from './signal-start/signal-start.component';
import { SignalTwoComponent } from './signal-two/signal-two.component';
import { SignalThreeServiceComponent } from './signal-three-service/signal-three-service.component';

export const routes: Routes = [
  {
    path:'start',
    component: SignalStartComponent
  },
  {
    path: 'two',
    component: SignalTwoComponent
  },
  {
    path: 'three',
    component: SignalThreeServiceComponent
  }
];
