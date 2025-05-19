import { Injectable } from '@angular/core';
import { PokemonService } from './pokemonApi/pokemon.service';

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

  getPokemonStats(id:number):any{
    return this.pokemonService.getPokemonStats(id);
  }
}
