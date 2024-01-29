import Scale from './Scale';

export default class PentatonicScale extends Scale {
  constructor(root: string) {
    super({
      root,
      name: 'pentatonic',
      pattern: [0, 2, 4, 7, 9],
      modes: [
        'major',
        'blues major',
        'suspended',
        'blues minor',
        'minor'
      ]
    })
  }
}