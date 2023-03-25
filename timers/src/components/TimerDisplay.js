import * as React from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import TimerComponentDisplay from "./TimerComponentDisplay";
import StyledIconButton from "./StyledIconButton";
import { deleteTimer } from "../state/TimerSlice";

export default function TimerDisplay(props) {
  const dispatch = useDispatch();
  const timeText = [props.hoursText, props.minutesText, props.secondsText];
  const timeComponentText = ["HOURS", "MINUTES", "SECONDS"];

  const deleteIconColour = !props.running
    ? props.colour_primary
    : props.colour_tertiary;

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={0}
    >
      <Typography
        style={{
          color: props.colour_text,
          fontSize: "36px",
        }}
      >
        {props.label} {`Running: ${props.running}`}
      </Typography>

      <Stack direction="row" margin={0} spacing={2}>
        {timeText.map((timeValue, index) => {
          return (
            <TimerComponentDisplay
              key={timeComponentText[index]}
              backgroundColor={props.backgroundColor}
              colour_text={props.colour_text}
              timeValue={timeValue}
              timeComponentText={timeComponentText[index]}
            />
          );
        })}
      </Stack>

      <StyledIconButton
        variant="contained"
        disabled={props.running}
        icon={<DeleteIcon fontSize="inherit" />}
        onClick={() => dispatch(deleteTimer(props.label))}
        size={"large"}
        iconColor={deleteIconColour}
        borderColour={props.colour_tertiary}
      />
    </Stack>
  );
}
