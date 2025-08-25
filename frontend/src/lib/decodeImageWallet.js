let wasmModule;

export default async function decodeImageWallet(file) {
  if (!file) throw new Error('No file provided');
  try {
    if (!wasmModule) {
      wasmModule = await import('../wasm/wallet_decoder.js');
      if (typeof wasmModule.default === 'function') {
        await wasmModule.default();
      }
    }
    const buffer = await file.arrayBuffer();
    const { address, key } = wasmModule.decode_wallet(new Uint8Array(buffer));
    return { address, privateKey: key };
  } catch (err) {
    throw new Error(err.message || 'Invalid wallet image');
  }
}
