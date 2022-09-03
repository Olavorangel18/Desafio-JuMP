import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosTableComponent } from './processos-table.component';

describe('ProcessosTableComponent', () => {
  let component: ProcessosTableComponent;
  let fixture: ComponentFixture<ProcessosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
