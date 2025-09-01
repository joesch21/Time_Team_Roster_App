import { defineChain } from 'viem'
export const opBNB = defineChain({
  id: 204, name: 'opBNB', nativeCurrency: { name:'BNB', symbol:'BNB', decimals:18 },
  rpcUrls: { default: { http: [import.meta.env.VITE_OPBNB_RPC_MAINNET] } }
})
export const opBNBTestnet = defineChain({
  id: 5611, name: 'opBNB Testnet', nativeCurrency: { name:'tBNB', symbol:'tBNB', decimals:18 },
  rpcUrls: { default: { http: [import.meta.env.VITE_OPBNB_RPC_TESTNET] } }
})
