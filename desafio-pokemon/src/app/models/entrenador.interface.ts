
export interface Trainer{
  name: string;
  hobby: string;
  age: number;
  dui?: string;
}

export interface Hobbies {
  value: string;
  viewValue: string;
}

export const PASATIEMPOS: Hobbies[] = [
  { value: '1', viewValue: 'Jugar Fútbol' },
  { value: '2', viewValue: 'Jugar Basquetball' },
  { value: '3', viewValue: 'Jugar Tennis' },
  { value: '4', viewValue: 'Jugar Voleibol' },
  { value: '5', viewValue: 'Jugar Fifa' },
  { value: '6', viewValue: 'Jugar Videojuegos' },
];
