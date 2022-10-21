import { useContract, useContractRead, useContractWrite } from "wagmi";

import { FACTORY_CONTRACT_ADDRESS } from "../constants";
import CROWDFACTORY_ABI from "./abis/crowdfactory.json";
import CROWNFUNDINGPROJECT_ABI from "./abis/crowdfundingproject.json";
import type { Crowdfactory } from "./contract-types/Crowdfactory";
import type { Crowdfundingproject } from "./contract-types/Crowdfundingproject";

/*//////////////////////////////////////////////////////////////
                              CROWD FACTORY
//////////////////////////////////////////////////////////////*/

export function useCrowdFactoryContract(): Crowdfactory {
  const contract = useContract({
    addressOrName: FACTORY_CONTRACT_ADDRESS,
    contractInterface: CROWDFACTORY_ABI,
  });

  return contract as Crowdfactory;
}

// create a generic hook to access write functions of contract
export function useCrowdFactoryFunctionWriter(
  functionName: string
): ReturnType<typeof useContractWrite> {
  const contractWrite = useContractWrite({
    addressOrName: FACTORY_CONTRACT_ADDRESS,
    contractInterface: CROWDFACTORY_ABI,
    functionName: functionName,
  });

  return contractWrite;
}

export interface UseCrowdFactoryFunctionReaderProps {
  functionName: string;
  args?: any[];
}
// create a generic hook to access read functions of contract
export function useCrowdFactoryFunctionReader({
  functionName,
  args,
}: UseCrowdFactoryFunctionReaderProps): ReturnType<typeof useContractRead> {
  const contractRead = useContractRead({
    addressOrName: FACTORY_CONTRACT_ADDRESS,
    contractInterface: CROWDFACTORY_ABI,
    functionName: functionName,
    args: args,
    watch: true,
  });

  return contractRead;
}

/*//////////////////////////////////////////////////////////////
                          CROWD FUNDING PROJECT
//////////////////////////////////////////////////////////////*/

export function useCrowdfundingProjectContract(
  contractAddress: string
): Crowdfundingproject {
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: CROWNFUNDINGPROJECT_ABI,
  });

  return contract as Crowdfundingproject;
}

export interface UseCrowdfundingProjectFunctionWriterProps {
  contractAddress: string;
  functionName: string;
  args?: Array<any>;
}

export function useCrowdfundingProjectFunctionWriter({
  contractAddress,
  functionName,
  args,
}: UseCrowdfundingProjectFunctionWriterProps): ReturnType<
  typeof useContractWrite
> {
  if (args) {
    const contractWrite = useContractWrite({
      addressOrName: contractAddress,
      contractInterface: CROWNFUNDINGPROJECT_ABI,
      functionName: functionName,
      args: args,
    });
    return contractWrite;
  } else {
    const contractWrite = useContractWrite({
      addressOrName: contractAddress,
      contractInterface: CROWNFUNDINGPROJECT_ABI,
      functionName: functionName,
    });
    return contractWrite;
  }
}

export interface UseCrowdfundingProjectFunctionReaderProps {
  contractAddress: string;
  functionName: string;
  args?: any[];
}

// create a generic hook to access read functions of contract
export function useCrowdfundingProjectFunctionReader({
  contractAddress,
  functionName,
  args,
}: UseCrowdfundingProjectFunctionReaderProps): ReturnType<
  typeof useContractRead
> {
  const contractRead = useContractRead({
    addressOrName: contractAddress,
    contractInterface: CROWNFUNDINGPROJECT_ABI,
    functionName: functionName,
    args: args,
    watch: true,
  });

  return contractRead;
}
