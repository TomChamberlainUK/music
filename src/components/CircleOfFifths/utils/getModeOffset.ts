/**
   * Offsets highlighted notes depending on the mode to correctly display diatonic chords regardless of mode.
   * @param mode - The current mode.
   */
export default function getModeOffset(mode: string) {
  // Offsets per ring of circle of fifths to compensate for differing starting point
  const majorOffset = 0;
  const minorOffset = 9;
  const diminishedOffset = 7;
  // Offsets for moving around the circle
  const fourthOffset = 1; // Moves anticlockwise around the circle
  const fifthOffset = 11; // Moves clockwise around the circle
  switch (mode) {
    // Major modes
    case 'ionian':
    case 'major':
      return majorOffset;
    case 'lydian':
      return majorOffset + fourthOffset;
    case 'mixolydian':
      return majorOffset + fifthOffset;
    // Minor modes
    case 'aeolian':
    case 'minor':
      return minorOffset;
    case 'dorian':
      return minorOffset + fourthOffset;
    case 'phrygian':
      return minorOffset + fifthOffset;
    // Diminished mode
    case 'locrian':
      return diminishedOffset;
    default:
      return 0;
  }
}
