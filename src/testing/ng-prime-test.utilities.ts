import userEvent from '@testing-library/user-event';
import {screen} from "@testing-library/angular"

export async function setPrimeInput(testId: string, value: string) {
  var inputElement = screen.getByTestId(testId);

  if (inputElement) {
    await userEvent.type(inputElement, value);
  }
}

export async function selectPrimeOption(testId: string, optionName: string) {
  
  await userEvent.click(screen.getByTestId(testId));

  console.log(screen.getByTestId(testId))
  const option = await screen.findByRole('option', { name: optionName });

  console.log(option)
  await userEvent.click(option);
}

export async function clickPrimeButton(testId: string) {
  const buttonHost = screen.getByTestId(testId);

  const button = buttonHost.querySelector('button');

  if (button) {
    await userEvent.click(button);
    console.log("Clocked *")
  }
}

export async function setPrimeDatePicker(testId : string , value : string) {

    const datePicker = screen.getByTestId(testId);


    var input = datePicker.querySelector('input')!

    console.log(input)
    await userEvent.type(input, value); 
    console.log("4")
    console.log(datePicker.querySelector('input')?.value)
}
