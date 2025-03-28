import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.stubGlobal("fetch", vi.fn());

// Ensure TypeScript treats this file as a module
export {};
