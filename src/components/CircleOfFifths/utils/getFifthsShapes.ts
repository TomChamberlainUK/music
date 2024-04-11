import { Vector2D } from '@/maths';

type Fifth = {
  name: string;
  path: string;
  textCoordinates: Vector2D;
  isHighlighted: boolean;
};

type Props = {
  allFifths: string[];
  highlightOffset: number;
  sectionWidth: number;
  size: number;
  strokeWidth: number;
};

export default function getFifthsShapes({
  allFifths,
  highlightOffset,
  sectionWidth,
  size,
  strokeWidth,
}: Props) {
  const totalRadians = Math.PI * 2;
  const totalSegments = 12;
  const center = new Vector2D(size / 2, size / 2);

  const fifths: Fifth[] = [];

  const radii = [
    (size / 2),
    (size / 2) - sectionWidth,
    (size / 2) - (sectionWidth * 2),
  ];

  radii.forEach((radius, i) => {
    const outerRadius = radius - (strokeWidth / 2);
    const centerRadius = radius - (sectionWidth / 2) - (strokeWidth / 2);
    const innerRadius = radius - sectionWidth - (strokeWidth / 2);
    const angleModifier = 0.5 + (totalSegments / 4);

    for (let j = 0; j < totalSegments; j++) {
      const startAngle = (j - angleModifier) / totalSegments * totalRadians;
      const centerAngle = (j + 0.5 - angleModifier) / totalSegments * totalRadians;
      const endAngle = (j + 1 - angleModifier) / totalSegments * totalRadians;
      const innerStart = new Vector2D(
        Math.cos(startAngle) * innerRadius + center.x,
        Math.sin(startAngle) * innerRadius + center.y
      );
      const outerStart = new Vector2D(
        Math.cos(startAngle) * outerRadius + center.x,
        Math.sin(startAngle) * outerRadius + center.y
      );
      const centerMiddle = new Vector2D(
        Math.cos(centerAngle) * centerRadius + center.x,
        Math.sin(centerAngle) * centerRadius + center.y
      );
      const innerEnd = new Vector2D(
        Math.cos(endAngle) * innerRadius + center.x,
        Math.sin(endAngle) * innerRadius + center.y
      );
      const outerEnd = new Vector2D(
        Math.cos(endAngle) * outerRadius + center.x,
        Math.sin(endAngle) * outerRadius + center.y
      );
      const path = [
        `M ${innerStart.x} ${innerStart.y}`,
        `L ${outerStart.x} ${outerStart.y}`,
        `A ${radius} ${radius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
        'Z'
      ].join(' ');
      const isMajor = i === 0;
      const isMinor = i === 1;
      const isDiminished = i === 2;
      const isStartingPoint = j === (0 + highlightOffset) % totalSegments; // Center between fourth and fifth
      const isFourthFromStartingPoint = j === (1 + highlightOffset) % totalSegments; // anticlockwise around the circle
      const isFifthFromStartingPoint = j === (totalSegments - 1 + highlightOffset) % totalSegments; // clockwise around the circle
      const isHighlighted = (
        (isMajor && (isStartingPoint || isFourthFromStartingPoint || isFifthFromStartingPoint)) ||
        (isMinor && (isStartingPoint || isFourthFromStartingPoint || isFifthFromStartingPoint)) ||
        (isDiminished && isStartingPoint)
      );
      fifths.push({
        name: allFifths[(i * totalSegments) + j],
        textCoordinates: centerMiddle,
        path,
        isHighlighted
      });
    }
  });
  return fifths;
}