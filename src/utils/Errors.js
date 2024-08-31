export class AppError extends Error {
  constructor(path) {
    super();
    this.path = path;
  }
}

export class UnauthorizedError extends AppError {}
