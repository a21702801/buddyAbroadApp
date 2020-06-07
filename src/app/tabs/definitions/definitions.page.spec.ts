import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DefinitionsPage } from './definitions.page';

describe('DefinitionsPage', () => {
  let component: DefinitionsPage;
  let fixture: ComponentFixture<DefinitionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionsPage ],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DefinitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
