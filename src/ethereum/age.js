import { ethers } from "ethers";
import { provider } from "../libs/ethers";
import Age from "../ethereum/build/Age.json";

const signer = provider.getSigner();

export const AgeInstance = new ethers.Contract(
  "0x04968C47eAF1D8c29e47954A68c2A6D4E4Ba0834",
  Age,
  signer
);
