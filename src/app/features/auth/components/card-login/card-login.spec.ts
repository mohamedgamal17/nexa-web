import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLogin } from './card-login';

describe('CardLogin', () => {
  let component: CardLogin;
  let fixture: ComponentFixture<CardLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(CardLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit login request while handle button click is called', ()=>{
    const spyOnLoginRequested = vi.spyOn(component.loginRequested, 'emit')

    component.handleButtonClick()
    
    expect(spyOnLoginRequested).toHaveBeenCalledOnce()
  })
});
