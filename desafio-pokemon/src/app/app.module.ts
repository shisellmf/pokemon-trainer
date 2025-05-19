import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroEntrenadorComponent } from './pages/registro-entrenador/registro-entrenador.component';
import { FormEntrenadorComponent } from './components/trainer/form-entrenador/form-entrenador.component';
import { ListPokemonComponent } from './components/pokemon/list-pokemon/list-pokemon.component';
import { NgxMaskModule } from 'ngx-mask';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingTextPipe } from './pipes/loading/loading-text.pipe';
import { HeaderTextPipe } from './pipes/header/header-text.pipe';
import { EntrenadorEquipoComponent } from './pages/entrenador-equipo/entrenador-equipo.component';
import { AgePipe } from './pipes/age/age.pipe';
import { ImageInfoComponent } from './components/trainer/image-info/image-info.component';
import { EquipoPokemonComponent } from './pages/equipo-pokemon/equipo-pokemon.component';
import { SelectedPokemonComponent } from './components/pokemon/selected-pokemon/selected-pokemon.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroEntrenadorComponent,
    FormEntrenadorComponent,
    ListPokemonComponent,
    LoadingComponent,
    LoadingTextPipe,
    HeaderTextPipe,
    EntrenadorEquipoComponent,
    AgePipe,
    ImageInfoComponent,
    EquipoPokemonComponent,
    SelectedPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
