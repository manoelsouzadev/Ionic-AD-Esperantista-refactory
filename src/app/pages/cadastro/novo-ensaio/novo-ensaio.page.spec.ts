import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovoEnsaioPage } from './novo-ensaio.page';

describe('NovoEnsaioPage', () => {
  let component: NovoEnsaioPage;
  let fixture: ComponentFixture<NovoEnsaioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoEnsaioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovoEnsaioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
