import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Deleteicon, ThreeVerticalDots } from "@svg";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface ActionsMenuProps {
    onDelete: () => void;
    onEdit: () => void; 
}

const ActionsMenu = ({ onDelete, onEdit  }: ActionsMenuProps) => {
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
            color: "#1F1F1F",
            fontWeight: "400",
            fontSize: "12px",
            display: "flex",
            gap: "5px",
          }}
          onClick={() => {
            handleClose();
            onEdit();
          }}
        >
          <ModeEditOutlineOutlinedIcon  style={{ fontSize: 15 }} />
          Edit
        </MenuItem>

        <MenuItem
          sx={{
            color: "red",
            fontWeight: "400",
            fontSize: "12px",
            display: "flex",
            gap: "5px",
          }}
          onClick={() => {
            handleClose();
            onDelete();
          }}
        >
          <Deleteicon />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ActionsMenu;
