import React from "react";

interface ISize {
  width?: number;
  height?: number;
  onClick?: () => void;
}

export function TrashIcon({ width = 36, height = 36 }: ISize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.4086 13.0457C28.7077 13.0457 28.979 13.1762 29.1934 13.3967C29.3933 13.6322 29.494 13.9247 29.4648 14.2337C29.4648 14.3357 28.6653 24.4456 28.2087 28.701C27.9228 31.3125 26.2393 32.898 23.7141 32.9415C21.7724 32.985 19.8744 33 18.0057 33C16.0217 33 14.0814 32.985 12.1981 32.9415C9.75747 32.883 8.07253 31.269 7.80118 28.701C7.33144 24.4306 6.54659 14.3357 6.532 14.2337C6.51741 13.9247 6.61661 13.6322 6.81793 13.3967C7.01633 13.1762 7.30226 13.0457 7.60278 13.0457H28.4086ZM21.0971 3C22.4232 3 23.6077 3.92549 23.9506 5.24548L24.1956 6.34047C24.394 7.23296 25.1672 7.86445 26.0571 7.86445H30.4307C31.0142 7.86445 31.5 8.34895 31.5 8.96544V9.53543C31.5 10.1369 31.0142 10.6364 30.4307 10.6364H5.57078C4.98579 10.6364 4.5 10.1369 4.5 9.53543V8.96544C4.5 8.34895 4.98579 7.86445 5.57078 7.86445H9.94435C10.8328 7.86445 11.606 7.23296 11.8058 6.34197L12.0349 5.31898C12.3908 3.92549 13.5622 3 14.9029 3H21.0971Z"
        fill="#F2F2F3"
      />
    </svg>
  );
}