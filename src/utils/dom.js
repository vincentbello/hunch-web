// @flow
/**
 * Determine if a given node is or descends from a node with name in a given array
 */
export function isDescendantOfElementNames(node, elementNames) {
  let currentNode = node;

  while (currentNode !== null) {
    if (elementNames.includes(currentNode.nodeName.toLowerCase())) return true;
    currentNode = currentNode.parentNode;
  }

  return false;
}
