export interface SubscribedEmail {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribedEmailsResponse {
  success: boolean;
  message?: string;
  data: {
    allEmails: SubscribedEmail[];
  };
}
