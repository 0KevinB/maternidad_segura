import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculadora6Component } from './calculadora6.component';

describe('Calculadora6Component', () => {
  let component: Calculadora6Component;
  let fixture: ComponentFixture<Calculadora6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculadora6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calculadora6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
