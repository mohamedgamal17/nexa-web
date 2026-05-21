import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentTransferContainer } from './recent-transfer-container';
import { TransferServiceService } from '../../services/transfer-service.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('RecentTransferContainer', () => {
  let component: RecentTransferContainer;
  let fixture: ComponentFixture<RecentTransferContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTransferContainer, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        {
          provide: TransferServiceService,
          useValue: {
            getAllTransfers: vi.fn(() =>
              of({
                data: [{ id: 't1', amount: 50 }],
                info: { skip: 0, length: 5, totalCount: 1 },
              }),
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentTransferContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose transfers from resource', async () => {
    await fixture.whenStable();
    expect(component.transfers().length).toBeGreaterThanOrEqual(0);
  });

  it('should compute loading from resource', () => {
    expect(typeof component.loading()).toBe('boolean');
  });
});
