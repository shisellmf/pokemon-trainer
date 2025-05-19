import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.interface';

@Component({
  selector: 'app-equipo-pokemon',
  templateUrl: './equipo-pokemon.component.html',
  styleUrls: ['./equipo-pokemon.component.scss'],

})
export class EquipoPokemonComponent {
  trainerName:string | null='';
  isLoading:boolean=false;
  step:number=2;

  ngOnInit(): void {

    this.getData();

    this.isLoading=true;
    setTimeout(() => {
      this.isLoading= false;
    }, 2000);
  }

  getData(){
    const savedTrainer = localStorage.getItem('trainerName');
  }
}
