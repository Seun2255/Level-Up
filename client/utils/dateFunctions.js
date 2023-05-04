const timeStamp = () => {
  const date = new Date();
  var day = date.getDate();
  if (day < 10) day = `0${day}`;
  var month = date.getMonth();
  if (month < 10) month = `0${month}`;
  var year = date.getFullYear();
  var hour = date.getHours();
  if (hour < 10) hour = `0${hour}`;
  var minute = date.getMinutes();
  if (minute < 10) minute = `0${minute}`;

  return `${day}/${month}/${year} ${hour}:${minute}`;
};

export { timeStamp };
