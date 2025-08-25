# Frontend

## Building the WASM wallet decoder

Run the decoder build before starting the app:

```
yarn build:wasm
```

This compiles the Rust code in `wasm/wallet_decoder` and outputs to `src/wasm`.

## Testing image-based login

Start development server:

```
yarn dev
```

Open the app and upload the sample wallet image from `public/input.png` on the login page.

## Generating wallet images

For this demo a wallet image is simply a JSON file saved with a `.png` extension containing `{ "address": "...", "key": "..." }`.
