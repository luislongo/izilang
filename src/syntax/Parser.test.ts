import { MainGrammarRule } from "../lexical/IziLexicalRule";
import { Lexer } from "../lexical/Lexer";
import { Parser } from "./Parser";

describe("Parser", () => {
  test("Should throw an error when the file is empty", () => {
    const lexer = new Lexer(new MainGrammarRule(), "");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).toThrow(SyntaxError);
  });

  test("Should throw an error when the file contains only spaces", () => {
    const lexer = new Lexer(new MainGrammarRule(), " ");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).toThrow(SyntaxError);
  });

  test("Should parse alternating operations", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = 1+ 2 - 3;");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).not.toThrow(SyntaxError);
  });

  test("Throw error on sequential operations", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = 1+ + 2;");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).toThrow(SyntaxError);
  });

  test("Throw error on sequential numbers", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = 1 2;");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).toThrow(SyntaxError);
  });

  test("Handles decimal numbers", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = 1.2 + 2.3;");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).not.toThrow(SyntaxError);
  });

  test("Handles negative numbers", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = -1 - -2;");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).not.toThrow(SyntaxError);
  });

  test("Handles parenthesis", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = 1 + ( 2 * 3 );");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).not.toThrow(SyntaxError);
  });

  test("Handles nested parenthesis", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = 1 + (2 * (3 + 4));");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).not.toThrow(SyntaxError);
  });

  test("Handles complex nesting", () => {
    const lexer = new Lexer(
      new MainGrammarRule(),
      "cat = 1 + (2 * (3 + 4)) - 5 * (6 + 7);"
    );
    const parser = new Parser(lexer);

    expect(() => parser.parse()).not.toThrow(SyntaxError);
  });

  test("Throws error on missing parenthesis ", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = (1 + 2 * 3;");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).toThrow(SyntaxError);
  });

  test("Throws error on missing parenthesis ", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = 1 + 2 * 3);");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).toThrow(SyntaxError);
  });

  test("Throws error on missing parenthesis ", () => {
    const lexer = new Lexer(new MainGrammarRule(), "cat = 1 + 2 * (3;");
    const parser = new Parser(lexer);

    expect(() => parser.parse()).toThrow(SyntaxError);
  });

  test("Handles different operators, parenthesis and numbers", () => {
    const lexer = new Lexer(
      new MainGrammarRule(),
      "cat = 1.2 + -2.3 ** (311.2 - 4) / (5 ** 6);"
    );
    const parser = new Parser(lexer);

    expect(() => parser.parse()).not.toThrow(SyntaxError);
    console.log("token", lexer.tokens);
  });

  test("Handles different lines", () => {
    const lexer = new Lexer(
      new MainGrammarRule(),
      "cat = 1.2 + 2.3;  dog = 1 + 2;"
    );
    const parser = new Parser(lexer);

    expect(() => parser.parse()).not.toThrow(SyntaxError);
    console.log("token", lexer.tokens);
  });
});
