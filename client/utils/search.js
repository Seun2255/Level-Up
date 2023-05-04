const searchVideo = (videos, text) => {
  var check = "";
  const end = text.length;
  check = text.slice(0, end);
  var result = [];
  videos.map((video) => {
    if (video.topic.toLowerCase().slice(0, end) === check.toLowerCase())
      result.push(video);
  });

  return result;
};

export default searchVideo;
