class ApiHandler {
    static _handleCall(method, endpoint, data = {}) {
      return fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method === "POST" ? JSON.stringify(data) : null,
      });
    }
    
    static post(endpoint, data) {
      return this._handleCall("POST", endpoint, data);
    }
    
    static get(endpoint) {
      return this._handleCall("GET", endpoint);
    }
  }



