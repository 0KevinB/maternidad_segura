import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterLink]
})
export class ResultadosComponent implements OnInit {
  resultados: any;
  recomendaciones: any[];
  recomendacionesIA: string | undefined;
  openPanel: number | null = 0;
  openPanelIA: boolean = false;
  secciones: string[] = [];
  id: string;
  porcentajeTotal: any
  nivelRiesgoTotal: any;
  constructor(private usuarioService: UsuarioService, private authService: AuthService) {
    this.recomendaciones = [];
    this.id = this.authService.getID();
  }

  ngOnInit() {
    this.usuarioService.getAlRecomendaciones(this.id).subscribe(
      data => {
        this.resultados = data.resultados;
        this.recomendacionesIA = data.recomendacionesIA;
        this.porcentajeTotal = data.resultados.porcentajeTotal
        this.nivelRiesgoTotal = data.resultados.nivelRiesgoTotal
        this.secciones = Object.keys(this.resultados.porcentajesPorSeccion);
        const allSections = Object.keys(this.resultados.porcentajesPorSeccion);
        this.secciones = allSections.filter(section => ['habitos', 'nutricion', 'actividadFisica'].includes(section));
        
        // Procesar las recomendaciones
        this.processRecomendaciones(data.recomendaciones);

        // Crear los gráficos después de obtener los datos
        setTimeout(() => this.createCharts(), 0);
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  sectionTitles: { [key: string]: string } = {
    'nutricion': 'Nutrición',
    'habitos': 'Hábitos',
    'actividadFisica': 'Actividad Física'
  };

  processRecomendaciones(recomendacionesText: string) {
    const sections = recomendacionesText.split(/\d+\.\s+/).filter(Boolean);
    this.recomendaciones = sections.map(section => {
      const [title, ...contentLines] = section.split('\n');
      return {
        title: title.trim(),
        content: contentLines.map(line => line.trim()).filter(Boolean)
      };
    });
  }

  createCharts() {
    this.secciones.forEach((section, i) => {
      const canvasId = 'chart' + i;
      const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: [this.sectionTitles[section], 'Resto'],
            datasets: [{
              data: [this.resultados.porcentajesPorSeccion[section], 100 - this.resultados.porcentajesPorSeccion[section]],
              backgroundColor: this.getSectionColor(section),
              borderWidth: 0
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
          },
          plugins: [this.centerTextPlugin()]
        });
      }
    });
  }

  centerTextPlugin() {
    return {
      id: 'centerText',
      beforeDraw: (chart: { width: any; height: any; ctx: any; data: { datasets: { data: any[]; }[]; }; }) => {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        const text = `${chart.data.datasets[0].data[0]}%`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    };
  }

  getSectionColor(section: string): string[] {
    switch (section) {
      case 'nutricion':
        return ['#FF6384', '#EAEAEA']; // Rosa
      case 'habitos':
        return ['#FF9F40', '#EAEAEA']; // Naranja
      case 'actividadFisica':
        return ['#36A2EB', '#EAEAEA']; // Azul
      default:
        return ['#36A2EB', '#EAEAEA']; // Default color (azul)
    }
  }

  toggleCollapse(index: number) {
    this.openPanel = this.openPanel === index ? null : index;
  }

  toggleCollapseIA() {
    this.openPanelIA = !this.openPanelIA;
  }
}