class DataBaseError extends Error {
  constructor(message?: string) {
    super(message ?? 'Database error');
    this.name = 'DataBaseError';
  }
}



export class DataNotFoundError extends DataBaseError {
  constructor() {
    super('Data not found');
    this.name = 'DataNotFoundError';
  }
}

export class DataNotUpdatedError extends DataBaseError {
  constructor() {
    super('Data not updated');
    this.name = 'DataNotUpdatedError';
  }
}