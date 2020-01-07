import { TestBed, inject } from '@angular/core/testing';

import { CommandListService } from './command-list.service';

describe('CommandListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandListService]
    });
  });

  it('should be created', inject([CommandListService], (service: CommandListService) => {
    expect(service).toBeTruthy();
  }));
});
