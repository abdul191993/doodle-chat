export type TMessage = {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
};

export type TGetMessagesParams = {
  limit?: number;
  after?: string;
  before?: string;
};

export type TCreateMessagePayload = {
  author: string;
  message: string;
};