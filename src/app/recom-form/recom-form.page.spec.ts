import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomFormPage } from './recom-form.page';

describe('RecomFormPage', () => {
  let component: RecomFormPage;
  let fixture: ComponentFixture<RecomFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecomFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
