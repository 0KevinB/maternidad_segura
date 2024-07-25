import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraDataService {
  private calculadora1Subject = new BehaviorSubject<any>({});
  private calculadora2Subject = new BehaviorSubject<any>({});
  private calculadora3Subject = new BehaviorSubject<any>({});
  private calculadora4Subject = new BehaviorSubject<any>({});
  private calculadora5Subject = new BehaviorSubject<any>({});
  private calculadora6Subject = new BehaviorSubject<any>({});

  calculadora1$ = this.calculadora1Subject.asObservable();
  calculadora2$ = this.calculadora2Subject.asObservable();
  calculadora3$ = this.calculadora3Subject.asObservable();
  calculadora4$ = this.calculadora4Subject.asObservable();
  calculadora5$ = this.calculadora5Subject.asObservable();
  calculadora6$ = this.calculadora6Subject.asObservable();

  updateData(calculadoraId: string, newData: any) {
    switch (calculadoraId) {
      case 'calculadora1':
        this.calculadora1Subject.next({ ...this.calculadora1Subject.value, ...newData });
        break;
      case 'calculadora2':
        this.calculadora2Subject.next({ ...this.calculadora2Subject.value, ...newData });
        break;
      case 'calculadora3':
        this.calculadora3Subject.next({ ...this.calculadora3Subject.value, ...newData });
        break;
      case 'calculadora4':
        this.calculadora4Subject.next({ ...this.calculadora4Subject.value, ...newData });
        break;
      case 'calculadora5':
        this.calculadora5Subject.next({ ...this.calculadora5Subject.value, ...newData });
        break;
      case 'calculadora6':
        this.calculadora6Subject.next({ ...this.calculadora6Subject.value, ...newData });
        break;
    }
  }

  getData(calculadoraId: string): any {
    switch (calculadoraId) {
      case 'calculadora1':
        return this.calculadora1Subject.value;
      case 'calculadora2':
        return this.calculadora2Subject.value;
      case 'calculadora3':
        return this.calculadora3Subject.value;
      case 'calculadora4':
        return this.calculadora4Subject.value;
      case 'calculadora5':
        return this.calculadora5Subject.value;
      case 'calculadora6':
        return this.calculadora6Subject.value;
      default:
        return {};
    }
  }

  getAllData(): { [key: string]: any } {
    return {
      calculadora1: this.calculadora1Subject.value,
      calculadora2: this.calculadora2Subject.value,
      calculadora3: this.calculadora3Subject.value,
      calculadora4: this.calculadora4Subject.value,
      calculadora5: this.calculadora5Subject.value,
      calculadora6: this.calculadora6Subject.value
    };
  }
}