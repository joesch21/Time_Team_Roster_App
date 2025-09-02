// Thin wrappers around the WASM modules built via wasm-pack.
// Provides encoder and decoder functions for generating and
// unlocking image-based wallets.

export async function loadEncoder() {
  const mod = await import('@/wasm/encoder/condor_encoder.js');
  await mod.default();
  return {
    generateWallet: mod.generate_wallet,
    embedWithPassword: mod.embed_key_in_image_with_password,
  };
}

export async function loadDecoder() {
  const mod = await import('@/wasm/wallet/condor_wallet.js');
  await mod.default();
  return {
    decodeFromImage: mod.decode_wallet_from_image,
  };
}
