import { GrammarRule } from "./IziLexicalRule";
import { Token } from "../grammar/Token";
import { TokenType } from "../grammar/TokenType";

export class Lexer {
  rule: GrammarRule;
  contents: string;
  current = 0;
  private _token: Token | undefined;
  tokens: Token[] = [];

  constructor(rule: GrammarRule, contents: string) {
    this.rule = rule;
    this.contents = contents + " ";
  }

  nextToken(): Token {
    if (this.current >= this.contents.length) {
      const token = new Token();
      token.type = TokenType.EndOfFile;
      return token;
    }

    const start = this.current;

    let token = new Token();
    let rule: GrammarRule | undefined = this.rule;

    while (rule && this.current < this.contents.length) {
      const { token: newToken, rule: newRule } = rule.apply(
        token,
        this.contents[this.current]
      );

      rule = newRule;
      token = newToken;

      this.current++;
    }

    this.current = start + token.length;

    this._token = token;
    this.tokens.push(token);

    console.log(this.tokens);
    return token;
  }

  get token(): Token {
    if (!this._token) {
      throw new Error("No token available");
    }

    return this._token;
  }
}
