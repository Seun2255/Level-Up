import app from "../../firebase/firebaseApp";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { timeStamp } from "@/utils/dateFunctions";

const db = getFirestore(app);

const createUser = async (address) => {
  const user = {
    username: "",
    about: "",
    profilePic: "",
    followers: [],
    videos: [],
    address: address,
  };
  var data = {};
  const userData = await getDocs(collection(db, "users"));
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  if (data[address]) {
    console.log("User already registered");
  } else {
    await setDoc(doc(db, "users", address), user);
  }
};

const updateUserProfile = async (username, about, profilePic, address) => {
  var data = {};
  const userData = await getDocs(collection(db, "users"));
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  var temp = data[address];
  temp.about = about;
  temp.username = username;
  temp.profilePic = profilePic;
  await setDoc(doc(db, "users", address), temp);
};

const createNewClass = async (
  topic,
  about,
  cover,
  host,
  classId,
  time,
  gated
) => {
  var data1 = {};
  var data2 = {};
  var data3 = {};
  const videoData = await getDocs(collection(db, "data"));
  const userData = await getDocs(collection(db, "users"));
  const questionData = await getDocs(collection(db, "data"));

  videoData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data1[doc.id] = doc.data().data;
  });

  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data2[doc.id] = doc.data();
  });

  questionData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data3[doc.id] = doc.data();
  });

  const videoDetails = {
    topic,
    about,
    cover,
    host,
    classId,
    questionPrice: 0,
    time,
    gated,
  };
  console.log(data1);

  data1["videos"].push(videoDetails);
  data3["questions"][classId] = [];
  console.log(data1["videos"]);

  data2[host].videos.push(videoDetails);

  await setDoc(doc(db, "data", "videos"), { data: data1["videos"] });
  await setDoc(doc(db, "data", "questions"), data3["questions"]);
  await setDoc(doc(db, "users", host), data2[host]);
};

const addToLibrary = async (book, owner) => {
  var data = {};
  const userData = await getDocs(collection(db, "users"));

  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });

  var authorData = data[owner];
  authorData.library.push(book);

  await setDoc(doc(db, "users", owner), authorData);
};

const addToRecent = async (chapter) => {
  var data = {};
  const recentData = await getDocs(collection(db, "recent"));

  recentData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });

  if (data["recent"].length < 10) {
    data["recent"].unshift(chapter);
  } else {
    data["recent"].unshift(chapter);
    data["recent"].pop();
  }

  await setDoc(doc(db, "recent", "recent"), { data: data["recent"] });
};

const askQuestion = async (room, question) => {
  var data = {};
  const questions = await getDocs(collection(db, "data"));

  questions.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });

  data["questions"][room].push(question);

  await setDoc(doc(db, "data", "questions"), data["questions"]);
};

const getQuestions = async () => {
  var data = {};
  const questions = await getDocs(collection(db, "data"));

  questions.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });

  return data["questions"];
};

const getRecent = async () => {
  var data = {};
  const recentData = await getDocs(collection(db, "recent"));

  recentData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  const recentChapters = data["recent"];
  return recentChapters;
};

const uploadChapter = async (bookId, chapter, title, owner, content) => {
  var data1 = {};
  var data2 = {};
  const bookData = await getDocs(collection(db, "data"));
  const userData = await getDocs(collection(db, "users"));
  bookData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data1[doc.id] = doc.data().data;
  });

  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data2[doc.id] = doc.data();
  });

  const chapterDetails = {
    bookId,
    chapter,
    title,
    created: timeStamp(),
    content,
  };

  for (var i = 0; i < chapter; i++) {
    if (data1["books"][bookId].chapters[i]) {
      // data1["books"][i] = data1["books"][i];
    } else {
      data1["books"][bookId].chapters.push("first");
    }
  }
  data1["books"][bookId].chapters.push(chapterDetails);

  for (var i = 0; i < chapter; i++) {
    if (data2[owner].myBooks[bookId].chapters[i]) {
      // data2[owner][i] = data2[owner][i];
    } else {
      data2[owner].myBooks[bookId].chapters.push("first");
    }
  }
  data2[owner].myBooks[bookId].chapters.push(chapterDetails);

  var allBooks = data1["books"];
  allBooks[bookId].chapters[chapter] = chapterDetails;

  var authorData = data2[owner];
  authorData.myBooks[bookId].chapters[chapter] = chapterDetails;

  await setDoc(doc(db, "data", "books"), { data: allBooks });
  await setDoc(doc(db, "users", owner), authorData);
  await addToRecent(chapterDetails);
};

const getUserDetails = async (address) => {
  var data = {};
  const userData = await getDocs(collection(db, "users"));
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  const details = data[address];
  return details;
};

const getAllBooks = async () => {
  var data = {};
  const bookData = await getDocs(collection(db, "data"));
  bookData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  var books = data["books"];
  return books;
};

const getBookDetails = async (bookId) => {
  var data = {};
  const bookData = await getDocs(collection(db, "data"));
  bookData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  var book = data["books"][bookId];
  return book;
};

const checkIfUserExists = async (user) => {
  var data = {};
  const userData = await getDocs(collection(db, "users"));
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  var state = false;
  const addresses = Object.keys(data);
  addresses.map((address) => {
    if (address === user) state = true;
  });
  return state;
};

const rate = async (rating, user) => {};

export {
  createUser,
  getUserDetails,
  checkIfUserExists,
  createNewClass,
  askQuestion,
  getQuestions,
  db,
};
