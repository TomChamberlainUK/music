import getScaleNotes from './getScaleNotes';

type ConstructorParams = {
  type: string;
  root: string;
}

export default class Scale {
  type: string;
  notes: string[];

  constructor({
    type,
    root
  }: ConstructorParams) {
    this.type = type;
    this.notes = getScaleNotes({ type, root });
  }
}
