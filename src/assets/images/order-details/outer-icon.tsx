interface Types {
  width?: number;
  height?: number;
}

export function OuterIcon({ width = 107, height = 100 }: Types) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 107 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M103.944 38.453C108.019 45.5983 108.019 54.4017 103.944 61.547L88.5996 88.453C84.5247 95.5983 76.994 100 68.8442 100H38.1558C30.006 100 22.4753 95.5983 18.4004 88.453L3.05617 61.547C-1.01872 54.4017 -1.01872 45.5983 3.05617 38.453L18.4004 11.547C22.4753 4.40169 30.006 0 38.1558 0L68.8442 0C76.994 0 84.5247 4.40169 88.5996 11.547L103.944 38.453Z"
        fill="url(#paint0_radial_18254_892)"
        fillOpacity="0.25"
      />
      <defs>
        <radialGradient
          id="paint0_radial_18254_892"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(53.5 50) rotate(-43.0632) scale(73.2274 55.0025)"
        >
          <stop stopColor="#801AB3" stopOpacity="0" />
          <stop offset="1" stopColor="#4C4CFF" />
        </radialGradient>
      </defs>
    </svg>
  );
}
