import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReferencesComponent } from './modal-references.component';

describe('ModalReferencesComponent', () => {
  let component: ModalReferencesComponent;
  let fixture: ComponentFixture<ModalReferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
