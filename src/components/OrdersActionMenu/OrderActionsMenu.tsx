import { useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { ThreeVerticalDots } from "@svg";

interface OrderActionsMenuProps {
    onViewDetails: () => void;
    onChangeStatus: (newStatus: string) => void;
    status: string;
}

const OrdersActionMenu = ({ onViewDetails, onChangeStatus , status }: OrderActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNextStatus = () => {
    switch (status) {
      case "in_process":
        return "shipped";
      case "shipped":
        return "delivered";
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();


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
            color: "#1F1F1F",
            fontWeight: "400",
            fontSize: "12px",
            display: "flex",
            gap: "5px",
          }}
          onClick={() => {
            handleClose();
            onViewDetails();
          }}
        >
          <VisibilityOutlinedIcon style={{ fontSize: 15 }} />
          View Details
        </MenuItem>

         {nextStatus && status !== "cancelled" && status !== "pending" && (
          <MenuItem
            sx={{
              color: "#1F1F1F",
              fontWeight: "400",
              fontSize: "12px",
              display: "flex",
              gap: "5px",
            }}
            onClick={() => {
              handleClose();
              onChangeStatus(nextStatus);
            }}
          >
            <SwapHorizOutlinedIcon style={{ fontSize: 15 }} />
            {nextStatus}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default OrdersActionMenu;

