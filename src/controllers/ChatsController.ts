import API, { ChatsAPI } from "../api/ChatsAPI";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set("chats", chats);
  }

  async addUserToChat(id: number, userId: number) {
    await this.api.addUsers(id, [userId]);
  }

  async removeUserFromChat(id: number, userId: number) {
    await this.api.removeUsers(id, [userId]);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set("selectedChat", id);
  }

  getChatUsers(chatId: number) {
    return this.api.getUsers(chatId);
  }
}

const controller = new ChatsController();

// @ts-expect-error error
window.chatsController = controller;

export default controller;
