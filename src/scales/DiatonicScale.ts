import Scale from './Scale';

export default class DiatonicScale extends Scale {
  constructor(root: string) {
    super({
      root,
      name: 'diatonic',
      pattern: [0, 2, 4, 5, 7, 9, 11],
      modes: [
        'ionian',
        'dorian',
        'phrygian',
        'lydian',
        'mixolydian',
        'aeolian',
        'locrian'
      ]
    })
  }
}