import "@/styles/globals.css";
import "react-datetime/css/react-datetime.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { filecoinHyperspace, localhost } from "wagmi/chains";

const chains = [localhost, filecoinHyperspace];
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
