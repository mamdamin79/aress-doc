export interface CommentExpandButtonProps {
  isOpen: boolean;
  onToggle?: () => void;
}
export interface CommentOwnerProps {
  author: {
    name: string;
    profileImage?: string;
  };
  timestamp: string;
}
export interface CommentProps extends CommentOwnerProps {
  id: string;
  content: string;
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
}

export interface ParentCommentProps extends CommentProps {
  reply: CommentProps;
  onReply?: (commentId: string) => void;
}

export interface BaseCommentProps extends CommentProps {
  reply?: CommentProps;
  isReply?: boolean;
  onReply?: (commentId: string) => void;
}

export interface CommentSectionProps {
  comments: ParentCommentProps[];
  onReply?: (commentId: string) => void;
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  className?: string;
}
