import React from 'react';

// Generates a deterministic SVG QR Code pattern based on text input
export function SvgQrCode({
  value,
  size = 140,
  className = '',
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  // Deterministic 21x21 pseudo-matrix based on string hashing with standard QR finder patterns
  const matrixSize = 21;
  const matrix: boolean[][] = Array.from({ length: matrixSize }, () =>
    Array(matrixSize).fill(false)
  );

  // Set standard finder patterns in 3 corners (top-left, top-right, bottom-left)
  const setFinderPattern = (r: number, c: number) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const isBorder = i === 0 || i === 6 || j === 0 || j === 6;
        const isInnerCore = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        matrix[r + i][c + j] = isBorder || isInnerCore;
      }
    }
  };

  setFinderPattern(0, 0);
  setFinderPattern(0, 14);
  setFinderPattern(14, 0);

  // Timing lines
  for (let i = 8; i < 13; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Hash string into remaining bits
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Skip finder corners and timing tracks
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c > 12) ||
        (r > 12 && c < 8) ||
        r === 6 ||
        c === 6
      ) {
        continue;
      }
      const bit = ((hash ^ (r * 31 + c * 17)) >>> ((r + c) % 31)) & 1;
      matrix[r][c] = bit === 1;
    }
  }

  const cellSize = size / matrixSize;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`rounded bg-white p-1.5 ${className}`}
      role="img"
      aria-label={`QR Code for ${value}`}
    >
      {matrix.flatMap((row, r) =>
        row.map((active, c) =>
          active ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize + 0.2}
              height={cellSize + 0.2}
              fill="#0f172a"
            />
          ) : null
        )
      )}
    </svg>
  );
}

// Generates a visual Barcode representation for tickets
export function SvgBarcode({
  value,
  height = 40,
  className = '',
}: {
  value: string;
  height?: number;
  className?: string;
}) {
  const bars: number[] = [];
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    bars.push((code % 3) + 1, (code % 2) + 1, ((code >> 2) % 3) + 1, 1);
  }

  const totalWidth = bars.reduce((acc, w) => acc + w, 0) * 2;
  let currentX = 0;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${totalWidth} ${height}`}
        preserveAspectRatio="none"
        className="w-full"
      >
        {bars.map((width, idx) => {
          const isBlack = idx % 2 === 0;
          const rect = isBlack ? (
            <rect
              key={idx}
              x={currentX}
              y={0}
              width={width * 1.8}
              height={height}
              fill="#0f172a"
            />
          ) : null;
          currentX += width * 2;
          return rect;
        })}
      </svg>
      <span className="mt-1 font-mono text-[11px] font-medium tracking-widest text-slate-500 tabular-nums">
        {value}
      </span>
    </div>
  );
}
