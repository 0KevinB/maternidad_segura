import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterLink]
})
export class ResultadosComponent implements OnInit, AfterViewInit {
  resultados: any;
  recomendaciones: any[];
  recomendacionesIA: string;
  openPanel: number | null = 0;
  openPanelIA: boolean = false;
  secciones: string[] = [];

  constructor() {
    // Inicialización de datos
    this.resultados = {
      porcentajesPorSeccion: {
        datosMedicos: 100,
        antecedentesObstetricos: 75,
        embarazoActual: 50,
        habitos: 80,
        nutricion: 90,
        actividadFisica: 60
      },
      porcentajeTotal: 100,
      nivelRiesgoTotal: "Bajo riesgo"
    };

    this.secciones = Object.keys(this.resultados.porcentajesPorSeccion);

    this.recomendaciones = [
      { title: "1. Control médico", content: "Asista a citas prenatales regularmente según lo recomendado por su médico." },
      { title: "2. Nutrición", content: "Consuma una dieta balanceada rica en frutas, verduras, proteínas magras y granos integrales." },
      { title: "3. Actividad física", content: "Continúe con su actividad física diariamente, 60 minutos por sesión. Consulte a su médico sobre la intensidad adecuada." },
      { title: "4. Hábitos saludables", content: "Considere unirse a un programa de apoyo para dejar hábitos nocivos si es necesario." },
      { title: "5. Cuidados especiales", content: "Descanse frecuentemente y evite estar de pie por periodos prolongados." },
      { title: "6. Salud mental", content: "Practique técnicas de relajación como meditación o respiración profunda para manejar la ansiedad." }
    ];

    this.recomendacionesIA = "Genera recomendaciones para una embarazada de 32 años, en la semana 20 de embarazo...";
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.createCharts();
  }

  createCharts() {
    this.secciones.forEach((section, i) => {
      const canvasId = 'chart' + i;
      const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
      
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: [section, 'Resto'],
            datasets: [{
              data: [this.resultados.porcentajesPorSeccion[section], 100 - this.resultados.porcentajesPorSeccion[section]],
              backgroundColor: ['#36A2EB', '#EAEAEA']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${context.raw}%`
                }
              }
            },
            cutout: '70%'
          }
        });
      }
    });
  }

  toggleCollapse(index: number) {
    this.openPanel = this.openPanel === index ? null : index;
  }

  toggleCollapseIA() {
    this.openPanelIA = !this.openPanelIA;
  }
}
