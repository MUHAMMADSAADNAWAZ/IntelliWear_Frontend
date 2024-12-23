import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { ThreeVerticalDots } from "@svg";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';

interface OrderActionsMenuProps {
    onViewDetails: () => void;
    onChangeStatus: (newStatus: string) => void;
}

const OrdersActionMenu = ({ onViewDetails, onChangeStatus }: OrderActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const statuses = ["Pending", "In Progress", "Completed", "Canceled", "Refund"];

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

        {statuses.map((status) => (
          <MenuItem
            key={status}
            sx={{
              color: "#1F1F1F",
              fontWeight: "400",
              fontSize: "12px",
              display: "flex",
              gap: "5px",
            }}
            onClick={() => {
              handleClose();
              onChangeStatus(status);
            }}
          >
            <SwapHorizOutlinedIcon style={{ fontSize: 15 }} />
            {status}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default OrdersActionMenu;

