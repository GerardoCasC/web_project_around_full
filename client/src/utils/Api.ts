import type {
  CardData,
  FormEditValues,
  UserData,
  FormUpdateAvatar,
  CardId,
  FormAddCardValues,
} from "../types/types.js";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

class Api {
  private baseUrl: string;
  private headers: Record<string, string> = {};
  constructor(baseUrl: string, headers: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
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
  private async request(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const token = localStorage.getItem("auth-token");
    return fetch(this.baseUrl + endpoint, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public async getUserInfo(): Promise<UserData> {
    try {
      const response = await this.request(`/users/me`);

      return await this.handleResponse<UserData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async getInitialCards(): Promise<CardData[]> {
    try {
      const response = await this.request(`/cards/`);

      return await this.handleResponse<CardData[]>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async updateInfoUser(userData: FormEditValues): Promise<UserData> {
    try {
      const response = await this.request(`/users/me`, {
        method: "PATCH",
        body: JSON.stringify({
          name: userData.name,
          about: userData.about,
        }),
      });

      return await this.handleResponse<UserData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async addCard(cardData: FormAddCardValues): Promise<CardData> {
    try {
      const response = await this.request(`/cards/`, {
        method: "POST",
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link,
          owner: cardData.user_id,
        }),
      });

      return await this.handleResponse<CardData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async updateAvatar(value: FormUpdateAvatar): Promise<UserData> {
    try {
      const response = await this.request(`/users/me/avatar`, {
        method: "PATCH",
        body: JSON.stringify({
          avatar: value.avatar,
        }),
      });

      return await this.handleResponse<UserData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async deleteCard(cardId: CardId): Promise<CardData> {
    try {
      const response = await this.request(`/cards/${cardId._id}`, {
        method: "DELETE",
      });

      return await this.handleResponse<CardData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async deleteIsLiked(cardId: string): Promise<CardData> {
    try {
      const response = await this.request(`/cards/${cardId}/likes`, {
        method: "DELETE",
      });

      return await this.handleResponse<CardData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async putIsLiked(cardId: string): Promise<CardData> {
    try {
      const response = await this.request(`/cards/${cardId}/likes`, {
        method: "PUT",
      });

      return await this.handleResponse<CardData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
const api = new Api(API_URL, {
  "Content-Type": "application/json",
});

export default api;
