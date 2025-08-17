import React from 'react';
import Svg, { Polygon, Text as SvgText } from 'react-native-svg';
import useCharacterStore from '../store/characterStore';
import { useTheme } from 'styled-components/native';

const StatHexagon = () => {
  const { stats } = useCharacterStore();
  const theme = useTheme();
  const size = 250;
  const center = size / 2;
  const points = [
    [center, 0],
    [size, size * 0.25],
    [size, size * 0.75],
    [center, size],
    [0, size * 0.75],
    [0, size * 0.25],
  ]
    .map((p) => p.join(','))
    .join(' ');

  const statPoints = [
    { name: 'STR', value: stats.strength, angle: -90 },
    { name: 'VIT', value: stats.vitality, angle: -30 },
    { name: 'LUK', value: stats.luck, angle: 30 },
    { name: 'INT', value: stats.intelligence, angle: 90 },
    { name: 'DEX', value: stats.dexterity, angle: 150 },
    { name: 'AGI', value: stats.agility, angle: 210 },
  ];

  const getStatPoint = (value, angle) => {
    const radian = (angle * Math.PI) / 180;
    const x = center + (value / 20) * center * Math.cos(radian);
    const y = center + (value / 20) * center * Math.sin(radian);
    return [x, y];
  };

  const statPolygonPoints = statPoints
    .map((stat) => getStatPoint(stat.value, stat.angle).join(','))
    .join(' ');

  return (
    <Svg height={size} width={size}>
      <Polygon
        points={points}
        fill="none"
        stroke={theme.colors.primary}
        strokeWidth="2"
      />
      <Polygon
        points={statPolygonPoints}
        fill={theme.colors.accent}
        fillOpacity="0.5"
      />
      {statPoints.map((stat, i) => {
        const [x, y] = getStatPoint(26, stat.angle);
        return (
          <SvgText
            key={i}
            x={x}
            y={y}
            fill={theme.colors.text}
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle">
            {stat.name} {stat.value}
          </SvgText>
        );
      })}
    </Svg>
  );
};

export default StatHexagon;
