class ErrorResponse extends Error {
  status: number;
  code: number | undefined;

  constructor(message: string, status: number, code?: number) {
    super(message);
    this.status = status;
    this.code = code || undefined;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;
