import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-calculadora1',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './calculadora1.component.html',
  styleUrl: './calculadora1.component.css'
})
export class Calculadora1Component {

}
