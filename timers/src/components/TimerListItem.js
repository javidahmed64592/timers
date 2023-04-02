import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@mui/material";
import { Stack } from "@mui/system";
import Box from "@mui/material/Box";
import TimerDisplay from "./TimerDisplay";
import { parseTimeText } from "../utils/TimerUtils";
import {
  getTimerRunning,
  getTimerRemainingTime,
  countdown,
} from "../state/TimerSlice";
import { getColours } from "../state/ColourSlice";

export default function TimerListItem(props) {
  const Ref = useRef(null);
  const dispatch = useDispatch();
  const colours = useSelector((state) => getColours(state));

  const running = useSelector((state) => getTimerRunning(state, props.id));
  const remainingTime = useSelector((state) =>
    getTimerRemainingTime(state, props.id)
  );

  useEffect(() => {
    if (running && remainingTime > 0) {
      const interval = setInterval(() => {
        dispatch(countdown(props.id));
      }, 1000);
      Ref.current = interval;
    }
    return () => clearInterval(Ref.current);
  }, [running, remainingTime, dispatch, props.id]);

  return (
    <Box display="inline-block">
      <Card
        variant="outlined"
        style={{
          backgroundColor: colours.secondary,
          border: "1px solid",
          borderColor: colours.primary,
          margin: 2,
        }}
      >
        <Stack justifyContent="center" alignItems="center">
          <TimerDisplay
            key={props.id}
            id={props.id}
            label={props.label}
            hoursText={parseTimeText(remainingTime).hoursText}
            minutesText={parseTimeText(remainingTime).minutesText}
            secondsText={parseTimeText(remainingTime).secondsText}
          />
        </Stack>
      </Card>
    </Box>
  );
}
