export interface Pokemon{
  id:number;
  name:string;
  image:string;
  isSelected:boolean;
}

export interface FullPokemon {
  pokemon: Pokemon;
  stats: PokemonStat;
}


export interface PokemonStat {
  types: Types;
  stats: Stats;
}

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface Types {
  value: string;
}
