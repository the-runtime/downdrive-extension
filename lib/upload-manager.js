// OAuth Manager - Handles authentication for multiple cloud providers
class OAuthManager {
  constructor() {
    this.providers = {
      googleDrive: {
        authUrl: 'https://accounts.google.com/o/oauth2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        scopes: ['https://www.googleapis.com/auth/drive.file'],
        redirectUri: chrome.identity.getRedirectURL()
      },
      onedrive: {
        authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        clientId: 'YOUR_MICROSOFT_CLIENT_ID',
        scopes: ['Files.ReadWrite', 'offline_access'],
        redirectUri: chrome.identity.getRedirectURL()
      },
      dropbox: {
        authUrl: 'https://www.dropbox.com/oauth2/authorize',
        clientId: 'YOUR_DROPBOX_APP_KEY',
        scopes: ['files.content.write'],
        redirectUri: chrome.identity.getRedirectURL()
      }
    };
  }

  /**
   * Authenticate with a cloud provider
   * @param {string} provider - Provider name (googleDrive, onedrive, dropbox)
   * @returns {Promise<string>} Access token
   */
  async authenticate(provider) {
    try {
      const config = this.providers[provider];
      if (!config) {
        throw new Error(`Unknown provider: ${provider}`);
      }

      // Check if we have a cached token
      const cachedToken = await this.getCachedToken(provider);
      if (cachedToken && await this.isTokenValid(provider, cachedToken)) {
        console.log(`Using cached token for ${provider}`);
        return cachedToken;
      }

      // Get new token
      const token = await this.getNewToken(provider, config);
      
      // Cache the token
      await this.cacheToken(provider, token);
      
      return token;
    } catch (error) {
      console.error(`Authentication error for ${provider}:`, error);
      throw error;
    }
  }

  /**
   * Get a new access token via OAuth flow
   */
  async getNewToken(provider, config) {
    const authUrl = this.buildAuthUrl(provider, config);
    
    return new Promise((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        {
          url: authUrl,
          interactive: true
        },
        (redirectUrl) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }

          try {
            const token = this.extractToken(redirectUrl, provider);
            resolve(token);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }

  /**
   * Build OAuth authorization URL
   */
  buildAuthUrl(provider, config) {
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'token',
      scope: config.scopes.join(' ')
    });

    // OneDrive uses different parameter names
    if (provider === 'onedrive') {
      params.set('response_mode', 'fragment');
    }

    // Dropbox doesn't use scope parameter the same way
    if (provider === 'dropbox') {
      params.set('token_access_type', 'offline');
    }

    return `${config.authUrl}?${params.toString()}`;
  }

  /**
   * Extract access token from redirect URL
   */
  extractToken(redirectUrl, provider) {
    if (!redirectUrl) {
      throw new Error('No redirect URL received');
    }

    // Parse the URL fragment for the access token
    const url = new URL(redirectUrl);
    const params = new URLSearchParams(url.hash.substring(1));
    
    const accessToken = params.get('access_token');
    if (!accessToken) {
      throw new Error('No access token in redirect URL');
    }

    return accessToken;
  }

  /**
   * Cache token in Chrome storage
   */
  async cacheToken(provider, token) {
    const key = `token_${provider}`;
    const data = {
      token: token,
      timestamp: Date.now()
    };
    
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: data }, resolve);
    });
  }

  /**
   * Get cached token from Chrome storage
   */
  async getCachedToken(provider) {
    const key = `token_${provider}`;
    
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        if (result[key]) {
          resolve(result[key].token);
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Check if token is still valid (basic time-based check)
   */
  async isTokenValid(provider, token) {
    const key = `token_${provider}`;
    
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        if (!result[key]) {
          resolve(false);
          return;
        }

        // Consider token valid for 50 minutes (most tokens last 60 minutes)
        const maxAge = 50 * 60 * 1000;
        const age = Date.now() - result[key].timestamp;
        resolve(age < maxAge);
      });
    });
  }

  /**
   * Remove cached token (logout)
   */
  async logout(provider) {
    const key = `token_${provider}`;
    return new Promise((resolve) => {
      chrome.storage.local.remove([key], resolve);
    });
  }

  /**
   * Remove all cached tokens
   */
  async logoutAll() {
    const keys = Object.keys(this.providers).map(p => `token_${p}`);
    return new Promise((resolve) => {
      chrome.storage.local.remove(keys, resolve);
    });
  }
}

// Export for use in other modules
export default OAuthManager;