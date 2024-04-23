import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginDriverPage } from './login-driver.page';

describe('LoginDriverPage', () => {
  let component: LoginDriverPage;
  let fixture: ComponentFixture<LoginDriverPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginDriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
