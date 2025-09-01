import { createConfig, http, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { opBNB, opBNBTestnet } from './chains'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const isTest = import.meta.env.VITE_USE_TESTNET === 'true'
const chains = [isTest ? opBNBTestnet : opBNB]
const config = getDefaultConfig({
  appName: 'Roster App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
  transports: { [chains[0].id]: http() }
})
const qc = new QueryClient()
export default function Web3Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={qc}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
