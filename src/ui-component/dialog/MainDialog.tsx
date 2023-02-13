import * as React from "react";
import { useTheme } from "@mui/material/styles";

import { Slide ,Dialog ,DialogContent ,AppBar ,Toolbar ,IconButton ,Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from '@mui/material/transitions';
interface MainDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children?: React.ReactNode;
  onClose?: boolean;
  fullScreen? : boolean;
}


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MainDialog({
  open,
  setOpen,
  title,
  children,
  onClose = true,
  fullScreen = false,
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
      <Dialog open={open} onClose={handleOnClose} 
       TransitionComponent={Transition}
       fullScreen={fullScreen}
      //  maxWidth="lg"
      //  fullWidth={true}
      >
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

        <DialogContent>
          {children}
          </DialogContent>
      </Dialog>
    </div>
  );
}
