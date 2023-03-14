import { TokenType } from "./TokenType";

export class Token {
  type: TokenType = TokenType.Undefined;
  value: string = "";

  constructor() {}
}
