import { parse, GedcomNode, d3ize } from 'parse-gedcom';
import { observable, action } from 'mobx';

export type Sex = 'M' | 'F' | 'U';

export interface Person {
  name?: string;
  sex?: Sex;
  parents?: Family;
}

export interface Family {
  husband?: Person;
  wife?: Person;
  children: Person[];
}

function firstValue(node: GedcomNode, tag: string): string | undefined {
  const tagNode = node.tree.find(n => n.tag === tag);
  return tagNode ? tagNode.data : undefined;
}

function convertSex(val?: string): Sex | undefined {
  if (!val) return undefined;
  switch (val) {
    case 'M': case 'm': return 'M';
    case 'F': case 'f': return 'F';
    default: return 'U';
  }
}

export class Tree {
 public people: Person[] = [];
  public families: Family[] = [];

  @action
  public load(text: string): void {
    const raw = parse(text);
    const rawFamilyById: { [id: string]: { husband?: string, wife?: string, children: string[] } } = {}
    const rawFamilies = raw.filter(n => n.tag === 'FAM').map(node =>
      rawFamilyById[node.pointer] = {
        husband: firstValue(node, "HUSB"),
        wife: firstValue(node, "WIFE"),
        children: node.tree.filter(n => n.tag === 'CHIL').map(n => n.data)
      })
    const personById: { [id: string]: Person } = {};
    this.people = raw.filter(n => n.tag === 'INDI').map(node =>
      personById[node.pointer] = {
        name: firstValue(node, "NAME"),
        sex: convertSex(firstValue(node, "SEX"))
      });
    this.families = rawFamilies.map(fam => {
      const family = {
        husband: fam.husband ? personById[fam.husband] : undefined,
        wife: fam.wife ? personById[fam.wife] : undefined,
        children: fam.children.map(id => personById[id])
      };
      family.children.forEach(child => child.parents = family);
      return family;
    });
    console.log(this.people[0]);
  }
}

export const tree = new Tree();
