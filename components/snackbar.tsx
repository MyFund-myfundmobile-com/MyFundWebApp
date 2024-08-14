import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  const { severity, ...other } = props;

  // Conditional rendering based on severity
  if (severity === "success") {
    return (
      <MuiAlert elevation={6} ref={ref} variant="filled" {...other}>
        {props.children}
      </MuiAlert>
    );
  } else {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
});

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error";
  handleClose: () => void;
}

const SlideTransition = React.forwardRef(function SlideTransition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide {...props} direction="right" ref={ref} />;
});

const CustomSnackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity,
  handleClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      TransitionProps={{ timeout: { enter: 500, exit: 300 } }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%", fontFamily: "Product Sans", fontSize: 17 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
