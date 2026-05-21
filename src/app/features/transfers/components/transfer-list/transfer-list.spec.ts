import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferList } from './transfer-list';
import { Clipboard } from '@angular/cdk/clipboard';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
describe('TransferList', () => {
  let component: TransferList;
  let fixture: ComponentFixture<TransferList>;
  const mockedTranslateService = {
    instant: vi.fn((key: string) => key),
  };
  const mockedClipboard = {
    copy: vi.fn(),
  };

  const mockedMessageService = {
    add: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferList],
      providers: [
        { provide: TranslateService, useValue: mockedTranslateService },
        { provide: Clipboard, useValue: mockedClipboard },
      ],
    })
      .overrideComponent(TransferList, {
        set: {
          providers: [{ provide: MessageService, useValue: mockedMessageService }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TransferList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy transfer number and show message when copyTransferNumber is called', () => {
    component.copyTransferNumber({ text: '12345' });
    expect(mockedClipboard.copy).toHaveBeenCalledWith('12345');
    expect(mockedTranslateService.instant).toHaveBeenCalledWith('toast.transferCopied.message');
    expect(mockedMessageService.add).toHaveBeenCalledWith({
      detail: mockedTranslateService.instant('toast.transferCopied.message'),
      severity: 'contrast',
      key: 'br',
      life: 3000,
    });

  });
});
