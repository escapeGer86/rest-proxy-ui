import { TestBed, inject } from '@angular/core/testing';

import { KafkaRestStubService } from './kafka-rest-stub.service';

describe('KafkaRestStubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KafkaRestStubService]
    });
  });

  it('should be created', inject([KafkaRestStubService], (service: KafkaRestStubService) => {
    expect(service).toBeTruthy();
  }));
});
