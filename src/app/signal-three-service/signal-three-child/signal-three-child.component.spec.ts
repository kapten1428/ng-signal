import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalThreeChildComponent } from './signal-three-child.component';

describe('SignalThreeChildComponent', () => {
  let component: SignalThreeChildComponent;
  let fixture: ComponentFixture<SignalThreeChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalThreeChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalThreeChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
