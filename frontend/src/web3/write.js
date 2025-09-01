import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { opBNB, opBNBTestnet } from './chains'
import ABI from './TimeLog.abi.json'

const isTest = import.meta.env.VITE_USE_TESTNET === 'true'
const chain = isTest ? opBNBTestnet : opBNB
const RPC = chain.rpcUrls.default.http[0]

export function getClients(account) {
  const transport = account && account.signTransaction ? http(RPC) : custom(window.ethereum)
  const publicClient = createPublicClient({ chain, transport })
  const walletClient = createWalletClient({ chain, transport, account })
  return { publicClient, walletClient }
}

export async function logClock({ account, contractAddress, isIn, ts, shiftId, attHash }) {
  const { walletClient } = getClients(account)
  return walletClient.writeContract({
    address: contractAddress,
    abi: ABI,
    functionName: 'log',
    args: [account.address ?? account, BigInt(ts), isIn, shiftId, attHash]
  })
}
