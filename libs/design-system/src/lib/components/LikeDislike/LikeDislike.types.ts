type Reaction = 'like' | 'dislike';
export type LikeDislikeProps = {
  initialValue: number;
  Reaction: Reaction;
  reactedBefore: boolean;
  onReact: (reaction: Reaction) => void;
};
