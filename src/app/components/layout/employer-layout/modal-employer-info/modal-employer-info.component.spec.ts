import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployerInfoComponent } from './modal-employer-info.component';

describe('ModalEmployerInfoComponent', () => {
  let component: ModalEmployerInfoComponent;
  let fixture: ComponentFixture<ModalEmployerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmployerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmployerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
