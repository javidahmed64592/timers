import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Stack } from "@mui/material";
import Timer from "../components/timer/Timer";
import TimerDialog from "../components/dialog/TimerDialog";
import MediaButtons from "../components/buttons/MediaButtons";
import { selectList } from "../state/TimerSlice";
import { getColours } from "../state/ColourSlice";

function HomePage() {
  const [data, setData] = useState({
    title: "",
    date: "",
  });

  useEffect(() => {
    fetch("/data").then((res) =>
      res.json().then((data) => {
        setData({
          date: data.time_now,
        });
      })
    );
  }, []);

  const colours = useSelector((state) => getColours(state));
  const timers = useSelector((state) => selectList(state));

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      overflow="auto"
      style={{
        minWidth: "100%",
        height: "100vh",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        overflow="auto"
        style={{
          flex: 1,
        }}
      >
        {timers.length ? (
          timers.map((timer) => {
            return <Timer id={timer.id} key={timer.id} label={timer.label} />;
          })
        ) : (
          <Typography
            style={{
              color: colours.quaternary,
              margin: 6,
              fontSize: "24px",
            }}
          >
            No timers set! Add new timers or load a preset.
          </Typography>
        )}
        <TimerDialog />
      </Stack>

      <MediaButtons />

      <Typography style={{ color: colours.quaternary }}>
        Last refresh: {data.date}
      </Typography>
    </Stack>
  );
}

export default HomePage;
