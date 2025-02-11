//read function
//view and pure functions (Smartcontract)
import type { BigNumber } from "ethers";
import type { Result } from "ethers/lib/utils";

import { DEBUG } from "../constants";
import type { Crowdfactory } from "./contract-types/Crowdfactory";
import type { Crowdfundingproject } from "./contract-types/Crowdfundingproject";
import {
  useCrowdFactoryFunctionReader,
  useCrowdfundingProjectFunctionReader,
} from "./hooks";

/*//////////////////////////////////////////////////////////////
                              CROWD FACTORY
//////////////////////////////////////////////////////////////*/

export function useTotalPublishedProjs(): number | undefined {
  const totalPublishedProjsReader = useCrowdFactoryFunctionReader({
    functionName: "totalPublishedProjs",
  });
  const totalPublishedProjs:
    | Awaited<ReturnType<Crowdfactory["totalPublishedProjs"]>>
    | Result
    | undefined = totalPublishedProjsReader.data;

  DEBUG &&
    console.log("totalPublishedProjs: ", totalPublishedProjs?.toString());

  if (!totalPublishedProjs) return undefined;

  return parseInt(totalPublishedProjs.toString()) as number;
}

export function usePublishedProjs(index: number): string | undefined {
  const publishedProjsReader = useCrowdFactoryFunctionReader({
    functionName: "publishedProjs",
    args: [index],
  });
  const publishedProjs:
    | Awaited<ReturnType<Crowdfactory["publishedProjs"]>>
    | Result
    | undefined = publishedProjsReader.data;

  DEBUG && console.log("publishedProjs: ", publishedProjs);

  if (!publishedProjs) return undefined;

  return publishedProjs as unknown as string;
}

/*//////////////////////////////////////////////////////////////
                          CROWD FUNDING PROJECT
//////////////////////////////////////////////////////////////*/

export function useProjTitle(contractAddress: string): string | undefined {
  const projTitleReader = useCrowdfundingProjectFunctionReader({
    contractAddress: contractAddress,
    functionName: "projTitle",
  });

  const projTitle:
    | Awaited<ReturnType<Crowdfundingproject["projTitle"]>>
    | Result
    | undefined = projTitleReader.data;

  DEBUG && console.log("projTitle: ", projTitle);

  if (!projTitle) return undefined;

  return projTitle as unknown as string;
}

export function useProjDescription(
  contractAddress: string
): string | undefined {
  const projDescriptionReader = useCrowdfundingProjectFunctionReader({
    contractAddress: contractAddress,
    functionName: "projDescription",
  });

  const projDescription:
    | Awaited<ReturnType<Crowdfundingproject["projDescription"]>>
    | Result
    | undefined = projDescriptionReader.data;

  DEBUG && console.log("projDescription: ", projDescription);

  if (!projDescription) return undefined;

  return projDescription as unknown as string;
}

export function useGoalAmount(contractAddress: string): BigNumber | undefined {
  const goalAmountReader = useCrowdfundingProjectFunctionReader({
    contractAddress: contractAddress,
    functionName: "goalAmount",
  });

  const goalAmount:
    | Awaited<ReturnType<Crowdfundingproject["goalAmount"]>>
    | Result
    | undefined = goalAmountReader.data;

  DEBUG && console.log("goalAmount: ", goalAmount);

  if (!goalAmount) return undefined;

  return goalAmount as unknown as BigNumber;
}

export function useNumOfContributions(contractAddress: string): BigNumber | undefined {
  const goalAmountReader = useCrowdfundingProjectFunctionReader({
    contractAddress: contractAddress,
    functionName: "numOfContributions",
  });

  const numOfContributions:
    | Awaited<ReturnType<Crowdfundingproject["numOfContributions"]>>
    | Result
    | undefined = goalAmountReader.data;

  DEBUG && console.log("numOfContributions: ", numOfContributions);

  if (!numOfContributions) return undefined;

  return numOfContributions as unknown as BigNumber;
}

export function useRaisedAmount(
  contractAddress: string
): BigNumber | undefined {
  const raisedAmountReader = useCrowdfundingProjectFunctionReader({
    contractAddress: contractAddress,
    functionName: "raisedAmount",
  });

  const raisedAmount:
    | Awaited<ReturnType<Crowdfundingproject["raisedAmount"]>>
    | Result
    | undefined = raisedAmountReader.data;

  DEBUG && console.log("raisedAmount: ", raisedAmount);

  if (!raisedAmount) return undefined;

  return raisedAmount as unknown as BigNumber;
}

export function useCosts(
  contractAddress: string
): Array<BigNumber> | undefined {
  const costsAmountReader = useCrowdfundingProjectFunctionReader({
    contractAddress: contractAddress,
    functionName: "getCosts",
  });

  const costsArray:
    | Awaited<ReturnType<Crowdfundingproject["getCosts"]>>
    | Result
    | undefined = costsAmountReader.data;

  DEBUG && console.log("goalAmount: ", costsArray);

  if (!costsArray) return undefined;

  return costsArray as unknown as Array<BigNumber>;
}

export function useStocks(
  contractAddress: string
): Array<BigNumber> | undefined {
  const costsAmountReader = useCrowdfundingProjectFunctionReader({
    contractAddress: contractAddress,
    functionName: "getStocks",
  });

  const stocksArray:
    | Awaited<ReturnType<Crowdfundingproject["getStocks"]>>
    | Result
    | undefined = costsAmountReader.data;

  DEBUG && console.log("stocksAmount: ", stocksArray);

  if (!stocksArray) return undefined;

  return stocksArray as unknown as Array<BigNumber>;
}

export function useCostsWFee(
  contractAddress: string
): Array<BigNumber> | undefined {
  const costsAmountReader = useCrowdfundingProjectFunctionReader({
    contractAddress: contractAddress,
    functionName: "getCostsWFee",
  });

  const costsWFeeArray:
    | Awaited<ReturnType<Crowdfundingproject["getCostsWFee"]>>
    | Result
    | undefined = costsAmountReader.data;

  DEBUG && console.log("stocksAmount: ", costsWFeeArray);

  if (!costsWFeeArray) return undefined;

  return costsWFeeArray as unknown as Array<BigNumber>;
}

export function useFeePerTier(
  contractAddress: string
): Array<BigNumber> | undefined {
  const feePerTierReader = useCrowdfundingProjectFunctionReader({
    contractAddress: contractAddress,
    functionName: "getFeePerTier",
  });

  const feePerTierArray:
    | Awaited<ReturnType<Crowdfundingproject["getFeePerTier"]>>
    | Result
    | undefined = feePerTierReader.data;

  DEBUG && console.log("stocksAmount: ", feePerTierArray);

  if (!feePerTierArray) return undefined;

  return feePerTierArray as unknown as Array<BigNumber>;
}


