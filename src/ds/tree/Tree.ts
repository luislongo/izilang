import { TreeNode } from "./TreeNode";

export class Tree<T extends TreeNode<T>> {
  root: T | undefined = undefined;

  constructor() {}
}
