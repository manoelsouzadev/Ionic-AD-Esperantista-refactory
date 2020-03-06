import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnsaiosPage } from './ensaios.page';

describe('EnsaiosPage', () => {
  let component: EnsaiosPage;
  let fixture: ComponentFixture<EnsaiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsaiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnsaiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
