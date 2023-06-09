import { Magic } from "magic-sdk";
import { OpenIdExtension } from "@magic-ext/oidc";

export const makeMagic = new Magic(
  process.env.REACT_APP_MAGIC_PUBLISHABLE_API_KEY,
  {
    network: "goerli",
    extensions: [new OpenIdExtension()],
  }
);
