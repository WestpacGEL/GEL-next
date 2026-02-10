import { Node } from '@react-types/shared';

export function filterNodes<T>(
  nodes: Iterable<Node<T>>,
  filterText: string,
  contains: (value: string, search: string) => boolean,
): Iterable<Node<T>> {
  if (!filterText) return nodes;

  const arr = Array.from(nodes);

  return arr.flatMap((node: Node<T>) => {
    if (node.type !== 'section') {
      return contains(node.textValue ?? '', filterText) ? [node] : [];
    }

    // See https://github.com/adobe/react-spectrum/discussions/4348 for why this deprecation is ignored
    // eslint-disable-next-line sonarjs/deprecation
    const childNodesArr = Array.from(node.childNodes || []);
    const matchedChildren: Node<T>[] = childNodesArr.filter((child: Node<T>) =>
      contains(child.textValue ?? '', filterText),
    );

    if (matchedChildren.length === 0) return [];

    const sectionWithMatches = { ...node, childNodes: matchedChildren } as Node<T>;
    return [sectionWithMatches];
  });
}
