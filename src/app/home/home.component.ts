import { Component } from '@angular/core';
import { NgFor } from '@angular/common'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgFor ],
})
export class HomeComponent {
  nome: string = 'Roosevelt';
  imoveis: string[] = ['Casa Magnífica', 'Apartamento Padrão', 'Casa de Campo', 'Flat Minimalista', 'Sala Comercial', 'Cobertura Duplex'];
}
