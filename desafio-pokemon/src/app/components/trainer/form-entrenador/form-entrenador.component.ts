import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { PASATIEMPOS } from 'src/app/models/entrenador.interface';

@Component({
  selector: 'app-form-entrenador',
  templateUrl: './form-entrenador.component.html',
  styleUrls: ['./form-entrenador.component.scss']
})
export class FormEntrenadorComponent implements OnInit {
  @ViewChild('btnContinuar', {static: true}) private btnContinuar!: MatButton;
  @Output() step = new EventEmitter<number>();

  profileForm: FormGroup;
  disabledButton: boolean= false;
  descripcionDocumento:string='Documento';
  patternDui:RegExp = /^\d{8}-\d{1}$/;
  pasatiempos= PASATIEMPOS;

  constructor(private fb: FormBuilder, private router:Router) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      pasatiempo: [''],
      cumpleanos: ['',Validators.required],
      documento: ['']
    });
  }

  ngOnInit(): void {
    this.profileForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.btnContinuar.disabled=false;
      } else {
        this.btnContinuar.disabled=true;
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      localStorage.setItem("trainerName",this.profileForm.get('nombre')?.value || '');
      localStorage.setItem("infoTrainer",JSON.stringify(this.profileForm.value));
      this.router.navigate(["/entrenador-equipo"]);
    }
  }

  updateDuiValidator(cumpleanos:Date){
    const today = new Date();
    const birth = new Date(cumpleanos);
    let isAdult = today.getFullYear() - birth.getFullYear();
    this.setValidatorDui(isAdult);
  }

  setValidatorDui(isAdult:number){
    const documentoControl = this.profileForm.get('documento');
    if (isAdult > 18) {
      this.descripcionDocumento= 'DUI';
      documentoControl?.setValidators([Validators.required,Validators.pattern(this.patternDui)]);
    } else {
      this.descripcionDocumento= 'Carnet de Minoridad';
    }
    documentoControl?.updateValueAndValidity();
  }
}
