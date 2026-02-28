import { AbstractControl } from "@angular/forms";
import { min } from "rxjs";

export class CustomValidator {

  static enumValidator(enumObj: object) {
    const enumValues = Object.values(enumObj);

    return (control: AbstractControl) => {
      if (!control.value) return null;

      return enumValues.includes(control.value)
        ? null
        : { invalidEnum: true };
    };
  }

  static verifyDate() {
    return (control: AbstractControl) => {
      const value = control.value

      if (value) {
        var date = new Date(value)

        if (isNaN(date.getTime())) {
          return {
            invalidDate: true
          }
        }
      }

      return null

    }

  }
  static verifyAge() {
    return (control: AbstractControl) => {
      const value = control.value

      console.log("v age")
      if (value) {

        var ageDate = new Date(value)

        var currentDate = new Date()

        var age = currentDate.getFullYear() - ageDate.getFullYear()
        
        return age < 5 || age > 90
          ? { invalidAge: true }
          : null
      }
      return null
    }
  }

  static minAge(minAge: number) {
    return (control: AbstractControl) => {
      var value = control.value
      if (value) {
        var birthDate = new Date(value)

        if (isNaN(birthDate.getTime())) {
          return null
        }

        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (age < minAge) {
          return {
            minAge: {
              min: minAge
            }
          }
        }
      }
      return null
    }
  }
}