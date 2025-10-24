// OAuth Manager - Handles authentication for multiple cloud providers
class OAuthManager {
  constructor() {
    this.providers = {
      googleDrive: {
        authUrl: 'https://accounts.google.com/o/oauth2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        clientId: '310060055305-q9mujdglrh92qk7i6ccf7a5j72ft4op8.apps.googleusercontent.com',
        scopes: ['https://www.googleapis.com/auth/drive.file'],
        redirectUri: chrome.identity.getRedirectURL()
      },
      onedrive: {
        authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        clientId: 'f8590984-b525-488a-91de-8bb83be0ee37',
        scopes: ['Files.ReadWrite', 'offline_access'],
        redirectUri: chrome.identity.getRedirectURL()
      },
      dropbox: {
        authUrl: 'https://www.dropbox.com/oauth2/authorize',
        clientId: 'w9b0keymjj9m0cw',
        clientSecret: "z31vilx0gua54vc",
        scopes: ['files.content.write'],
        redirectUri: chrome.identity.getRedirectURL()
      }
    };
    console.log(chrome.identity.getRedirectURL())
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
      params.set('client_secret', config.clientSecret)
      params.set('response_type','code')
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
    console.log("Got url", url)
    const params = new URLSearchParams(url.hash.substring(1));
    
    var accessToken

    // for dropbox it uses code instead of access_token
    if (provider == 'dropbox'){
      const code = url.searchParams.get("code")
      accessToken = this.getDropboxAccessToken(code)
      console.log("Token/code", accessToken)
      if (!accessToken) {
      throw new Error('No access token in redirect URL');
    }
    }
  
    else{
    accessToken = params.get('access_token');
    if (!accessToken) {
      throw new Error('No access token in redirect URL');
    }
    }
    
    // const accessToken = params.get('access_token');
    // if (!accessToken) {
    //   throw new Error('No access token in redirect URL');
    // }

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
  async getDropboxAccessToken(code){
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('grant_type','authorization_code');
    params.append('client_id',this.providers.dropbox.clientId);
    params.append('client_secret',this.providers.dropbox.clientSecret);
    params.append('redirect_uri', this.providers.onedrive.redirectUri);

    const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: params
    });
    if (!response.ok) {
      throw new Error('Failed tom exchange code for token: '+ await response.text());
    }

    const data = await response.json();
    return data.access_token;
  }

}

// Export for use in other modules
export default OAuthManager;