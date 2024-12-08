export const UserIcon = ({ color }: { color: string }) => {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.93318 11.6112C3.8721 12.243 1.09002 13.5331 2.7845 15.1475C3.61223 15.936 4.53412 16.5 5.69315 16.5H12.3068C13.4659 16.5 14.3878 15.936 15.2155 15.1475C16.91 13.5331 14.1279 12.243 13.0668 11.6112C10.5786 10.1296 7.42139 10.1296 4.93318 11.6112Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.375 4.875C12.375 6.73896 10.864 8.25 9 8.25C7.13604 8.25 5.625 6.73896 5.625 4.875C5.625 3.01104 7.13604 1.5 9 1.5C10.864 1.5 12.375 3.01104 12.375 4.875Z"
          stroke={color}
        />
      </svg>
    );
  };
  export const LogoutIcon = () => {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.26748 4.125C3.4487 5.33429 2.25 7.40215 2.25 9.75C2.25 13.478 5.27208 16.5 9 16.5C12.728 16.5 15.75 13.478 15.75 9.75C15.75 7.40215 14.5513 5.33429 12.7325 4.125"
          stroke="#E42727"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 1.5V7.5"
          stroke="#E42727"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
    