import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const root = document.getElementById("root") as HTMLElement;
ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <App toggleColorMode={undefined} />
  </MsalProvider>,
  root
);
