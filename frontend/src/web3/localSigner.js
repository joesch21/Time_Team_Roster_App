import { privateKeyToAccount } from 'viem/accounts'
export function makeLocalAccount(hexPrivateKey) {
  // hexPrivateKey must be 0x-prefixed
  return privateKeyToAccount(hexPrivateKey)
}
