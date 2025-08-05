import { Comment, Post } from "@/hooks/usePostActions";

type RandomUserAPIResponse = {
  results: {
    login: {
      username: string;
    };
    picture: {
      large: string;
    };
  }[];
};

type LoremIpsumAPIResponse = string[];

export async function generateComments(user: {
  name: string;
  avatar: string;
}): Promise<Comment[]> {
  const quantity = Math.floor(Math.random() * 10);

  const loremIpsumResponse = await fetch(
    `https://baconipsum.com/api/?type=meat-and-filler&paras=${quantity}`
  );
  const loremIpsumData: LoremIpsumAPIResponse = await loremIpsumResponse.json();
  return Array.from({ length: quantity }, (_, i) => {
    return {
      id: `comment-${i}`,
      text: loremIpsumData[i],
      user: {
        name: user.name,
        avatar: user.avatar,
      },
      createdAt: new Date(),
    };
  });
}

export async function generatePosts(quantity: number): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  try {
    const randomUserResponse = await fetch(
      `https://randomuser.me/api/?results=${quantity}`
    );
    const randomUserData: RandomUserAPIResponse =
      await randomUserResponse.json();

    const loremIpsumResponse = await fetch(
      "https://baconipsum.com/api/?type=meat-and-filler&paras=1&sentences=3"
    );
    const loremIpsumData: LoremIpsumAPIResponse =
      await loremIpsumResponse.json();

    const posts = await Promise.all(
      randomUserData.results.map(async (user, index) => {
        const comments: Comment[] = await generateComments({
          name: user.login.username,
          avatar: user.picture.large,
        });

        return {
          id: user.login.username,
          content: loremIpsumData[0],
          image: `https://picsum.photos/seed/${index + 1}/1080`,
          likes: Math.floor(Math.random() * 100),
          comments,
          user: {
            name: user.login.username,
            avatar: user.picture.large,
          },
          createdAt: new Date(),
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("Error generating posts", error);
    return [];
  }
}
