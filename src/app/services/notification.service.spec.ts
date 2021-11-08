import { TestBed } from '@angular/core/testing';
import { CustomMaterialModule } from '../custom-material/custom-material.module';

import { NotificationService } from './notification.service';


describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomMaterialModule]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
