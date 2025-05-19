import { Component, OnInit } from '@angular/core';
import { PASATIEMPOS, Trainer } from 'src/app/models/entrenador.interface';
import { AgePipe } from 'src/app/pipes/age/age.pipe';

@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.scss'],
  providers: [AgePipe],
})
export class ImageInfoComponent implements OnInit {
  imagePreview: string | null='';
  fallbackImage: string = '../../assets/person_icon.svg';
  trainer: Trainer={
    name:"",
    hobby:"",
    age:0,
    dui:""
  };
  pasatiempos= PASATIEMPOS;
  age:number=0;
  agePipe: any;

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const savedTrainer = localStorage.getItem('infoTrainer');
    const savedImage = localStorage.getItem('imgTrainer');
    console.log(savedImage);

    if (savedImage) {
      this.imagePreview = savedImage;
    }

    const trainerData = savedTrainer ? JSON.parse(savedTrainer) : {};
    this.trainer.name= trainerData.nombre;
    this.trainer.hobby= this.pasatiempos.find(i => i.value === trainerData.pasatiempo)?.viewValue || '';
    this.age= this.agePipe.transform(trainerData.cumpleanos);
    this.trainer.age= this.age;
    this.trainer.dui= trainerData.documento;
  }

}
