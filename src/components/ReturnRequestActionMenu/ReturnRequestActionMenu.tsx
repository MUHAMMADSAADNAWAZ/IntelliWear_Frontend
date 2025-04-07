import { useState } from "react";

import { Menu, MenuItem } from "@mui/material";

import { ThreeVerticalDots } from "@svg";
import { CheckCircle, XCircle } from "lucide-react";

interface ActionsMenuProps {
  setStatus: (status: string) => void;
}

const ReturnRequestActionsMenu = ({
  setStatus,
}: ActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-center items-center p-3.5 ">
      <ThreeVerticalDots
        className="cursor-pointer "
        onClick={handleMenuClick}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "6px 6px 54px 0px #00000014",
          },
        }}
      >
    
        <MenuItem
          sx={{
            color: "#22c55e",
            fontWeight: "400",
            fontSize: "12px",
            display: "flex",
            gap: "5px",
          }}
          onClick={() => {
            handleClose();
            setStatus("Approved");
          }}
        >
          {/* <Deleteicon /> */}
          <CheckCircle size={16} />
          Approved
        </MenuItem>

        <MenuItem
          sx={{
            color: "#ef4444",
            fontWeight: "400",
            fontSize: "12px",
            display: "flex",
            gap: "5px",
          }}
          onClick={() => {
            handleClose();
            setStatus("Rejected");
          }}
        >
            <XCircle size={16} />
          Rejected
        </MenuItem>

      </Menu>
    </div>
  );
};

export default ReturnRequestActionsMenu;
