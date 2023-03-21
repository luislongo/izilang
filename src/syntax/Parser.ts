import { TokenType } from "../grammar/TokenType";
import { isArithmeticOperaotr as isArithmeticOperator } from "../grammar/utils/tokenTypeSort";
import { Lexer } from "../lexical/Lexer";

export class Parser {
  lexer: Lexer;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
  }

  parse() {
    this.command();
    return;
  }

  command() {
    const token = this.lexer.nextToken();

    if (token.type === TokenType.Identifier) {
      this.assignment();
      this.rs_expression();
    }
    if (token.type === TokenType.EndOfFile) {
      return;
    }
  }

  rs_expression() {
    const token = this.lexer.nextToken();

    if (token.type === TokenType.OpenParenthesis) {
      this.nestedRSExpression();
      this.nestedOperation();
      this.operation();
      return;
    }

    if (
      token.type === TokenType.Number ||
      token.type === TokenType.Identifier
    ) {
      this.operation();
      return;
    }

    if (token.type === TokenType.Assign) {
      throw new Error("Unexpected token =");
    }

    throw new SyntaxError("Unexpected token");
  }

  assignment() {
    const token = this.lexer.nextToken();
    if (token.type === TokenType.Assign) {
      return;
    }

    throw new SyntaxError("Assignement expected");
  }

  operation() {
    const token = this.lexer.nextToken();
    if (isArithmeticOperator(token)) {
      this.rs_expression();
      return;
    }
    if (token.type === TokenType.CloseParenthesis) {
      throw new SyntaxError("Unexpected token )");
    }
    if (token.type === TokenType.Punctuation) {
      this.command();
      return;
    }
    if (token.type === TokenType.Undefined) {
      return;
    }

    throw new SyntaxError("Unexpected token");
  }

  nestedRSExpression() {
    const token = this.lexer.nextToken();
    if (token.type === TokenType.OpenParenthesis) {
      this.nestedRSExpression();
      this.nestedOperation();

      return;
    }
    if (
      token.type === TokenType.Number ||
      token.type === TokenType.Identifier
    ) {
      return;
    }
    if (token.type === TokenType.CloseParenthesis) {
      return;
    }

    throw new SyntaxError("Unexpected token");
  }

  nestedOperation() {
    const token = this.lexer.nextToken();

    if (isArithmeticOperator(token)) {
      this.nestedRSExpression();
      this.nestedOperation();
      return;
    }
    if (token.type === TokenType.OpenParenthesis) {
      throw new SyntaxError("Unexpected token (");
    }
    if (token.type === TokenType.CloseParenthesis) {
      return;
    }
    if (token.type === TokenType.Undefined) {
      throw new SyntaxError("Unexpected end of file");
    }

    throw new SyntaxError("Unexpected token");
  }
}
