class AuthorizationError extends Error {
  constructor(message?: string) {
    super(message ?? 'Authorization error');
    this.name = 'AuthorizationError';
  }
}

export class InvalidCredentialsError extends AuthorizationError {
  constructor(message?: string) {
    super(message ?? 'Invalid credentials');
    this.name = 'InvalidCredentialsError';
  }
}

export class InvalidEmpIdError extends InvalidCredentialsError {
  constructor() {
    super('Employee ID not found');
    this.name = 'InvalidEmpIdError';
  }
}

export class InvalidPasswordError extends InvalidCredentialsError {
  constructor() {
    super('Invalid password');
    this.name = 'InvalidPasswordError';
  }
}

export class UnauthorizedAccessError extends AuthorizationError {
  constructor() {
    super('Unauthorized access');
    this.name = 'UnauthorizedAccessError';
  }
}