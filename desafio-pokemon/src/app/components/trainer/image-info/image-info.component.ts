import { Component, Input, OnInit } from '@angular/core';
import { PASATIEMPOS, Trainer } from 'src/app/models/entrenador.interface';
import { FacadeService } from '../../../services/facade.service';

@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.scss']
})
export class ImageInfoComponent implements OnInit {
  imagePreview: string | null='';
  fallbackImage: string = '../../assets/person_icon.svg';
  trainer: Trainer={
    name:"",
    hobby:"",
    birthday: new Date(),
    dui:""
  };
  pasatiempos= PASATIEMPOS;
  age:number=0;
  @Input() public step:number=1;

  constructor(private facadeService:FacadeService){}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const savedTrainer = this.facadeService.getInfoTrainer();
    const savedImage = this.facadeService.getImageTrainer();

    if (savedImage) {
      this.imagePreview = savedImage.image;
    }

    const trainerData = savedTrainer ? JSON.parse(savedTrainer) : {};
    this.trainer.name= trainerData.nombre;
    this.trainer.hobby= this.pasatiempos.find(i => i.value === trainerData.pasatiempo)?.viewValue || '';
    this.trainer.birthday= trainerData.cumpleanos;
    this.trainer.dui= trainerData.documento;
  }

}
