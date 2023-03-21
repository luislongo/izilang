export class SyntaxError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(message: string) {
    this.name = "SyntaxError";
    this.message = message;
  }
}
