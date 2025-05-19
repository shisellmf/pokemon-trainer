import { Component, OnInit } from '@angular/core';

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

  nextStep(step:number){
    this.step= step;
    this.isLoading=true;
    setTimeout(() => {
      this.isLoading= false;
    }, 2000);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.imageFile = input.files[0];
    this.imageText= this.imageFile.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.imageFile);
  }

}
