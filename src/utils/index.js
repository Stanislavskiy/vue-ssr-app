export function timeoutOver(time, timeout) {
  /* 
    Check whether the timeout has expired in relation to the current time
  */
  if (time && timeout) {
    const timeNow = new Date().getTime();

    return (time + timeout) < timeNow;
  }

  return true;
}
