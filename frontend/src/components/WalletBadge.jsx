import React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useAuth } from '../lib/auth.jsx';

export default function WalletBadge() {
  const { web3 } = useAuth();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const addr = web3?.address || address;
  if (!addr) return <span>No wallet</span>;
  const short = `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  const network = chain?.name || 'opBNB testnet';
  return <span>{short} – {network}</span>;
}
