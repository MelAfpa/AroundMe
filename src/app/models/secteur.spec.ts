import { TestBed } from '@angular/core/testing';

import { Secteur } from './secteur';

describe('Secteur', () => {
  /*let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbService);
  });
*/
  it('should be created', () => {
    expect(new Secteur()).toBeTruthy();
  });
});
