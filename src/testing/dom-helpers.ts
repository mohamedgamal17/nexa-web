import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function queryByTestId<T>(
  fixture: ComponentFixture<T>,
  testId: string,
): DebugElement | null {
  return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
}

export function click<T>(fixture: ComponentFixture<T>, testId: string): void {
  const el = queryByTestId(fixture, testId);
  if (!el) throw new Error(`Element with data-testid="${testId}" not found`);
  el.nativeElement.click();
  fixture.detectChanges();
}
export function typeInInput<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  value: string
): void {
  const input: HTMLInputElement = queryByTestId(fixture, testId)!.nativeElement;
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  fixture.detectChanges();
}