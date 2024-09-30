export class CreateMessageDto {
    content: string;
    senderId: number;
    recieverId: number;
    chatId: number;
    attach?: string
    attachSize?: string
    attach2?: string
    attachSize2?: string
  }