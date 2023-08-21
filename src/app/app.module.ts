import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData, NgFor } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RodapeComponent } from './rodape/rodape.component';
import { SessionTimerComponent } from './session-timer/session-timer.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AdminComponent } from './admin/admin.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    QuemSomosComponent,
    CabecalhoComponent,
    DetalhesComponent,
    RodapeComponent,
    SessionTimerComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    NgFor
  ],
  providers: [
    [ AuthService ],
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
