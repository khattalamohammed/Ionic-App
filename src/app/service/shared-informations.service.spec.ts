import { TestBed } from '@angular/core/testing';

import { SharedInformationsService } from './shared-informations.service';

describe('SharedInformationsService', () => {
  let service: SharedInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
