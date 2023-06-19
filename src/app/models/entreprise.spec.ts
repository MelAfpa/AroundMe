import { TestBed } from '@angular/core/testing';

import { Entreprise } from './entreprise';

describe('Entreprise', () => {
  /*let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbService);
  });
*/
  it('should be created', () => {
    expect(new Entreprise()).toBeTruthy();
  });
});
