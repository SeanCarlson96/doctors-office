import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptBlockComponent } from './appt-block.component';

describe('ApptBlockComponent', () => {
  let component: ApptBlockComponent;
  let fixture: ComponentFixture<ApptBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApptBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApptBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
