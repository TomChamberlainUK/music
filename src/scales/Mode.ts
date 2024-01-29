export default class Mode {
  public root: string;
  public name: string;
  public notes: string[];

  constructor({
    root,
    name,
    notes,
  }: {
    root: string,
    name: string,
    notes: string[],
  }) {
    this.root = root;
    this.name = name;
    this.notes = notes;
  }
}
