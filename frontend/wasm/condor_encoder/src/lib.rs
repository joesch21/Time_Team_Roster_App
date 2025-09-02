use wasm_bindgen::prelude::*;
use rand::rngs::OsRng;
use rand::RngCore;
use serde::{Serialize, Deserialize};
use tiny_keccak::{Hasher, Keccak};
use png::Encoder;
use std::io::Cursor;

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

#[wasm_bindgen]
pub fn generate_wallet() -> Result<JsValue, JsValue> {
    let mut key = [0u8; 32];
    OsRng.fill_bytes(&mut key);
    let address_bytes = keccak256(&key);
    let address = hex::encode(&address_bytes[12..]);
    let wallet = Wallet {
        address: format!("0x{}", address),
        key: hex::encode(key),
    };
    serde_wasm_bindgen::to_value(&wallet).map_err(|e| JsValue::from_str(&e.to_string()))
}

fn xor(data: &[u8], pass: &[u8]) -> Vec<u8> {
    data.iter().enumerate().map(|(i,b)| b ^ pass[i%pass.len()]).collect()
}

#[wasm_bindgen]
pub fn embed_key_in_image_with_password(img_bytes: &[u8], key: &str, password: &str) -> Result<Vec<u8>, JsValue> {
    let key_bytes = hex::decode(key).map_err(|_| JsValue::from_str("invalid_key"))?;
    let pass_bytes = password.as_bytes();
    if pass_bytes.is_empty() { return Err(JsValue::from_str("empty_password")); }
    let enc_key = base64::encode(xor(&key_bytes, pass_bytes));

    let decoder = png::Decoder::new(img_bytes);
    let mut reader = decoder.read_info().map_err(|e| JsValue::from_str(&e.to_string()))?;
    let mut buf = vec![0; reader.output_buffer_size()];
    let info = reader.next_frame(&mut buf).map_err(|e| JsValue::from_str(&e.to_string()))?;
    buf.truncate(info.buffer_size());

    let mut out = Vec::new();
    {
        let mut encoder = Encoder::new(&mut out, info.width, info.height);
        encoder.set_color(info.color_type);
        encoder.set_depth(info.bit_depth);
        let mut writer = encoder.write_header().map_err(|e| JsValue::from_str(&e.to_string()))?;
        writer
            .write_text_chunk("condor", &enc_key)
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        writer
            .write_image_data(&buf)
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        writer.finish().map_err(|e| JsValue::from_str(&e.to_string()))?;
    }
    Ok(out)
}
