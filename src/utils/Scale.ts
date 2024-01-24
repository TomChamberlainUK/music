import getScaleNotes from './getScaleNotes';

type ConstructorParams = {
  type: string;
  root: string;
}

export default class Scale {
  type: string;
  notes: string[];
  modes: string[];

  constructor({
    type,
    root,
  }: ConstructorParams) {
    this.type = type;
    const { notes, modes } = getScaleNotes({ type, root });
    this.notes = notes;
    this.modes = modes;
  }
}
