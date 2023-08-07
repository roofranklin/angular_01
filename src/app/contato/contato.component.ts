import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common'
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf],
})
export class ContatoComponent {
  
  nome = new FormControl('', Validators.required);
  email = new FormControl('', [ Validators.required, Validators.email ]);
  assunto = new FormControl('');
  mensagem = new FormControl('', [ Validators.required, Validators.minLength(6) ]);

  getErrorMessage() {

    if (this.nome.hasError('required')) {
      return 'Este campo é de preenchimento obrigatório!';
    }

    if (this.email.hasError('required')) {
      return 'Este campo é de preenchimento obrigatório';
    }

    if (this.email.hasError('email')) {
      return 'Digite um e-mail válido';
    }

    if (this.mensagem.hasError('required')) {
      return 'Este campo é de preenchimento obrigatório';
    }

    if (this.mensagem.hasError('minLength()')) {
      return 'Mínimo de 06 caracteres é oibrigatório!';
    }

    return  ''

  }

  submitForm() {
    const Formdata = {
      nome: this.nome.value,
      email: this.email.value,
      assunto: this.assunto.value,
      mensagem: this.mensagem.value
    }

    console.log(Formdata);
  }

}
