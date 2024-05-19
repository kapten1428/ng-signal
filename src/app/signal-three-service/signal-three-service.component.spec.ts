import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalThreeServiceComponent } from './signal-three-service.component';

describe('SignalThreeServiceComponent', () => {
  let component: SignalThreeServiceComponent;
  let fixture: ComponentFixture<SignalThreeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalThreeServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalThreeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
