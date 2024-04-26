import crypto from "crypto";

const secret = "BIG-DADDY-PAPA-KID";
export const random = () => crypto.randomBytes(128).toString("base64");
export const encrpytPassword = (salt: string, password: string) =>
  crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secret)
    .digest("hex");
