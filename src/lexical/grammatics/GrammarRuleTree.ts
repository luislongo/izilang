import { Tree } from "../../ds/tree/Tree";
import { Token } from "../Token";
import { GrammarRule } from "./GrammarRule";

export class GrammarRuleTree extends Tree<GrammarRule> {
  constructor() {
    super();
  }

  findNextToken = (content: string) => {
    let token = new Token();
    let rule = this.root;
    let pos = 0;

    console.log(token);

    while (rule && pos < content.length) {
      const { token: newToken, rule: newRule } = rule.apply(
        token,
        content[pos]
      );

      console.log(newToken, rule);
      rule = newRule;
      token = newToken;

      if (newRule) {
        pos++;
      }
    }

    return token;
  };
}
