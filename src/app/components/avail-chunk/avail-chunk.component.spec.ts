import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailChunkComponent } from './avail-chunk.component';

describe('AvailChunkComponent', () => {
  let component: AvailChunkComponent;
  let fixture: ComponentFixture<AvailChunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailChunkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
