import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { AgePipe } from '../../pipes/age/age.pipe';

@Component({
  selector: 'app-entrenador-equipo',
  templateUrl: './entrenador-equipo.component.html',
  styleUrls: ['./entrenador-equipo.component.scss'],
})
export class EntrenadorEquipoComponent implements OnInit {

  isLoading:boolean=false;
  step:number=1;
  trainerName:string | null='';

  ngOnInit(): void {

    this.getData();

    this.isLoading=true;
    setTimeout(() => {
      this.isLoading= false;
    }, 2000);
  }

  getData(){
    const savedTrainer = localStorage.getItem('trainerName');
    this.trainerName= savedTrainer;
  }
}
