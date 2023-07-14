import { TestBed } from '@angular/core/testing';

import { BetBuilderService } from './bet-builder.service';

describe('BetBuilderService', () => {
  let service: BetBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
