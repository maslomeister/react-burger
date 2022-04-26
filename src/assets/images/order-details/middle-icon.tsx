interface Types {
  width?: number;
  height?: number;
}

export function MiddleIcon({ width = 98, height = 102 }: Types) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 98 102"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.36637 37.3873C-1.45546 45.5044 -1.45545 56.4957 4.36637 64.6127L24.3336 92.4518C30.1554 100.569 40.4748 103.965 49.8947 100.865L82.2023 90.2313C91.6223 87.1309 98 78.2387 98 68.2055V33.7945C98 23.7612 91.6222 14.8691 82.2023 11.7687L49.8947 1.13508C40.4748 -1.96536 30.1554 1.43114 24.3336 9.54819L4.36637 37.3873Z"
        fill="url(#paint0_radial_18254_891)"
        fillOpacity="0.25"
      />
      <defs>
        <radialGradient
          id="paint0_radial_18254_891"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(49 51) rotate(-46.1458) scale(70.7248 53.2019)"
        >
          <stop stopColor="#801AB3" stopOpacity="0" />
          <stop offset="1" stopColor="#4C4CFF" />
        </radialGradient>
      </defs>
    </svg>
  );
}
