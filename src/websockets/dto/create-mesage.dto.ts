export class CreateMessageDto {
    content: string;
    senderId: number;
    chatId: number;
    attach?: string
    attachSize?: string
    attach2?: string
    attachSize2?: string
  }