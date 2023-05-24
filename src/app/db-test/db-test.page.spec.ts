import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbTestPage } from './db-test.page';

describe('DbTestPage', () => {
  let component: DbTestPage;
  let fixture: ComponentFixture<DbTestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DbTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
