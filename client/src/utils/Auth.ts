import type { UserData, FormSignValues } from "../types/types";

class Auth {
  private authUrl: string;
  private headers: Record<string, string> = {};
  constructor(baseUrl: string, headers: Record<string, string> = {}) {
    this.authUrl = baseUrl;
    this.headers = headers;
  }
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const erroText = await response.text();
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${erroText}`,
      );
    }
    return response.json();
  }
  public async registerUser(
    userData: FormSignValues,
  ): Promise<{ data: UserData }> {
    try {
      const response = await fetch(`${this.authUrl}/signup`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          password: userData.password,
          email: userData.email,
        }),
      });
      return await this.handleResponse<{ data: UserData }>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async loginUser(userData: FormSignValues): Promise<{ token: string }> {
    try {
      const response = await fetch(`${this.authUrl}/signin`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });

      return await this.handleResponse<{ token: string }>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async getCurrentUser(token: string): Promise<{ data: UserData }> {
    try {
      const response = await fetch(`${this.authUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": this.headers["Content-Type"],
          Authorization: `Bearer ${token}`,
        },
      });
      return await this.handleResponse<{ data: UserData }>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const auth = new Auth("https://se-register-api.en.tripleten-services.com/v1", {
  "Content-Type": "application/json",
});
export default auth;
