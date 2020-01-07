import { TestBed, inject } from '@angular/core/testing';

import { TargetListService } from './target-list.service';

describe('TargetListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetListService]
    });
  });

  it('should be created', inject([TargetListService], (service: TargetListService) => {
    expect(service).toBeTruthy();
  }));
});
