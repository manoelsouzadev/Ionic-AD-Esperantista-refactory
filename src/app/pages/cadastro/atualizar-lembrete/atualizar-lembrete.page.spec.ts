import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtualizarLembretePage } from './atualizar-lembrete.page';

describe('AtualizarLembretePage', () => {
  let component: AtualizarLembretePage;
  let fixture: ComponentFixture<AtualizarLembretePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarLembretePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtualizarLembretePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
