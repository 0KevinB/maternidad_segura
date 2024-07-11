import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculadora1Component } from './calculadora1.component';

describe('Calculadora1Component', () => {
  let component: Calculadora1Component;
  let fixture: ComponentFixture<Calculadora1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculadora1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calculadora1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
