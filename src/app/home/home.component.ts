import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatIconModule, NgFor, NgIf, CommonModule ],
})
export class HomeComponent implements OnInit {

  nome: string = 'Pedro';
  sobrenome: string = 'dos Santos';
  imoveis: any;

  constructor(
    private router: Router,
    private http: HttpClient
   
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/imoveis').subscribe(data => {
      this.imoveis = data;
    });
  }

  verDetalhes(imovelId: string) {
    this.router.navigate(['/detalhes', imovelId]);
  }

  toogleFavorito(index: number): void {
    this.imoveis[index].favorito = !this.imoveis[index].favorito
  }
}
