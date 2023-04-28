import { TestBed } from '@angular/core/testing';

import { InscriptionreinscriptionService } from './inscriptionreinscription.service';

describe('InscriptionreinscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InscriptionreinscriptionService = TestBed.get(InscriptionreinscriptionService);
    expect(service).toBeTruthy();
  });
});
