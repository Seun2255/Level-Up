import { ethers } from "ethers";
import CONTRACT from "../../contracts/LevelUp.json";
import CONTRACT2 from "../../contracts/Prime.json";
import Web3Modal from "web3modal";
import {
  createUser,
  getUserDetails,
  checkIfUserExists,
  createNewClass,
  askQuestion,
} from "./database";

const toFixed_norounding = (n, p) => {
  var result = n.toFixed(p);
  return result <= n ? result : (result - Math.pow(0.1, p)).toFixed(p);
};

const providerOptions = {
  /* See Provider Options Section */
};

const getProvider = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  } else {
    return false;
  }
};

const getSigner = async () => {
  const provider = await getProvider();
  return provider.getSigner();
};

const getAddress = async () => {
  const signer = await getSigner();
  const address = await signer.getAddress();

  // window.ethereum.request({
  //     method: "wallet_addEthereumChain",
  //     params: [
  //         {
  //             chainId: "0x13881",
  //             rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  //             chainName: "Matic Mumbai",
  //             nativeCurrency: {
  //                 name: "MATIC",
  //                 symbol: "MATIC",
  //                 decimals: 18,
  //             },
  //             blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  //         },
  //     ],
  // })

  return address;
};

const connect = async (address) => {
  var data;
  const condition = await checkIfUserExists(address);
  if (!condition) await createUser(address);

  data = await getUserDetails(address);

  const contract = await getContract2();

  var tokenBalance = await contract.balanceOf(address);
  var ethBalance = await contract.getEthBalance(address);

  tokenBalance = tokenBalance / 10 ** 18;
  tokenBalance = toFixed_norounding(tokenBalance, 3);

  ethBalance = ethBalance / 10 ** 18;
  ethBalance = toFixed_norounding(ethBalance, 3);

  data.tokenBalance = tokenBalance;
  data.ethBalance = ethBalance;
  return data;
};

const walletConnect = async (address) => {
  var data;
  const condition = await checkIfUserExists(address);
  if (!condition) await createUser(address);
  data = await getUserDetails(address);

  const contract = await getContract2();

  var tokenBalance = await contract.balanceOf(address);
  var ethBalance = await contract.getEthBalance(address);

  tokenBalance = tokenBalance / 10 ** 18;
  tokenBalance = toFixed_norounding(tokenBalance, 3);

  ethBalance = ethBalance / 10 ** 18;
  ethBalance = toFixed_norounding(ethBalance, 3);

  data.tokenBalance = tokenBalance;
  data.ethBalance = ethBalance;
  return data;
};

const getContract = async () => {
  const signer = await getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    CONTRACT.abi,
    signer
  );
  return contract;
};

const getContract2 = async () => {
  const signer = await getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS2,
    CONTRACT2.abi,
    signer
  );
  return contract;
};

//User Auth Functions
const updateUser = async (username, about, profilePic) => {
  const user = await getAddress();
  await updateUserProfile(username, about, profilePic, user);
};

const getUserData = async () => {
  const address = await getAddress();
  const user = await getUserDetails(address);
  return user;
};

//upload functions
const createClass = async (topic, about, cover, classId, time, gated) => {
  const contract = await getContract();
  const address = await getAddress();

  let txn = await contract.uploadClass(topic, about, cover);
  await txn.wait();
  var id = await contract.currentClassToken();
  id = ethers.BigNumber.from(id).toNumber();
  createNewClass(topic, about, cover, address, classId, time, gated).then(
    () => {
      console.log("Class Created");
    }
  );
};

const newQuestion = async (room, question) => {
  askQuestion(room, question).then(() => {
    console.log("Question asked");
  });
};

const getBalances = async () => {
  const address = await getAddress();
  const contract = await getContract2();

  var tokenBalance = await contract.balanceOf(address);
  var ethBalance = await contract.getEthBalance(address);

  tokenBalance = tokenBalance / 10 ** 18;
  tokenBalance = toFixed_norounding(tokenBalance, 3);

  ethBalance = ethBalance / 10 ** 18;
  ethBalance = toFixed_norounding(ethBalance, 3);

  return {
    tokenBalance,
    ethBalance,
  };
};

const buyTokens = async (eth) => {
  const contract = await getContract2();

  let txn = contract.buyTokens({ value: ethers.utils.parseEther(eth) });
  await txn.wait();
};

export { getProvider, connect, walletConnect, createClass, newQuestion };
