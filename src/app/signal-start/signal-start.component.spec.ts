import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalStartComponent } from './signal-start.component';

describe('SignalStartComponent', () => {
  let component: SignalStartComponent;
  let fixture: ComponentFixture<SignalStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
