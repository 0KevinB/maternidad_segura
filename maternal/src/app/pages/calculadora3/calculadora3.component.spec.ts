import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculadora3Component } from './calculadora3.component';

describe('Calculadora3Component', () => {
  let component: Calculadora3Component;
  let fixture: ComponentFixture<Calculadora3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculadora3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calculadora3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
