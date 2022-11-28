import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailApptsComponent } from './avail-appts.component';

describe('AvailApptsComponent', () => {
  let component: AvailApptsComponent;
  let fixture: ComponentFixture<AvailApptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailApptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailApptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
