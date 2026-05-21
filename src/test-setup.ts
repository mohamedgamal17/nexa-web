import { NgModule } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { vi } from 'vitest';

const win = globalThis.window as any;

// 1. Create matchMedia FIRST
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

HTMLElement.prototype.scrollIntoView = function() {};
window.HTMLElement.prototype.scrollIntoView = () => { };

// 3. optional: mock Overlay / Dialog if needed
vi.mock('primeng/overlay', () => ({ Overlay: class {} }));
vi.mock('primeng/dialog', () => ({ Dialog: class {} }));
vi.mock('primeng/dropdown', () => ({ Dropdown: class {} }));
vi.mock('primeng/select', () => ({ Select: class {} }));

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
)