import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { FacadeService } from '../../../services/facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})

export class ListPokemonComponent implements OnInit {

  @ViewChild('btnGuardar', {static: true}) private btnGuardar!: MatButton;

  list:Pokemon[]=[];
  selectedList:Pokemon[]=[];
  selected: number[] = []
  countPokemonSelected:number=1;
  isNotFoundPokemon:boolean= false;

  searchControl = new FormControl('');
  private debouncerSubscription?: Subscription;


  constructor(private facadeService:FacadeService, private router:Router){}


  ngOnInit(): void {
    this.getList();

    this.debouncerSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.searchList(value);
      });
  }

  isSelected(id: number):boolean {
    const selectedPokemon: Pokemon | undefined = this.list.find(p => p.id === id);

    if(selectedPokemon != undefined && selectedPokemon.isSelected){
      return true;
    }else{
      return false;
    }
  }

  select(selectedPokemon:Pokemon){
     selectedPokemon.isSelected=true;
  }

  deselect(selectedPokemon:Pokemon){
    selectedPokemon.isSelected=false;
  }

  searchList(text:string|number|null){
    if(text){
      this.facadeService.searchListPokemon(text).subscribe((data: Pokemon | null) => {
        if (data) {
          this.isNotFoundPokemon = false;
          this.list = [{
            ...data,
            isSelected: this.isSelected(data.id)
          }];
        } else {
          this.list = [];
          this.isNotFoundPokemon = true;
        }
      });
    }else{
      this.isNotFoundPokemon = false;
      this.getList();
    }
  }

  getList(){
    this.facadeService.getListPokemon().subscribe((data: Pokemon[]) => {
      this.list = data.map(d => ({
        ...d,
        isSelected: this.isSelected(d.id),
      }));
      this.getData();
    });
  }


  selectPokemon(id:number){

      const selectedPokemon: Pokemon | undefined = this.list.find(p => p.id === id);
      if (!selectedPokemon){
        return
      }

      const futureState = !selectedPokemon.isSelected;

      if (futureState){
        if(this.countPokemonSelected<=3){
          this.select(selectedPokemon);
          this.countPokemonSelected= this.countPokemonSelected+1;
        }
      } else {
        this.deselect(selectedPokemon);
        this.countPokemonSelected= this.countPokemonSelected-1;
      }

      if(this.countPokemonSelected==4){
        this.btnGuardar.disabled=false;

      }else{this.btnGuardar.disabled=true;}

  }

  saveTeam(){
    const selectedPokemons: Pokemon[] = this.list.filter(p => p.isSelected === true);
    this.facadeService.setSelectedPoken(selectedPokemons);
    this.router.navigate(['/equipo-pokemon']);
  }

  getData(){
    const infoPokemon= this.facadeService.getSelectedPokemon();

    if(infoPokemon){
      const pokemonData:Pokemon[] = infoPokemon ? JSON.parse(infoPokemon) : [];
      this.list = this.list.map(pokemon => {
        const found = pokemonData.find((p: { id: number }) => p.id === pokemon.id);
        return {
          ...pokemon,
          isSelected: !!found
        };
      });
      this.btnGuardar.disabled=false;
      this.countPokemonSelected=4;
    }
  }
}
