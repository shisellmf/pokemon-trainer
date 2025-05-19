import { Component, inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-entrenador',
  templateUrl: './registro-entrenador.component.html',
  styleUrls: ['./registro-entrenador.component.scss']
})

export class RegistroEntrenadorComponent{
  fallbackImage: string = '../../assets/person_icon.svg';
  imageText:string='Adjunta una foto';
  imageFile!: File;
  imagePreview: string | ArrayBuffer | null = null;
  isLoading:boolean=false;
  isVisible:boolean=true;
  nameTrainer:string='';
  step:number=0;

  constructor(private snackBar:MatSnackBar){}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) { // > 1MB
      this.openSnackBar('La imagen es demasiado grande. Selecciona una menor a 1MB.','ok')
      return;
    }

    this.imageFile = file;
    this.imageText= this.imageFile.name;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.imagePreview = reader.result;
        localStorage.setItem('imgTrainer', result);
      }
    };
    reader.readAsDataURL(file);

  }

}
