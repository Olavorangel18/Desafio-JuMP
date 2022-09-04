import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacaoPaginaComponent } from './identificacao-pagina.component';

describe('IdentificacaoPaginaComponent', () => {
  let component: IdentificacaoPaginaComponent;
  let fixture: ComponentFixture<IdentificacaoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacaoPaginaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentificacaoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
