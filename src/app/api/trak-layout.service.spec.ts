import { TestBed, inject } from '@angular/core/testing';

import { TrakLayoutService } from './trak-layout.service';

describe('TrakLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrakLayoutService]
    });
  });

  it('should be created', inject([TrakLayoutService], (service: TrakLayoutService) => {
    expect(service).toBeTruthy();
  }));
});
