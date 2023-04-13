import { ethers } from "ethers";
import { makeMagic } from "./magic";

export const provider = new ethers.providers.Web3Provider(
  makeMagic.rpcProvider
);
