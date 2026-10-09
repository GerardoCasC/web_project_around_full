import type { UserData, FormSignValues } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

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
      const response = await fetch(`${this.authUrl}/users/signup`, {
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
      const response = await fetch(`${this.authUrl}/users/signin`, {
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
}

const auth = new Auth(API_URL, {
  "Content-Type": "application/json",
});
export default auth;
