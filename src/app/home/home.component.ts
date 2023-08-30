import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgFor, NgIf } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ MatGridListModule, MatCardModule, MatIconModule, NgFor, NgIf, CommonModule,  MatSnackBarModule ],
})
export class HomeComponent implements OnInit {

  nome: string =  'Roosevelt';
  imovel: any;
  imoveis: any; 

  breakpoint: number = (window.innerWidth <= 480) ? 1 : 3;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.listarImoveis();
  }

  onResize(event: any): void {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 3;
  }

  listarImoveis(): void {
    this.http.get<any>('http://localhost:3000/imoveis').subscribe(data => {
      this.imoveis = data;
    });
  }

  verDetalhes(imovelId: string): void {   
    this.router.navigate(['/detalhes', imovelId]);
  }

  toggleFavorito(imovelId: string): void {
    this.http.get<any>('http://localhost:3000/imoveis/' + imovelId).subscribe(data => {

      this.imovel = data;

      this.imovel.favorito = !this.imovel.favorito;
      this.http.patch('http://localhost:3000/imoveis/' + imovelId, { favorito: this.imovel.favorito })
        .subscribe(
          response => {
            if (this.imovel.favorito === true) {
              this._snackBar.open('O imóvel foi favoritado!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            } else {
              this._snackBar.open('O imóvel foi removido dos favoritos...', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            }
            this.listarImoveis();
          },
          error => {
              this._snackBar.open('Ocorreu um erro ao favoritar/desfavoritar o imóvel!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
              // Revert the 'favorito' value if the update fails
              this.imovel.favorito = !this.imovel.favorito;
            }            
          );
      });
   }
}
