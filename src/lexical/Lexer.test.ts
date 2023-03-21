import { LexicalError } from "../debug/LexicalError";
import { TokenType } from "../grammar/TokenType";
import { MainGrammarRule } from "./IziLexicalRule";
import { Lexer } from "./Lexer";

describe("Lexer", () => {
  test("Returns undefined token in empty file", () => {
    const lexer = new Lexer(new MainGrammarRule(), "");
    const token = lexer.nextToken();

    expect(token.type).toBe(TokenType.Undefined);
  });

  test("Returns undefined token in file with only spaces", () => {
    const lexer = new Lexer(new MainGrammarRule(), " ");
    const token = lexer.nextToken();

    expect(token.type).toBe(TokenType.Undefined);
  });

  test("Parses with spaces", () => {
    const lexer = new Lexer(new MainGrammarRule(), "1 + 3");

    let token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("1");

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.Plus);
    expect(token.value).toBe("+");

    token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("3");
  });

  test("Parses without spaces", () => {
    const lexer = new Lexer(new MainGrammarRule(), "1+3");

    let token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("1");

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.Plus);
    expect(token.value).toBe("+");

    token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("3");
  });

  test("Parses with decimal numbers", () => {
    const lexer = new Lexer(new MainGrammarRule(), "1.2+3.4");

    let token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("1.2");

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.Plus);
    expect(token.value).toBe("+");

    token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("3.4");
  });

  test("Throws error on two decimal separators", () => {
    const lexer = new Lexer(new MainGrammarRule(), "1.2.3");

    expect(() => lexer.nextToken()).toThrow(LexicalError);
  });

  test("Parses with negative numbers", () => {
    const lexer = new Lexer(new MainGrammarRule(), "-1+3");

    let token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("-1");

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.Plus);
    expect(token.value).toBe("+");

    token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("3");
  });

  test("Parses nested parenthesis", () => {
    const lexer = new Lexer(new MainGrammarRule(), "1 + (2* (3 + 4 )) ");

    let token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("1");

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.Plus);

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.OpenParenthesis);

    token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("2");

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.Multiply);

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.OpenParenthesis);

    token = lexer.nextToken();
    expect(token.type).toBe("Number");

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.Plus);

    token = lexer.nextToken();
    expect(token.type).toBe("Number");
    expect(token.value).toBe("4");

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.CloseParenthesis);

    token = lexer.nextToken();
    expect(token.type).toBe(TokenType.CloseParenthesis);
  });
});
