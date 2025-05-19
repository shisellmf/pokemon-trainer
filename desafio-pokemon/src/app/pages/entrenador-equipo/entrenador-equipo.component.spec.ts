import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenadorEquipoComponent } from './entrenador-equipo.component';

describe('EntrenadorEquipoComponent', () => {
  let component: EntrenadorEquipoComponent;
  let fixture: ComponentFixture<EntrenadorEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrenadorEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrenadorEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
