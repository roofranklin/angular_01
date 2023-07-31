import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgFor, NgIf ],
})
export class HomeComponent {

  constructor(private router: Router) { }

  verDetalhes(imovelId: string) {
    this.router.navigate(['/detalhes', imovelId]);
  }


  nome: string = 'Pedro';
  sobrenome: string = 'dos Santos';
  imoveis: Array<any> = [
    {
      id: "549hg54980yth8945h",
      titulo: 'Casa Magnífica',
      foto: 'https://i.ibb.co/JKzFtzj/casa.jpg',
      quartos: 4,
      banheiros: 3,
      area: 360,
      preco: 990000,
      favorito: true
    },
    {
      id: "sdfvneorhnj093458",
      titulo: 'Apartamento Padrão',
      foto: 'https://i.ibb.co/tmsG61R/apartamento.jpg',
      quartos: 2,
      banheiros: 1,
      area: 45,
      preco: 120000,
      favorito: false
    },
    {
      id: 3,
      titulo: 'Casa de Campo',
      foto: 'https://i.ibb.co/5h1XHzY/casa-de-campo.jpg',
      quartos: 7,
      banheiros: 5,
      area: 800,
      preco: 1500000,
      favorito: false
    },
    {
      id: 4,
      titulo: 'Flat Minimalista',
      foto: 'https://i.ibb.co/FqSpsYt/flat.jpg',
      quartos: 1,
      banheiros: 1,
      area: 36,
      preco: 180000,
      favorito: false
    },
    {
      id: "rg93h8eirbgrebngn",
      titulo: 'Sala Comercial',
      foto: 'https://i.ibb.co/2nNsFkt/sala-comercial.jpg',
      quartos: 0,
      banheiros: 1,
      area: 25,
      preco: 250000,
      favorito: true
    },
    {
      id: "8493ty34hg489gh",
      titulo: 'Cobertura Duplex',
      foto: 'https://i.ibb.co/pPHQfW2/cobertura.jpg',
      quartos: 3,
      banheiros: 3,
      area: 200,
      preco: 1500000,
      favorito: true
    }
  ];
}
