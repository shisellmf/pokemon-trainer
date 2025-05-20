import { Component, inject, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PASATIEMPOS, Trainer } from 'src/app/models/entrenador.interface';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-registro-entrenador',
  templateUrl: './registro-entrenador.component.html',
  styleUrls: ['./registro-entrenador.component.scss']
})

export class RegistroEntrenadorComponent implements OnInit{
  fallbackImage: string = '../../assets/person_icon.svg';
  imageText:string='Adjunta una foto';
  imageFile!: File;
  imagePreview: string | ArrayBuffer | null = null;
  isLoading:boolean=false;
  isVisible:boolean=true;
  nameTrainer:string='';
  step:number=0;

  constructor(private snackBar:MatSnackBar,private facadeService:FacadeService){}

  ngOnInit(): void {
    this.getData();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) { // > 1MB
      this.openSnackBar('La imagen es demasiado grande. Selecciona una menor a 1MB.','Ok')
      return;
    }

    this.imageFile = file;
    this.imageText= this.imageFile.name;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.imagePreview = reader.result;
        this.facadeService.setImageTrainer(result,this.imageText?this.imageText:'');
      }
    };
    reader.readAsDataURL(file);

  }

  getData(){
    const savedImage = this.facadeService.getImageTrainer();

    if (savedImage.image) {
      this.imagePreview = savedImage.image;
      this.imageText= savedImage.text?savedImage.text:'';
    }
  }

}
