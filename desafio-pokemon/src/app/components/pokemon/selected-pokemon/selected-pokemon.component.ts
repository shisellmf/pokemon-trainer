import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { FullPokemon, PokemonStat } from 'src/app/models/pokemon.interface';
import { FacadeService } from '../../../services/facade.service';

@Component({
  selector: 'app-selected-pokemon',
  templateUrl: './selected-pokemon.component.html',
  styleUrls: ['./selected-pokemon.component.scss']
})
export class SelectedPokemonComponent implements OnInit {
  pokemonStats!: PokemonStat;
  fullPokemonList: FullPokemon[] = [];

  constructor(private facadeService:FacadeService){}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const infoPokemon= this.facadeService.getSelectedPokemon();
    const pokemonData = infoPokemon ? JSON.parse(infoPokemon) : {};

    this.loadFullPokemonList(pokemonData);
  }

  loadFullPokemonList(pokemonData: any[]) {

    const requests = pokemonData.map(pokemon =>
      this.getPokemonStat(pokemon.id).pipe(
        map(stats => ({
          pokemon: pokemon,
          stats: stats
        }))
      )
    );

    forkJoin(requests).subscribe(fullList => {
      this.fullPokemonList = fullList;
    });
  }

  getPokemonStat(idPokemon: number): Observable<PokemonStat> {
    return this.facadeService.getPokemonStats(idPokemon);
  }
}
