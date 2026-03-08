import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTransferContainer } from './recent-transfer-container';

describe('RecentTransferContainer', () => {
  let component: RecentTransferContainer;
  let fixture: ComponentFixture<RecentTransferContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTransferContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentTransferContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
