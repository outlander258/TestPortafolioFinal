import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalPagePage } from './principal-page.page';

describe('PrincipalPagePage', () => {
  let component: PrincipalPagePage;
  let fixture: ComponentFixture<PrincipalPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrincipalPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
