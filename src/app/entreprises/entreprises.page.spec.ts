import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntreprisesPage } from './entreprises.page';

describe('EntreprisesPage', () => {
  let component: EntreprisesPage;
  let fixture: ComponentFixture<EntreprisesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EntreprisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
