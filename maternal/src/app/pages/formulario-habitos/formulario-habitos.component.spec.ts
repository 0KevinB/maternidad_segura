import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioHabitosComponent } from './formulario-habitos.component';

describe('FormularioHabitosComponent', () => {
  let component: FormularioHabitosComponent;
  let fixture: ComponentFixture<FormularioHabitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioHabitosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioHabitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
