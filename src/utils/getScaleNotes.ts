import getChromaticScale from './getChromaticScale';
import getDiatonicScale from './getDiatonicScale';
import getPentatonicScale from './getPentatonicScale';

type Params = {
  type: string;
  root: string;
}

export default function getScaleNotes({ type, root }: Params) {
  switch (type) {
    case 'chromatic': {
      return getChromaticScale(root);
    }
    case 'diatonic': {
      return getDiatonicScale(root);
    }
    case 'pentatonic': {
      return getPentatonicScale(root);
    }
    default: {
      throw new Error(`Scale type not recognised: ${type}`);
    }
  }
}