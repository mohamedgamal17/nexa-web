import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankModal } from './bank-modal';
import { LinkedBankState } from '../../interfaces/linked-bank-state.interface';
import { ErrorModel } from '../../../../core/models/error-model.interface';

describe('BankModal', () => {
  let component: BankModal;
  let fixture: ComponentFixture<BankModal>;

  const erorrLinkedBankState   : LinkedBankState ={
      progress :'Error',
      error : <ErrorModel>{
        type : 'bad-request',
        title : 'Test error',
        message :'Test error messsage',
        status : 400,     
      }
    }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BankModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return linked bank error title', ()=>{
    fixture.componentRef.setInput("linkedBank" , erorrLinkedBankState)

    const errorTitle = component.getErrorTitle()

    expect(errorTitle).toBe(erorrLinkedBankState.error!.title)
  })

   it('should return linked bank error message', ()=>{
    fixture.componentRef.setInput("linkedBank" , erorrLinkedBankState)

    const errorTitle = component.getErrorMessage()

    expect(errorTitle).toBe(erorrLinkedBankState.error!.message)
  })
});
