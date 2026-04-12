import { describe, it, expect } from 'vitest';
import { validateContactForm } from './validators';

describe('validateContactForm', () => {
  it('returns empty object for valid data', () => {
    const result = validateContactForm({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello there!',
    });
    expect(result).toEqual({});
  });

  it('returns error when name is empty', () => {
    const result = validateContactForm({
      name: '',
      email: 'jane@example.com',
      message: 'Hello',
    });
    expect(result.name).toBeDefined();
    expect(result.email).toBeUndefined();
    expect(result.message).toBeUndefined();
  });

  it('returns error when name is whitespace only', () => {
    const result = validateContactForm({
      name: '   ',
      email: 'jane@example.com',
      message: 'Hello',
    });
    expect(result.name).toBeDefined();
  });

  it('returns error when name exceeds 100 characters', () => {
    const result = validateContactForm({
      name: 'a'.repeat(101),
      email: 'jane@example.com',
      message: 'Hello',
    });
    expect(result.name).toBeDefined();
  });

  it('returns error when email is empty', () => {
    const result = validateContactForm({
      name: 'Jane',
      email: '',
      message: 'Hello',
    });
    expect(result.email).toBeDefined();
  });

  it('returns error for invalid email format', () => {
    const result = validateContactForm({
      name: 'Jane',
      email: 'not-an-email',
      message: 'Hello',
    });
    expect(result.email).toBeDefined();
  });

  it('returns error when message is empty', () => {
    const result = validateContactForm({
      name: 'Jane',
      email: 'jane@example.com',
      message: '',
    });
    expect(result.message).toBeDefined();
  });

  it('returns error when message is whitespace only', () => {
    const result = validateContactForm({
      name: 'Jane',
      email: 'jane@example.com',
      message: '   \n\t  ',
    });
    expect(result.message).toBeDefined();
  });

  it('returns error when message exceeds 2000 characters', () => {
    const result = validateContactForm({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'a'.repeat(2001),
    });
    expect(result.message).toBeDefined();
  });

  it('returns errors for all invalid fields at once', () => {
    const result = validateContactForm({
      name: '',
      email: '',
      message: '',
    });
    expect(Object.keys(result)).toHaveLength(3);
    expect(result.name).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.message).toBeDefined();
  });

  it('accepts name at exactly 100 characters', () => {
    const result = validateContactForm({
      name: 'a'.repeat(100),
      email: 'jane@example.com',
      message: 'Hello',
    });
    expect(result.name).toBeUndefined();
  });

  it('accepts message at exactly 2000 characters', () => {
    const result = validateContactForm({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'a'.repeat(2000),
    });
    expect(result.message).toBeUndefined();
  });
});
