
export interface ReplyData {
  id: string;
  userName: string;
  userAvatar?: string;
  comment: string;
  createdAt: string;
}

export interface ReviewData {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
  userLiked: boolean;
  replies?: ReplyData[];
  showReplies?: boolean;
}
