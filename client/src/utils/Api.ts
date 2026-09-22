import type {
  CardData,
  FormEditValues,
  UserData,
  FormUpdateAvatar,
  CardId,
  FormAddCardValues,
} from "../types/types.js";

class Api {
  private baseUrl: string;
  private headers: Record<string, string> = {}
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
  public async getUserInfo(): Promise<UserData> {
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: "GET",
        headers: this.headers,
      });

      return await this.handleResponse<UserData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async getInitialCards(): Promise<CardData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/cards/`, {
        method: "GET",
        headers: this.headers,
      });

      return await this.handleResponse<CardData[]>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async updateInfoUser(
    userData: FormEditValues,
  ): Promise<UserData> {
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
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
      const response = await fetch(`${this.baseUrl}/cards/`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link,
        }),
      });
      return await this.handleResponse<CardData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async updateAvatar(
    value: FormUpdateAvatar,
  ): Promise<UserData> {
    try {
      const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
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
      const response = await fetch(`${this.baseUrl}/cards/${cardId._id}`, {
        method: "DELETE",
        headers: this.headers,
      });
      return await this.handleResponse<CardData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async deleteIsLiked(cardId: string): Promise<CardData> {
    try {
      const response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this.headers,
      });
      return await this.handleResponse<CardData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async putIsLiked(cardId: string): Promise<CardData> {
    try {
      const response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this.headers,
      });
      return await this.handleResponse<CardData>(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
const api = new Api("https://around-api.es.tripleten-services.com/v1", {
          authorization: "6bb5e120-4ce0-4a3c-8c06-4acdb84033fc",
          "Content-Type": "application/json",
        });

        export default api;