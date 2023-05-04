const goToRoom = (classId, gated) => {
  const newWindow = window.open(
    gated
      ? `http://localhost:3000/room/gated/${classId}`
      : `http://localhost:3000/room/${classId}`,
    "_blank",
    "noopener,noreferrer"
  );
  if (newWindow) newWindow.opener = null;
};

export default goToRoom;
