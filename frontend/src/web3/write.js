import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { submitClockEvent } from '../lib/api.js'

// Chain config (opBNB or testnet) – keep consistent with your existing chains setup.
export const chain = {
  id: (import.meta.env.VITE_USE_TESTNET === 'true') ? 5611 : 204, // opBNB testnet : mainnet
  rpcUrls: {
    default: { http: [(import.meta.env.VITE_USE_TESTNET === 'true' ? import.meta.env.VITE_OPBNB_RPC_TESTNET : import.meta.env.VITE_OPBNB_RPC_MAINNET)] }
  }
};

const RPC = chain.rpcUrls.default.http[0];

export function makeLocalAccount(hexPrivateKey) {
  const pk = hexPrivateKey.startsWith('0x') ? hexPrivateKey : `0x${hexPrivateKey}`;
  return privateKeyToAccount(pk);
}

export function getClients(account) {
  const publicClient = createPublicClient({ chain, transport: http(RPC) });
  const walletClient = createWalletClient({ chain, transport: http(RPC), account });
  return { publicClient, walletClient };
}

export async function logClockDirect({ account, isIn, ts, shiftId, attHash }) {
  const address = import.meta.env.VITE_CONTRACT_TIMELOG;
  const abi = (await import('./TimeLog.abi.json')).default || (await import('./TimeLog.abi.json'));
  const { walletClient } = getClients(account);
  // TimeLog.log(address worker, uint256 ts, bool isIn, string shiftId, bytes32 attHash)
  return walletClient.writeContract({
    address,
    abi,
    functionName: 'log',
    args: [account.address ?? account, BigInt(ts), isIn, shiftId, attHash]
  });
}

export async function logClockViaRelayer({ account, isIn, ts, shiftId, attHash }) {
  const event = {
    worker: account.address ?? account,
    ts,
    isIn,
    shiftId,
    attHash,
  };
  const res = await submitClockEvent(event);
  return res.txHash;
}

// Usage from your UI (image-wallet or connected wallet):
//
// import { logClock, makeLocalAccount } from '../web3/write';
//
// // For image-wallet session:
// const local = makeLocalAccount(privateKey); // keep only in memory
// await logClock({
//   account: local,
//   isIn: true,                      // or false for clock out
//   ts: Math.floor(Date.now()/1000),
//   shiftId: 'FT-2025-09-08-Mon-1',  // your ID format
//   attHash: '0x' + '00'.repeat(32)  // placeholder
// });

