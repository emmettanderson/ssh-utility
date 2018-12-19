import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrakLayoutComponent } from './trak-layout.component';

describe('TrakLayoutComponent', () => {
  let component: TrakLayoutComponent;
  let fixture: ComponentFixture<TrakLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrakLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrakLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
