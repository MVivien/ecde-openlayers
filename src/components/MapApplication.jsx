import { useState } from "react";
import PropTypes from "prop-types";
import { useDrag } from "@use-gesture/react";

import { grey } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useTheme } from "@mui/material/styles";

import AppContainer from "./AppContainer";
import SubAppContainer from "./SubAppContainer";

function PullerContainer({ children, drawerBleeding, position = "left", ...rest }) {
  if (position === "left" || position === "right") {
    return (
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: grey[200],
          borderBottomRightRadius: 8,
          borderTopRightRadius: 8,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "absolute",
          ...(position === "left" && { right: -drawerBleeding }),
          ...(position === "right" && { left: -drawerBleeding }),
          top: 0,
          visibility: "visible",
          width: drawerBleeding,
          zIndex: 1,
          "&:hover": {
            cursor: "pointer",
            backgroundColor: grey[100],
          },
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  } else {
    // top or bottom
    return (
      <Box
        sx={{
          backgroundColor: grey[200],
          position: "absolute",
          ...(position === "bottom" && { top: -drawerBleeding }),
          ...(position === "top" && { bottom: -drawerBleeding }),
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: "visible",
          right: 0,
          left: 0,
          zIndex: 1,
          touchAction: "none",
          height: drawerBleeding,
          "&:hover": {
            cursor: "pointer",
            backgroundColor: grey[100],
          },
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
}

function Puller({ children, position = "left", ...rest }) {
  if (position === "left" || position === "right") {
    return (
      <Box
        sx={{
          width: 6,
          height: "25vh",
          backgroundColor: grey[600],
          borderRadius: 3,
          position: "absolute",
          top: "calc(50% - 25vh / 2)",
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: 30,
          height: 6,
          backgroundColor: grey[600],
          borderRadius: 3,
          position: "absolute",
          top: 8,
          left: "calc(50% - 15px)",
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
}

function useDrawer(open = false, position = "left") {
  const [drawer, setDrawer] = useState(open);
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    const reference = position === "left" || position === "right" ? mx : my;
    if (down || Math.abs(reference) < 20) {
      // hysteresis
      return;
    }
    if (reference > 0 && (position === "left" || position === "top") && !drawer) {
      setDrawer(true);
    } else if (reference < 0 && (position === "right" || position === "bottom") && !drawer) {
      setDrawer(true);
    } else if (reference < 0 && (position === "left" || position === "top") && drawer) {
      setDrawer(false);
    } else if (reference > 0 && (position === "right" || position === "bottom") && drawer) {
      setDrawer(false);
    }
  });
  return [drawer, setDrawer, bind];
}

/**
 *
 * @returns CADS Application layout for map based applications
 */
export default function MapApplication({
  inputs = null,
  outputs = null,
  children,
  inputsMd = "left",
  inputsXs = "bottom",
  outputsMd = "left",
  outputsXs = "bottom",
}) {
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerLeft, setDrawerLeft, bindLeft] = useDrawer(false, "left");
  const [drawerBottom, setDrawerBottom, bindBottom] = useDrawer(false, "bottom");
  const [drawerRight, setDrawerRight, bindRight] = useDrawer(false, "right");
  const [drawerTop, setDrawerTop, bindTop] = useDrawer(false, "top");

  const drawerBleeding = 34;

  const inputsOnLeft =
    ((inputsMd === "left" && large) || (inputsXs === "left" && !large)) && Boolean(inputs);
  const outputsOnLeft =
    ((outputsMd === "left" && large) || (outputsXs === "left" && !large)) && Boolean(outputs);
  const somethingOnLeft = inputsOnLeft || outputsOnLeft;
  const inputsOnBottom =
    ((inputsMd === "bottom" && large) || (inputsXs === "bottom" && !large)) && Boolean(inputs);
  const outputsOnBottom =
    ((outputsMd === "bottom" && large) || (outputsXs === "bottom" && !large)) && Boolean(outputs);
  const somethingOnBottom = inputsOnBottom || outputsOnBottom;
  const inputsOnRight =
    ((inputsMd === "right" && large) || (inputsXs === "right" && !large)) && Boolean(inputs);
  const outputsOnRight =
    ((outputsMd === "right" && large) || (outputsXs === "right" && !large)) && Boolean(outputs);
  const somethingOnRight = inputsOnRight || outputsOnRight;
  const inputsOnTop =
    ((inputsMd === "top" && large) || (inputsXs === "top" && !large)) && Boolean(inputs);
  const outputsOnTop =
    ((outputsMd === "top" && large) || (outputsXs === "top" && !large)) && Boolean(outputs);
  const somethingOnTop = inputsOnTop || outputsOnTop;

  const drawerContainerStyles = large
    ? {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        padding: theme.spacing(2, 0),
        minWidth: "25dvw",
      }
    : {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        padding: theme.spacing(2, 0),
        width: "100%",
      };

  const swipeableDrawerLeft = somethingOnLeft ? (
    <SwipeableDrawer
      open={drawerLeft}
      variant="persistent"
      anchor="left"
      onClose={() => {
        setDrawerLeft(false);
      }}
      onOpen={() => {
        setDrawerLeft(true);
      }}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        ".MuiPaper-root": {
          overflow: "visible",
        },
      }}
    >
      <PullerContainer
        position="left"
        drawerBleeding={drawerBleeding}
        role="separator"
        aria-orientation="horizontal"
        tabIndex="0"
        onClick={() => {
          setDrawerLeft((oldState) => !oldState);
        }}
        {...bindLeft()}
      >
        <Puller position="left" />
      </PullerContainer>
      <SubAppContainer
        fullHeight
        sx={{
          backgroundColor: grey[200],
          overflowY: "auto",
        }}
      >
        <Box sx={drawerContainerStyles}>
          {inputsOnLeft ? inputs : null}
          {outputsOnLeft ? outputs : null}
        </Box>
      </SubAppContainer>
    </SwipeableDrawer>
  ) : null;

  const swipeableDrawerRight = somethingOnRight ? (
    <SwipeableDrawer
      open={drawerRight}
      variant="persistent"
      anchor="right"
      onClose={() => {
        setDrawerRight(false);
      }}
      onOpen={() => {
        setDrawerRight(true);
      }}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        ".MuiPaper-root": {
          overflow: "visible",
        },
      }}
    >
      <PullerContainer
        position="right"
        drawerBleeding={drawerBleeding}
        role="separator"
        aria-orientation="horizontal"
        tabIndex="0"
        onClick={() => {
          setDrawerRight((oldState) => !oldState);
        }}
        {...bindRight()}
      >
        <Puller position="right" />
      </PullerContainer>
      <SubAppContainer
        fullHeight
        sx={{
          backgroundColor: grey[200],
          overflowY: "auto",
        }}
      >
        <Box sx={drawerContainerStyles}>
          {inputsOnRight ? inputs : null}
          {outputsOnRight ? outputs : null}
        </Box>
      </SubAppContainer>
    </SwipeableDrawer>
  ) : null;

  const swipeableDrawerBottom = somethingOnBottom ? (
    <SwipeableDrawer
      open={drawerBottom}
      variant="persistent"
      anchor="bottom"
      onClose={() => {
        setDrawerBottom(false);
      }}
      onOpen={() => {
        setDrawerBottom(false);
      }}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        ".MuiPaper-root": {
          overflow: "visible",
          height: `calc(50% - ${drawerBleeding}px)`,
        },
      }}
    >
      <PullerContainer
        position="bottom"
        drawerBleeding={drawerBleeding}
        role="separator"
        aria-orientation="vertical"
        tabIndex="0"
        onClick={() => {
          setDrawerBottom((oldState) => !oldState);
        }}
        {...bindBottom()}
      >
        <Puller position="bottom" />
      </PullerContainer>
      <SubAppContainer
        sx={{
          backgroundColor: grey[200],
          overflowY: "auto",
        }}
      >
        <Box sx={drawerContainerStyles}>
          {inputsOnBottom ? inputs : null}
          {outputsOnBottom ? outputs : null}
        </Box>
      </SubAppContainer>
    </SwipeableDrawer>
  ) : null;

  const swipeableDrawerTop = somethingOnTop ? (
    <SwipeableDrawer
      open={drawerTop}
      variant="persistent"
      anchor="top"
      onClose={() => {
        setDrawerTop(false);
      }}
      onOpen={() => {
        setDrawerTop(false);
      }}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        ".MuiPaper-root": {
          overflow: "visible",
          height: `calc(40% - ${drawerBleeding}px)`,
        },
      }}
    >
      <PullerContainer
        position="top"
        drawerBleeding={drawerBleeding}
        role="separator"
        aria-orientation="vertical"
        tabIndex="0"
        onClick={() => {
          setDrawerTop((oldState) => !oldState);
        }}
        {...bindTop()}
      >
        <Puller position="top" />
      </PullerContainer>
      <SubAppContainer
        sx={{
          backgroundColor: grey[200],
          overflowY: "auto",
        }}
      >
        <Box sx={drawerContainerStyles}>
          {inputsOnTop ? inputs : null}
          {outputsOnTop ? outputs : null}
        </Box>
      </SubAppContainer>
    </SwipeableDrawer>
  ) : null;

  return (
    <>
      {swipeableDrawerLeft}
      {swipeableDrawerRight}
      {swipeableDrawerBottom}
      {swipeableDrawerTop}
      <AppContainer>
        <Grid xs={12} sx={{ flexGrow: 1 }}>
          {children}
        </Grid>
      </AppContainer>
    </>
  );
}

MapApplication.propTypes = {
  inputsMd: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  inputsXs: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  outputsMd: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  outputsXs: PropTypes.oneOf(["left", "right", "top", "bottom"]),
};
