import { Component, inject, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PASATIEMPOS, Trainer } from 'src/app/models/entrenador.interface';

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

  constructor(private snackBar:MatSnackBar){}

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
        sessionStorage.setItem('imgTrainer', result);
        sessionStorage.setItem('imgTrainerText', this.imageText);
      }
    };
    reader.readAsDataURL(file);

  }

  getData(){
    const savedImage = sessionStorage.getItem('imgTrainer');
    const savedImageText = sessionStorage.getItem('imgTrainerText');

    if (savedImage && savedImageText) {
      this.imagePreview = savedImage;
      this.imageText= savedImageText;
    }
  }

}
