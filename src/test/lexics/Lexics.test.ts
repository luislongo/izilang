import { MainGrammarRule } from "../../lexical/grammatics/GrammarRule";
import { GrammarRuleTree } from "../../lexical/grammatics/GrammarRuleTree";
import { TokenType } from "../../lexical/TokenType";

describe("Lexics analysis", () => {
  const tree = new GrammarRuleTree();
  tree.root = new MainGrammarRule();

  test("Should parse integer numbers", () => {
    const token = tree.findNextToken("02342");

    expect(token.type).toBe(TokenType.Number);
    expect(token.value).toBe("02342");
  });

  test("Should parse decimal numbers", () => {
    const token = tree.findNextToken("02342.234");

    expect(token.type).toBe(TokenType.Number);
    expect(token.value).toBe("02342.234");
  });
});
