import App from "./App";
import "./polyfills";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  argentWallet,
  braveWallet,
  imTokenWallet,
  ledgerWallet,
  injectedWallet,
  trustWallet,
  omniWallet
} from '@rainbow-me/rainbowkit/wallets';
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { RPC_PROVIDER } from "../constants";

const { chains, provider } = configureChains(
  [
    chain.polygonMumbai,
  ],
  [
  
    jsonRpcProvider({
      rpc: () => {
        return {
          http: RPC_PROVIDER,
        };
      },
    }),
    publicProvider(),
   
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      rainbowWallet({ chains }),
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: 'Crowdfunding Platform' }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      argentWallet({ chains }),
      braveWallet({
        chains,
        shimDisconnect: true,
      }),
      imTokenWallet({ chains }),
      injectedWallet({
        chains,
        shimDisconnect: true,
      }),
      ledgerWallet({
        chains,
        
      }),
      omniWallet({ chains }),
      trustWallet({ chains, shimDisconnect: true }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        showRecentTransactions={true}
        chains={chains}
        coolMode
      >
        <App/>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
