import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForeignLangugeComponent } from './modal-foreign-languge.component';

describe('ModalForeignLangugeComponent', () => {
  let component: ModalForeignLangugeComponent;
  let fixture: ComponentFixture<ModalForeignLangugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalForeignLangugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForeignLangugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
