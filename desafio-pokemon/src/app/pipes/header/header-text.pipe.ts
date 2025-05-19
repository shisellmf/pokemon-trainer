import { Pipe, PipeTransform } from '@angular/core';

export interface infoHeader {
  step:number;
  prefix:string;
  title: string;
  subtitle: string;
}

@Pipe({
  name: 'headerText'
})
export class HeaderTextPipe implements PipeTransform {
  text:string='';

  infoHeader: infoHeader[] = [
    {step:0, prefix:"¡Hola! ", title: 'Configuremos tu perfil', subtitle: 'Queremos conocerte mejor'},
    {step:1, prefix:"", title: '¡Ya casi términamos!', subtitle: 'Revisa la información y completa lo solicitado'},
    {step:2, prefix:"", title: '¡Hola ', subtitle: ''}
  ];

  transform(step:number,type:number): string {

    switch(type){
      case 1:
        this.text= this.infoHeader.find(i => i.step === step)?.prefix || '';
        break
      case 2:
        this.text=this.infoHeader.find(i => i.step === step)?.title || '';
        break
      case 3:
        this.text=this.infoHeader.find(i => i.step === step)?.subtitle || '';
        break
    }
    return this.text;
  }
}
