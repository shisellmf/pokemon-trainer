import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Pokemon, PokemonStat, Stats, Types } from 'src/app/models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl:string= 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http:HttpClient) { }

  getListPokemon(){
    return this.http.get<{ results: { name: string; url: string }[] }>(`${this.baseUrl}?limit=9`).pipe(
      switchMap(response => {
        const requests: Observable<any>[] = response.results.map(pokemon =>
          this.http.get(pokemon.url)
        );
        return forkJoin(requests);
      }),
      map((details): Pokemon[] =>
        details.map(p => ({
          id: p.id,
          name: p.name,
          image: p.sprites.other.home.front_default,
          isSelected:false
        }))
      )
    );
  }

  searchListPokemon(search:string | number){
    return this.http.get<any>(`${this.baseUrl}/${search}`).pipe(
      map((p) : Pokemon => ({
        id: p.id,
        name: p.name,
        image: p.sprites.other.home.front_default,
        isSelected:false
      })),
      catchError(err => {
        return of(null);
      })
    );
  }

  getPokemonStats(id: number): Observable<PokemonStat> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map((data) => {
        const stats: Stats = {
          hp: this.extractStat(data.stats, 'hp'),
          attack: this.extractStat(data.stats, 'attack'),
          defense: this.extractStat(data.stats, 'defense'),
          specialAttack: this.extractStat(data.stats, 'special-attack'),
          specialDefense: this.extractStat(data.stats, 'special-defense'),
          speed: this.extractStat(data.stats, 'speed'),
        };

        const types: Types = {
          value: data.types.map((t: any) => t.type.name).join('/')
        };

        const result: PokemonStat = {
          stats,
          types
        };

        return result;
      })
    );
  }

  private extractStat(stats: any[], name: string): number {
    const statObj = stats.find(s => s.stat.name === name);
    return statObj ? statObj.base_stat : 0;
  }
}
