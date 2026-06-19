'use client';
import React from 'react';

/**
 * Renders an upside-down U glyph by taking the actual U letterform
 * and flipping it vertically within an inline SVG so that the open
 * end points downward and the arch faces down, while top/bottom
 * baselines match the surrounding text at the given fontSize.
 *
 * For small letters (isSmall=true) the glyph cap-height matches
 * x-height. For capital letters (isSmall=false) it matches cap-height.
 */
interface Props {
  fontSize?: number;   // px, matches surrounding letter size
  color?: string;
  isSmall?: boolean;   // true = match lowercase metrics
  style?: React.CSSProperties;
}

export default function UpsideDownU({
  fontSize = 22,
  color = 'currentColor',
  isSmall = false,
  style,
}: Props) {
  // Glyph metrics relative to fontSize
  // We draw the U in its natural orientation inside a viewBox,
  // then apply scaleY(-1) to flip it. The viewBox height matches
  // the desired glyph height (cap-height or x-height).
  const capRatio = isSmall ? 0.72 : 1.0;   // x-height / cap-height ratio approx
  const glyphH = fontSize * capRatio;
  const glyphW = glyphH * 0.68;             // typical U aspect ratio
  const strokeW = glyphH * 0.095;

  // U path: two vertical lines joined by a semicircle at the bottom
  const pad = strokeW / 2;
  const innerW = glyphW - strokeW;
  const archR = (innerW) / 2;
  const archCX = glyphW / 2;
  const archCY = glyphH - pad - archR;
  // left stem top, right stem top
  const stemTop = pad;
  const stemBotL = archCY;
  const stemBotR = archCY;

  // SVG inline, vertically flipped via transform
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={glyphW}
      height={glyphH}
      viewBox={`0 0 ${glyphW} ${glyphH}`}
      style={{
        display: 'inline-block',
        verticalAlign: isSmall ? 'baseline' : 'baseline',
        overflow: 'visible',
        ...style,
      }}
      aria-label="⊓ (upside-down U)"
    >
      {/* Flip vertically around vertical center */}
      <g transform={`scale(1,-1) translate(0,${-glyphH})`}>
        {/* Left stem */}
        <line
          x1={pad + strokeW / 2}
          y1={stemTop}
          x2={pad + strokeW / 2}
          y2={stemBotL}
          stroke={color}
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
        {/* Right stem */}
        <line
          x1={glyphW - pad - strokeW / 2}
          y1={stemTop}
          x2={glyphW - pad - strokeW / 2}
          y2={stemBotR}
          stroke={color}
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
        {/* Arch (semicircle) at bottom of natural U = top of flipped U */}
        <path
          d={`M ${pad + strokeW / 2} ${archCY} A ${archR} ${archR} 0 0 0 ${glyphW - pad - strokeW / 2} ${archCY}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
