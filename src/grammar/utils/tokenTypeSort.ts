import { Token } from "../Token";
import { TokenType } from "../TokenType";

export const isArithmeticOperaotr = (token: Token) => {
  return (
    token.type === TokenType.Plus ||
    token.type === TokenType.Minus ||
    token.type === TokenType.Multiply ||
    token.type === TokenType.Divide ||
    token.type === TokenType.Power
  );
};
