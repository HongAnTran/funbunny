import * as React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
interface MainDialogProps {
  open: boolean;
  setOpen: any;
  title?: string;
  children?: React.ReactNode;
  onClose?: boolean;
}

export default function MainDialog({
  open,
  setOpen,
  title,
  children,
  onClose = true,
}: MainDialogProps) {
  const theme: any = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClose = () => {
    if (onClose) {
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleOnClose}>
        <AppBar
          elevation={0}
          sx={{
            position: "relative",

            bgcolor:
              theme.palette.mode === "dark"
                ? theme.palette.dark.dark
                : theme.palette.background.default,
          }}
        >
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h3" component="div">
              {title}
            </Typography>
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
