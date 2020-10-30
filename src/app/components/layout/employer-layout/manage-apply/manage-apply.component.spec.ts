import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApplyComponent } from './manage-apply.component';

describe('ManageApplyComponent', () => {
  let component: ManageApplyComponent;
  let fixture: ComponentFixture<ManageApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
