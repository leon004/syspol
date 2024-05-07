import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPoliceComponent } from './form-police.component';

describe('FormPoliceComponent', () => {
  let component: FormPoliceComponent;
  let fixture: ComponentFixture<FormPoliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPoliceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
