import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImageTrainer } from '../models/entrenador.interface';
import { Pokemon } from '../models/pokemon.interface';
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

  setImageTrainer(result:any,imageText:string){
    sessionStorage.setItem('imgTrainer', result);
    sessionStorage.setItem('imgTrainerText', imageText);
  }

  setInfoTrainer(profileForm: FormGroup){
    sessionStorage.setItem("trainerName",profileForm.get('nombre')?.value || '');
    sessionStorage.setItem("infoTrainer",JSON.stringify(profileForm.value));
  }

  setSelectedPoken(selectedPokemons:Pokemon[]){
    sessionStorage.setItem("selectedPoken",JSON.stringify(selectedPokemons));
  }

  getPokemonStats(id:number):any{
    return this.pokemonService.getPokemonStats(id);
  }

  getSelectedPokemon()
  {
    return sessionStorage.getItem("selectedPoken");
  }

  getInfoTrainer()
  {
    return sessionStorage.getItem("infoTrainer");
  }

  getImageTrainer():ImageTrainer
  {
    const image = sessionStorage.getItem("imgTrainer");
    const text = sessionStorage.getItem("imgTrainerText");
    const imageInfo: ImageTrainer = {
      image: image,
      text: text
    };

  return imageInfo;
  }

  getNameTrainer(){
    return sessionStorage.getItem('trainerName');
  }

}
