export type reaction = 'like' | 'dislike';
export type LikeDislikeProps = {
  initialValue: number;
  reaction: reaction;
  reactedBefore: boolean;
  onReact: (reaction: reaction) => void;
};
