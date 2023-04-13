import { useCallback, useEffect, useRef, useState } from "react";
import { provider } from "../libs/ethers";
import { AgeInstance } from "../ethereum/age";

function useContractData() {
  const [caller, setCaller] = useState("");
  const [age, setAge] = useState("");
  const prevCallerRef = useRef("");
  const prevAgeRef = useRef("");

  const fetchData = useCallback(async () => {
    const age = await AgeInstance.getAge();
    const lastCaller = await AgeInstance.getLastCaller();
    const formattedAge = age.toNumber();
    if (formattedAge !== prevAgeRef.current) {
      prevAgeRef.current = formattedAge;
      setAge(formattedAge);
    }
    if (lastCaller !== prevCallerRef.current) {
      prevCallerRef.current = lastCaller;
      setCaller(lastCaller);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    provider.on("block", fetchData);
    return () => {
      provider.off("block", fetchData);
    };
  }, [fetchData]);

  return { caller, age };
}

export default useContractData;
