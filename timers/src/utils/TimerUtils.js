export const HMSToTotal = (hours, minutes, seconds) => {
  return seconds + minutes * 60 + hours * 3600;
};

const totalToHMS = (total) => {
  const hours = Math.floor(total / 3600);
  const remainingSeconds = total % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
};

export const parseTimeText = (total) => {
  const { hours, minutes, seconds } = totalToHMS(total);
  const hoursText = zeroFill(hours);
  const minutesText = zeroFill(minutes);
  const secondsText = zeroFill(seconds);
  return {
    hoursText: hoursText,
    minutesText: minutesText,
    secondsText: secondsText,
  };
};

export const zeroFill = (value) => (value > 9 ? value : "0" + value);

export const sortListByTime = (listToSort) => {
  const newList = listToSort.sort(
    (timerA, timerB) =>
      HMSToTotal(timerA.hours, timerA.minutes, timerA.seconds) -
      HMSToTotal(timerB.hours, timerB.minutes, timerB.seconds)
  );
  return newList;
};
