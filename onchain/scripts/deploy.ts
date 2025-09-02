import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const TimeLog = await ethers.deployContract("TimeLog");
  await TimeLog.waitForDeployment();
  const address = await TimeLog.getAddress();
  console.log("TimeLog deployed to:", address);

  // Copy ABI to frontend
  const artifacts = path.resolve("artifacts/contracts/TimeLog.sol/TimeLog.json");
  const out = path.resolve("../frontend/src/web3/TimeLog.abi.json");
  const json = JSON.parse(fs.readFileSync(artifacts, "utf8"));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(json.abi, null, 2));
  console.log("ABI written to:", out);

  // Also write a .env.local hint for frontend
  const envPath = path.resolve("../frontend/.env.local.sample");
  fs.writeFileSync(envPath, `VITE_CONTRACT_TIMELOG=${address}\n`);
  console.log("Wrote sample env with contract address:", envPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

