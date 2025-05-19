import { Component } from '@angular/core';

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

    /*this.isLoading=true;
    setTimeout(() => {
      this.isLoading= false;
    }, 2000);*/
  }

  getData(){
    const savedTrainer = localStorage.getItem('trainerName');
    this.trainerName= savedTrainer;
  }
}
