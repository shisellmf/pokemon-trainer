import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEntrenadorComponent } from './pages/registro-entrenador/registro-entrenador.component';
import { EntrenadorEquipoComponent } from './pages/entrenador-equipo/entrenador-equipo.component';
import { EquipoPokemonComponent } from './pages/equipo-pokemon/equipo-pokemon.component';

const routes: Routes = [
  { path: '', redirectTo: '/registro-entrenador', pathMatch: 'full' },
  {path:"registro-entrenador", component:RegistroEntrenadorComponent},
  {path:"entrenador-equipo", component:EntrenadorEquipoComponent},
  {path:"equipo-pokemon", component:EquipoPokemonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
