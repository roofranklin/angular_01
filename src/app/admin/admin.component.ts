import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatSnackBarModule],
})

export class AdminComponent implements OnInit {

  imovel: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['foto', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource();

  constructor ( 
    private _snackBar: MatSnackBar, 
    private http: HttpClient 
  ) {}

  ngOnInit(): void {
    this.listarImoveis();
  }

  listarImoveis(): void {
    this.http.get<any>('http://localhost:3000/imoveis').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  adicionarImovel(): void {

  }

  editarImovel(imovelId: string): void {
    
  }

  deletarImovel(imovelId: string): void {
    this.http.delete('http://localhost:3000/imoveis/' + imovelId).subscribe(response => {
      this._snackBar.open('O imóvel foi removido!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
      this.listarImoveis();
    },
    error => {
      this._snackBar.open('Ocorreu um erro ao remover o imovel ' + error, 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
    });
  }

  toggleFavorito(imovelId: string): void {
    this.http.get<any>('http://localhost:3000/imoveis/' + imovelId).subscribe(data => {

      this.imovel = data;

      this.imovel.favorito = !this.imovel.favorito;
      this.http.patch('http://localhost:3000/imoveis/' + imovelId, { favorito: this.imovel.favorito })
        .subscribe(
          response => {
            // console.log('Property favorito status updated successfully:', response);
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

            this.http.get<any>('http://localhost:3000/imoveis').subscribe(data => {
              this.dataSource.data = data;
            });
          },
          error => {
            // console.error('Error updating property favorito status:', error);
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

  filtrarImovel(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
