import { useCallback, useEffect, useRef, useState } from "react";
import { provider } from "../libs/ethers";
import { ethers } from "ethers";

function useEthBalance() {
  const [balance, setBalance] = useState(0);
  const prevBalanceRef = useRef(0);
  const signer = provider.getSigner();

  const fetchBalance = useCallback(async () => {
    const address = await signer.getAddress();
    const rawBalance = await provider.getBalance(address);
    const value = parseFloat(ethers.utils.formatEther(rawBalance));
    if (value !== prevBalanceRef.current) {
      prevBalanceRef.current = value;
      setBalance(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    provider.on("block", fetchBalance);
    return () => {
      provider.off("block", fetchBalance);
    };
  }, [fetchBalance]);

  return balance;
}

export default useEthBalance;
