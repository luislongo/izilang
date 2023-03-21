import { isDigit, isEndOfLine, isLetter } from "./utils/charSort";
import { Token } from "../grammar/Token";
import { TokenType } from "../grammar/TokenType";
import { LexicalError } from "../debug/LexicalError";

type GrammarRuleSpec = (
  token: Token,
  char: string
) => {
  token: Token;
  rule?: GrammarRule;
};

export abstract class GrammarRule {
  abstract apply: GrammarRuleSpec;
}

export class MainGrammarRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (isLetter(char)) {
      token.push(char);

      return {
        token,
        rule: new IdentifierRule(),
      };
    }
    if (isDigit(char)) {
      token.push(char);

      return {
        token,
        rule: new NumberRule(),
      };
    }
    if (isEndOfLine(char)) {
      token.push(char);
      token.type = TokenType.EndOfLine;

      return {
        token,
      };
    }

    switch (char) {
      case " ":
        token.push();
        return {
          token,
          rule: this,
        };

      case "!":
        token.push("!");

        return {
          token,
          rule: new NotRule(),
        };
      case "=":
        token.push("=");

        return {
          token,
          rule: new EqualRule(),
        };
      case "<":
        token.push("<");

        return {
          token,
          rule: new LessThanRule(),
        };
      case ">":
        token.push(">");

        return {
          token,
          rule: new GreaterThanRule(),
        };
      case "-":
        token.push("-");

        return {
          token,
          rule: new MinusRule(),
        };
      case "+":
        token.push("+");

        return {
          token,
          rule: new PlusRule(),
        };
      case "(":
        token.push("(");
        token.type = TokenType.OpenParenthesis;

        return {
          token,
        };
      case ")":
        token.push(")");
        token.type = TokenType.CloseParenthesis;

        return {
          token,
        };
      case ";":
        token.push(";");
        token.type = TokenType.Punctuation;

        return {
          token,
        };
      case "*":
        token.push("*");

        return {
          token,
          rule: new MultiplyRule(),
        };
      case "/":
        token.push("/");

        return {
          token,
          rule: new DivideRule(),
        };
      case "&":
        token.push("&");
        return {
          token,
          rule: new AmpersandRule(),
        };
      case "|":
        token.push("|");
        return {
          token,
          rule: new PipeRule(),
        };

      default:
        return {
          token,
        };
    }
  };
}

export class AmpersandRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (char === "&") {
      token.push(char);
      token.type = TokenType.And;

      return {
        token,
      };
    }

    throw new LexicalError("Unexpected character");
  };
}

export class DecimalNumberRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (isDigit(char)) {
      token.push(char);
      return {
        token,
        rule: this,
      };
    }

    if (char === ".") {
      throw new LexicalError("Unexpected character");
    }

    token.type = TokenType.Number;
    return {
      token,
    };
  };
}

export class DivideRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (char === "=") {
      token.push(char);
      token.type = TokenType.DivideBy;

      return {
        token,
      };
    }
    if (char === "/") {
      token.push(char);

      return {
        token,
        rule: new InlineCommentRule(),
      };
    }

    token.type = TokenType.Divide;
    return {
      token,
    };
  };
}

export class EqualRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (char === "=") {
      token.push(char);
      token.type = TokenType.IsEqual;

      return {
        token,
      };
    }

    token.type = TokenType.Assign;
    return {
      token,
    };
  };
}

export class GreaterThanRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (char === "=") {
      token.push(char);
      token.type = TokenType.GreaterEqual;

      return {
        token,
      };
    }

    token.type = TokenType.Greater;
    return {
      token,
    };
  };
}

const keywords: { [key: string]: string } = { true: "true", false: "false" };
export class IdentifierRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (isLetter(char) || isDigit(char)) {
      token.push(char);

      return {
        token,
        rule: this,
      };
    }

    if (keywords[token.value]) {
      token.type = TokenType.Keyword;
      return {
        token,
      };
    }

    token.type = TokenType.Identifier;
    return {
      token,
    };
  };
}

export class InlineCommentRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (!isEndOfLine(char)) {
      token.push(char);

      return {
        token,
        rule: this,
      };
    }

    token.type = TokenType.Comment;
    return {
      token,
    };
  };
}

export class LessThanRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (char === "=") {
      token.push(char);
      token.type = TokenType.LessEqual;

      return {
        token,
      };
    }

    token.type = TokenType.Less;
    return {
      token,
    };
  };
}

export class MinusRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (isDigit(char)) {
      token.push(char);

      return {
        token,
        rule: new NumberRule(),
      };
    }
    if (char === "-") {
      token.push(char);
      token.type = TokenType.Decrement;

      return {
        token,
      };
    }
    if (char === "=") {
      token.push(char);
      token.type = TokenType.MinusBy;

      return {
        token,
      };
    }

    token.type = TokenType.Minus;
    return {
      token,
    };
  };
}

export class MultiplyRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (char === "=") {
      token.push(char);
      token.type = TokenType.MultiplyBy;

      return {
        token,
      };
    }
    if (char === "*") {
      token.push(char);
      token.type = TokenType.Power;

      return {
        token,
      };
    }

    token.type = TokenType.Multiply;
    return {
      token,
    };
  };
}

export class NotRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (char === "=") {
      token.push(char);
      token.type = TokenType.IsNotEqual;

      return {
        token,
      };
    }

    token.type = TokenType.Not;
    return {
      token,
    };
  };
}

export class NumberRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (isDigit(char)) {
      token.push(char);
      return {
        token,
        rule: this,
      };
    }

    if (char === ".") {
      token.push(char);
      return {
        token,
        rule: new DecimalNumberRule(),
      };
    }

    token.type = TokenType.Number;
    return {
      token,
    };
  };
}

export class PlusRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (char === "+") {
      token.push(char);
      token.type = TokenType.Increment;

      return {
        token,
      };
    }
    if (char === "=") {
      token.push(char);
      token.type = TokenType.PlusBy;

      return {
        token,
      };
    }

    token.type = TokenType.Plus;
    return {
      token,
    };
  };
}

export class PipeRule extends GrammarRule {
  apply: GrammarRuleSpec = (token, char) => {
    if (char === "|") {
      token.push(char);
      token.type = TokenType.Or;

      return {
        token,
      };
    }

    throw new Error("Unexpected character");
  };
}
