import { DiatonicScale, PentatonicScale } from '../scales';

type Params = {
  type: string;
  root: string;
}

export default function getScale({ type, root }: Params) {
  switch (type) {
    case 'diatonic': {
      return new DiatonicScale(root);
    }
    case 'pentatonic': {
      return new PentatonicScale(root);
    }
    default: {
      throw new Error(`Scale type not recognised: ${type}`);
    }
  }
}