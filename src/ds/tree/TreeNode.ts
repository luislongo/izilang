export class TreeNode<T extends TreeNode<T>> {
  parent: T | undefined;
  children: T[] = [];

  constructor() {}

  setParent(parent: T) {
    this.parent = parent;
  }
}
