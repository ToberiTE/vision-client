import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "fcf76067-5c14-4096-9405-c37cd6b24569",
        authority:
            "https://login.microsoftonline.com/4df8ac53-79eb-4832-b36e-0b46afc12e00",
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
