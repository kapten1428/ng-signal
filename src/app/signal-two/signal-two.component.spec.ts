import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalTwoComponent } from './signal-two.component';

describe('SignalTwoComponent', () => {
  let component: SignalTwoComponent;
  let fixture: ComponentFixture<SignalTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
