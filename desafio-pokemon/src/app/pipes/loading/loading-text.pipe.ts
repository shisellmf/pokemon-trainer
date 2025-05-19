import { Pipe, PipeTransform } from '@angular/core';

export interface infoLoading {
  step:number;
  text: string;
}

@Pipe({
  name: 'loadingText'
})
export class LoadingTextPipe implements PipeTransform {

  infoLoading: infoLoading[] = [
    {step:2, text: 'Cargando perfil...'}
  ];

  transform(step:number): string {
    return this.infoLoading.find(i => i.step === step)?.text || 'Cargando...';
  }

}
