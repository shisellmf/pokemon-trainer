import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokemonService } from './listado/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private pokemonService:PokemonService) { }

  getListPokemon(search:string=''){
    return this.pokemonService.getListPokemon();
  }

  searchListPokemon(search:string|number){
    return this.pokemonService.searchListPokemon(search);
  }

}
