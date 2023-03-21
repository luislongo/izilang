export class LexicalError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(message: string) {
    this.name = "LexicalError";
    this.message = message;
  }
}
