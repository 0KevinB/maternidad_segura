import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculadora4Component } from './calculadora4.component';

describe('Calculadora4Component', () => {
  let component: Calculadora4Component;
  let fixture: ComponentFixture<Calculadora4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculadora4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calculadora4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
