import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trainer } from '../../models/entrenador.interface';
import { PASATIEMPOS } from 'src/app/models/entrenador.interface';
import { AgePipe } from '../../pipes/age/age.pipe';

@Component({
  selector: 'app-entrenador-equipo',
  templateUrl: './entrenador-equipo.component.html',
  styleUrls: ['./entrenador-equipo.component.scss'],
  providers: [AgePipe],
})
export class EntrenadorEquipoComponent implements OnInit {
  fallbackImage: string = '../../assets/person_icon.svg';
  imagePreview: string | ArrayBuffer | null = null;
  isLoading:boolean=false;
  step:number=1;
  trainer: Trainer={
    name:"",
    hobby:"",
    age:0,
    dui:""
  };
  pasatiempos= PASATIEMPOS;
  age:number=0;

  constructor(private fb: FormBuilder,private agePipe:AgePipe){
    const savedTrainer = localStorage.getItem('infoTrainer');
    const trainerData = savedTrainer ? JSON.parse(savedTrainer) : {};

    this.trainer.name= trainerData.nombre;
    this.trainer.hobby= this.pasatiempos.find(i => i.value === trainerData.pasatiempo)?.viewValue || '';

    this.age= this.agePipe.transform(trainerData.cumpleanos);
    this.trainer.age= this.age;
    this.trainer.dui= trainerData.documento;
  }

  ngOnInit(): void {
    this.isLoading=true;
    setTimeout(() => {
      this.isLoading= false;
    }, 2000);
  }
}
