
export const arrivalTimeDisplay = (time, showAp) => {
  let hour = time.hours;
  let minutes = time.minutes ? time.minutes.toString().padStart(2, "0") : "00";
  let ap = "a";

  // vary hours & am/pm based on what hour it is
  // gtfs has hours that are greater than 24
  if (time.hours < 12 && time.hours > 0) {
    hour = time.hours;
    ap = "a";
  } else if (time.hours > 12 && time.hours < 24) {
    hour = time.hours - 12;
    ap = "p";
  } else if (time.hours % 12 === 0) {
    hour = 12;
    ap = time.hours === 12 ? "p" : "a";
  } else if (time.hours >= 24) {
    hour = time.hours - 24;
    ap = "a";
  }

  return `${hour}:${minutes}${showAp ? ap : ``}`;
};
