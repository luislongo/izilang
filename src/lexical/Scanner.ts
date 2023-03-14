import fs from "fs";
import { Token } from "./Token";
import { TokenType } from "./TokenType";

export class Scanner {
  contents: string;

  constructor(filePath: string) {
    this.contents = fs.readFileSync(filePath).toString();
  }

  scan() {
    const tokens: Token[] = [];

    let current = 0;
    while (current < this.contents.length) {
      const token = new Token();

      if (isDigit(this.contents[current])) {
        token.type = TokenType.Number;
        while (isDigit(this.contents[current])) {
          token.value += this.contents[current];
          current++;
        }
        tokens.push(token);
      }
      current++;
    }
    return tokens;
  }
}

const isDigit = (char: string) => {
  return char >= "0" && char <= "9";
};
