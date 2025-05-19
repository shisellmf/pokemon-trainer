import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() public isLoading:boolean=false;
  @Input() public info: string= "Cargando...";

}
