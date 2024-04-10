import { Vector2D } from '@/maths';

type Fifth = {
  name: string;
  path: string;
  textCoordinates: Vector2D;
  isHighlighted: boolean;
};

type Props = {
  allFifths: string[];
  center: Vector2D;
  indexOffset: number;
  radii: number[];
  strokeWidth: number;
  totalSegments: number;
};

export default function getFifthsShapes({
  allFifths,
  center,
  indexOffset,
  radii,
  strokeWidth,
  totalSegments
}: Props) {
  const totalRadians = Math.PI * 2;
  const fifths: Fifth[] = [];

  radii.forEach((radius, i) => {
    const outerRadius = radius - strokeWidth / 2;
    const centerRadius = radius - 8 - strokeWidth / 2;
    const innerRadius = radius - 16 - strokeWidth / 2;
    const angleModifier = 0.5 + (totalSegments / 4);

    for (let j = 0; j < 12; j++) {
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
      const isHighlighted = (
        (isMajor && (j === (0 + indexOffset) % 12 || j === (1 + indexOffset) % 12 || j === (11 + indexOffset) % 12)) ||
        (isMinor && (j === (0 + indexOffset) % 12 || j === (1 + indexOffset) % 12 || j === (11 + indexOffset) % 12)) ||
        (isDiminished && j === (0 + indexOffset) % 12)
      );
      fifths.push({
        name: allFifths[(i * 12) + j],
        textCoordinates: centerMiddle,
        path,
        isHighlighted
      });
    }
  });
  return fifths;
}