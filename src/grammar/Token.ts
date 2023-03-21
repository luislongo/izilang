import { TokenType } from "./TokenType";

export class Token {
  private _type: TokenType = TokenType.Undefined;
  private _value: string = "";
  private _length = 0;

  constructor() {}

  get value() {
    return this._value;
  }

  get length() {
    return this._length;
  }

  get type() {
    return this._type;
  }

  set type(type: TokenType) {
    if (this._type != TokenType.Undefined) {
      throw new Error("Token type can only be set once");
    }

    this._type = type;
  }

  push(char?: string) {
    this._value += char ? char : "";
    this._length += 1;
  }
}
