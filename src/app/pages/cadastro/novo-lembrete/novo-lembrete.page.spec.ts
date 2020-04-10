import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovoLembretePage } from './novo-lembrete.page';

describe('NovoLembretePage', () => {
  let component: NovoLembretePage;
  let fixture: ComponentFixture<NovoLembretePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoLembretePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovoLembretePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
