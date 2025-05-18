import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.interface';

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
}
