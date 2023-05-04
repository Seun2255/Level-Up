import axios from "axios";

const createRoom = async (host, topic, time) => {
  const { data } = await axios.post(
    "https://iriko.testing.huddle01.com/api/v1/create-room",
    {
      title: topic,
      hostWallets: [host],
      startTime: time,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_HUDDLE_API_KEY,
      },
    }
  );
  return data.data;
};

const createGatedRoom = async (host, topic, time, type, chain, address) => {
  const { data } = await axios.post(
    "https://iriko.testing.huddle01.com/api/v1/create-room",
    {
      title: topic,
      hostWallets: [host],
      startTime: time,
      tokenType: type,
      chain: chain,
      contractAddress: [address],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_HUDDLE_API_KEY,
      },
    }
  );

  return data.data;
};

const getRoomDetails = async (room) => {
  const { data } = await axios.get(
    `https://iriko.testing.huddle01.com/api/v1/meeting-details/${room}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_HUDDLE_API_KEY,
      },
    }
  );

  return data;
};

export { createRoom, createGatedRoom, getRoomDetails };
