import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-equipo-pokemon',
  templateUrl: './equipo-pokemon.component.html',
  styleUrls: ['./equipo-pokemon.component.scss'],

})
export class EquipoPokemonComponent {
  trainerName:string | null='';
  isLoading:boolean=false;
  step:number=2;

  constructor(private facadeService:FacadeService){}

  ngOnInit(): void {

    this.getData();

    this.isLoading=true;
    setTimeout(() => {
      this.isLoading= false;
    }, 2000);
  }

  getData(){
    this.trainerName = this.facadeService.getNameTrainer();
  }
}
