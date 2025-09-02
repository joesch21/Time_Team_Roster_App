use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use tiny_keccak::{Hasher, Keccak};
use png::Decoder;

#[derive(Serialize, Deserialize)]
struct Wallet {
    address: String,
    key: String,
}

fn keccak256(data: &[u8]) -> [u8;32] {
    let mut hasher = Keccak::v256();
    let mut out = [0u8;32];
    hasher.update(data);
    hasher.finalize(&mut out);
    out
}

fn xor(data: &[u8], pass: &[u8]) -> Vec<u8> {
    data.iter().enumerate().map(|(i,b)| b ^ pass[i%pass.len()]).collect()
}

#[wasm_bindgen]
pub fn decode_wallet_from_image(img_bytes: &[u8], password: &str) -> Result<JsValue, JsValue> {
    let decoder = Decoder::new(img_bytes);
    let mut reader = decoder.read_info().map_err(|e| JsValue::from_str(&e.to_string()))?;
    let mut buf = vec![0; reader.output_buffer_size()];
    let info = reader.next_frame(&mut buf).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let text_entry = reader
        .info()
        .text
        .iter()
        .find(|t| t.keyword == "condor")
        .ok_or_else(|| JsValue::from_str("missing_data"))?;
    let enc = base64::decode(&text_entry.text).map_err(|_| JsValue::from_str("invalid_data"))?;
    let pass_bytes = password.as_bytes();
    if pass_bytes.is_empty() { return Err(JsValue::from_str("empty_password")); }
    let key_bytes = xor(&enc, pass_bytes);
    let key_hex = hex::encode(&key_bytes);
    let address_bytes = keccak256(&key_bytes);
    let address = hex::encode(&address_bytes[12..]);
    let wallet = Wallet {
        address: format!("0x{}", address),
        key: key_hex,
    };
    serde_wasm_bindgen::to_value(&wallet).map_err(|e| JsValue::from_str(&e.to_string()))
}
