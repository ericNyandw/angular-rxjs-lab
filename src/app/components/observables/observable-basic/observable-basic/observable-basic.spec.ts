import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableBasic } from './observable-basic';

describe('ObservableBasic', () => {
  let component: ObservableBasic;
  let fixture: ComponentFixture<ObservableBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableBasic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableBasic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
