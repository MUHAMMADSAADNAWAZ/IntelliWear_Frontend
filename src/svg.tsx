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
  export const ThreeVerticalDots = ({ onClick }: any) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        className="select-none cursor-pointer"
      >
        <path
          d="M11.9922 12H12.0012"
          stroke="#141B34"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9844 18H11.9934"
          stroke="#141B34"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6H12.009"
          stroke="#141B34"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  export const Deleteicon = ({ onClick }: any) => {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        className="cursor-default"
      >
        <path
          d="M14.625 4.125L14.1602 11.6438C14.0414 13.5648 13.9821 14.5253 13.5006 15.2159C13.2625 15.5573 12.956 15.8455 12.6005 16.062C11.8816 16.5 10.9192 16.5 8.99452 16.5C7.06734 16.5 6.10372 16.5 5.38429 16.0612C5.0286 15.8443 4.722 15.5556 4.48401 15.2136C4.00266 14.5219 3.94459 13.5601 3.82846 11.6364L3.375 4.125"
          stroke="#E42727"
          strokeWidth="1.125"
          strokeLinecap="round"
        />
        <path
          d="M2.25 4.125H15.75M12.0418 4.125L11.5298 3.0688C11.1897 2.3672 11.0196 2.01639 10.7263 1.79761C10.6612 1.74908 10.5923 1.7059 10.5203 1.66852C10.1954 1.5 9.80558 1.5 9.02588 1.5C8.2266 1.5 7.827 1.5 7.49676 1.67559C7.42357 1.71451 7.35373 1.75943 7.28797 1.80988C6.99123 2.03753 6.82547 2.40116 6.49396 3.12844L6.03969 4.125"
          stroke="#E42727"
          strokeWidth="1.125"
          strokeLinecap="round"
        />
        <path
          d="M7.125 12.375V7.875"
          stroke="#E42727"
          strokeWidth="1.125"
          strokeLinecap="round"
        />
        <path
          d="M10.875 12.375V7.875"
          stroke="#E42727"
          strokeWidth="1.125"
          strokeLinecap="round"
        />
      </svg>
    );
  };
export const FileUpload = () =>{
  return(
    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.83337 16V19.3923C5.83337 23.7189 5.83337 25.8823 7.0148 27.3476C7.25348 27.6436 7.52312 27.9132 7.81915 28.1519C9.28445 29.3333 11.4478 29.3333 15.7744 29.3333C16.7152 29.3333 17.1855 29.3333 17.6163 29.1813C17.7059 29.1497 17.7936 29.1133 17.8794 29.0724C18.2915 28.8752 18.624 28.5427 19.2892 27.8775L25.6046 21.5621C26.3754 20.7913 26.7607 20.406 26.9638 19.9159C27.1667 19.4259 27.1667 18.8808 27.1667 17.7908V13.3333C27.1667 8.305 27.1667 5.79086 25.6046 4.22875C24.0426 2.66666 21.5283 2.66666 16.5 2.66666M17.8334 28.6667V28C17.8334 24.2288 17.8334 22.3432 19.005 21.1716C20.1766 20 22.0622 20 25.8334 20H26.5" stroke="#283577" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.8334 6.66666C13.0469 5.85754 10.9537 2.66666 9.83337 2.66666C8.71301 2.66666 6.61983 5.85754 5.83337 6.66666M9.83337 3.99999V13.3333" stroke="#283577" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )

}        