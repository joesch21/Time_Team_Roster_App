use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct Wallet {
    address: String,
    key: String,
}

#[wasm_bindgen]
pub fn decode_wallet(data: &[u8]) -> Result<JsValue, JsValue> {
    let text = std::str::from_utf8(data).map_err(|_| JsValue::from_str("invalid_utf8"))?;
    let wallet: Wallet = serde_json::from_str(text).map_err(|_| JsValue::from_str("invalid_wallet"))?;
    serde_wasm_bindgen::to_value(&wallet).map_err(|_| JsValue::from_str("serialization_error"))
}
