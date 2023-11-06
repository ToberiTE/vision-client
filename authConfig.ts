import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "3190cfb4-b885-428f-917a-727f4a2d832d",
        authority:
            "https://login.microsoftonline.com/common",
        redirectUri: "https://vision-client.azurewebsites.net/.auth/login/aad/callback",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: string, containsPii: any) =>
            {
                if (containsPii)
                {
                    return;
                }
                switch (level)
                {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
};
