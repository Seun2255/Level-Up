import axios from "axios";

// title: req.body.title,
//         hostWallets: [req.body.host],

const handler = async (req, res) => {
  try {
    const second = JSON.parse(req.body);
    // console.log("Console Logging");
    // console.log(second.body);
    const { data } = await axios.post(
      "https://iriko.testing.huddle01.com/api/v1/create-room",
      {
        title: "Huddle01-Test",
        roomLock: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_HUDDLE_API_KEY,
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
