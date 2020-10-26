import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployerOverviewComponent } from './modal-employer-overview.component';

describe('ModalEmployerOverviewComponent', () => {
  let component: ModalEmployerOverviewComponent;
  let fixture: ComponentFixture<ModalEmployerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmployerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmployerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
