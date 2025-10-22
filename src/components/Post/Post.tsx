import { Post as PostType } from "../../hooks/usePostActions";
import { PostActions } from "./PostActions";
import { PostDetails } from "./PostDetails";
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostRoot } from "./PostRoot";

export const Post = {
  Root: PostRoot,
  Header: PostHeader,
  Image: PostImage,
  Actions: PostActions,
  Details: PostDetails,
};

export default ({ post }: { post: PostType }) => {
  return (
    <Post.Root post={post}>
      <Post.Header />
      <Post.Image />
      <Post.Actions />
      <Post.Details />
    </Post.Root>
  );
};
