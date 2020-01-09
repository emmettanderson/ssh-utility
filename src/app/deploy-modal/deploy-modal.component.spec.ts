import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployModalComponent } from './deploy-modal.component';

describe('DeployModalComponent', () => {
  let component: DeployModalComponent;
  let fixture: ComponentFixture<DeployModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
