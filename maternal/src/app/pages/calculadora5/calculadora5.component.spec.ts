import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculadora5Component } from './calculadora5.component';

describe('Calculadora5Component', () => {
  let component: Calculadora5Component;
  let fixture: ComponentFixture<Calculadora5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculadora5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calculadora5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
