import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfo } from './profile-info';
import { TranslateModule } from '@ngx-translate/core';
import { Gender } from '../../enums/gender.enum';

describe('ProfileInfo', () => {
  let component: ProfileInfo;
  let fixture: ComponentFixture<ProfileInfo>;

  const inputInfo = {
    firstName : "simple",
    lastName : "test",
    gender : Gender.Female,
    birthDate : "1/10/1998"
  }
  const formInfo = {
    firstName : "jhon",
    lastName : "doe",
    gender : Gender.Male,
    birthDate : "1/10/2001"
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInfo, TranslateModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit info submited when handle submit is called', ()=>{

    const spyOnSubmited = vi.spyOn(component.submited, 'emit')

    component.infoForm.patchValue({
      ...formInfo
    })

    component.handleSubmit(new Event('submit') as any)

    expect(spyOnSubmited).toHaveBeenCalledOnce()
  })

  it('should toggle edit profile value when toogle edit from is called',()=>{
    const currentValue = component.editProfile()

    component.toggleEditProfile()

    expect(component.editProfile()).toBe(!currentValue)
  })


    it('should not emit info submited when form info is same as input info', ()=>{

    const spyOnSubmited = vi.spyOn(component.submited, 'emit')

    fixture.componentRef.setInput('info' , formInfo)

    component.infoForm.patchValue({
      ...formInfo
    })

    component.handleSubmit(new Event('submit') as any)

    expect(spyOnSubmited).not.toHaveBeenCalledOnce()
  })
});
