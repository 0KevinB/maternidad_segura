import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculadora2Component } from './calculadora2.component';

describe('Calculadora2Component', () => {
  let component: Calculadora2Component;
  let fixture: ComponentFixture<Calculadora2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculadora2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calculadora2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
