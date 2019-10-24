import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2LayuiComponent } from './ng2-layui.component';

describe('Ng2LayuiComponent', () => {
  let component: Ng2LayuiComponent;
  let fixture: ComponentFixture<Ng2LayuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2LayuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2LayuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
