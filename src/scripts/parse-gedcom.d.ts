declare module 'parse-gedcom' {

 interface GedcomNode {
    pointer: string;
    tag: string;
    data: string;
    tree: GedcomNode[];
  }

  interface D3Tree {
    nodes: GedcomNode[]; // INDI nodes
    links: {source: number, target: number}[]; // indices into nodes array
  }

  export function parse(text: string): GedcomNode[];
  export function d3ize(tree: GedcomNode[]): D3Tree;
}
