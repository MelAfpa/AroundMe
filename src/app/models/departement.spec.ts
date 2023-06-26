import { TestBed } from '@angular/core/testing';

import { Departement } from './departement';

describe('Departement', () => {
  /*let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbService);
  });
*/
  it('should be created', () => {
    expect(new Departement()).toBeTruthy();
  });
});
