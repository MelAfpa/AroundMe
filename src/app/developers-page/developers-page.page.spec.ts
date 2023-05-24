import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevelopersPagePage } from './developers-page.page';

describe('DevelopersPagePage', () => {
  let component: DevelopersPagePage;
  let fixture: ComponentFixture<DevelopersPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DevelopersPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
