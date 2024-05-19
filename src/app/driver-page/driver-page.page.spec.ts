import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverPagePage } from './DriverPagePage';

describe('DriverPagePage', () => {
  let component: DriverPagePage;
  let fixture: ComponentFixture<DriverPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DriverPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
