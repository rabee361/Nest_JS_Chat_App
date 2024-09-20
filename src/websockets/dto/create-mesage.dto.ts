export class CreateMessageDto {
    content: string;
    senderId: number;
    chatId: number;
    attachId?: string
  }