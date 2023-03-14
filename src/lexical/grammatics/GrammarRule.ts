import { TreeNode } from "../../ds/tree/TreeNode";
import { Token } from "../Token";
import { TokenType } from "../TokenType";
import { isDigit } from "../utils/charSort";

type GrammarRuleSpec = (
  token: Token,
  char: string
) => {
  token: Token;
  rule?: GrammarRule;
};

export abstract class GrammarRule extends TreeNode<GrammarRule> {
  constructor() {
    super();
  }

  abstract apply: GrammarRuleSpec;
}

export class MainGrammarRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    console.log(token, this);
    if (isDigit(char)) {
      console.log("iSSdIGIT");
      token.value += char;
      token.type = TokenType.Number;
      console.log("isDigit", char, token.value);
      return {
        token,
        rule: new NumberRule(),
      };
    }
    return {
      token,
    };
  };
}

export class NumberRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (isDigit(char)) {
      token.value += char;
      return {
        token,
        rule: this,
      };
    }
    if (char === ".") {
      token.value += char;
      return {
        token,
        rule: new DecimalNumberRule(),
      };
    }

    return {
      token,
    };
  };
}

export class DecimalNumberRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (isDigit(char)) {
      token.value += char;
      return {
        token,
        rule: this,
      };
    }
    return {
      token,
    };
  };
}
