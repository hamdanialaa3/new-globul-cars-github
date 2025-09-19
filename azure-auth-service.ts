// Azure Active Directory Integration for Bulgarian Car Marketplace
// Microsoft account login service

import { ConfidentialClientApplication } from '@azure/msal-node';

const clientId = process.env.AZURE_CLIENT_ID || 'your-client-id';
const clientSecret = process.env.AZURE_CLIENT_SECRET || 'your-client-secret';
const tenantId = process.env.AZURE_TENANT_ID || 'your-tenant-id';
const redirectUri = process.env.AZURE_REDIRECT_URI || 'http://localhost:3000/auth/callback';

const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

export class BulgarianAzureAuthService {
  // Get login URL
  async getAuthUrl(): Promise<string> {
    const authCodeUrlParameters = {
      scopes: ["user.read"],
      redirectUri,
    };
    return await cca.getAuthCodeUrl(authCodeUrlParameters);
  }

  // Exchange code for token
  async getTokenFromCode(authCode: string): Promise<any> {
    const tokenRequest = {
      code: authCode,
      scopes: ["user.read"],
      redirectUri,
    };
    return await cca.acquireTokenByCode(tokenRequest);
  }
}

// Usage example
// const azureAuth = new BulgarianAzureAuthService();
// const url = azureAuth.getAuthUrl();
