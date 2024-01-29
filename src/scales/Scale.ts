import getNotesFromIndex from '../utils/getNotesFromIndex';
import getNotesFromRoot from '../utils/getNotesFromRoot';
import Mode from './Mode';

type ConstructorParams = {
  root: string,
  name: string,
  pattern: number[],
  modes: string[],
}

export default class Scale {
  public root: string;
  public name: string;
  public notes: string[];
  public modes: Mode[];

  constructor({
    root,
    name,
    pattern,
    modes,
  }: ConstructorParams) {
    this.root = root;
    this.name = name;
    const notes = getNotesFromRoot(root);
    const scale = notes.filter((note, i) => pattern.includes(i));
    this.notes = scale;
    this.modes = scale.map((note, i) => (
      new Mode({
        root: note,
        name: modes[i],
        notes: getNotesFromIndex(i, scale)
      })
    ));
  }

  getMode(name: string) {
    return this.modes.find(mode => mode.name === name);
  }
}
