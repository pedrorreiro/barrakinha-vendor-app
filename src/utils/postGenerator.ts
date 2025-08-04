import { PostType } from "@/components/Post/PostContext";

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

type LoremIpsumAPIResponse = {
  paragraphs: string[];
};

export async function generatePosts(quantity: number): Promise<PostType[]> {
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

    const posts = randomUserData.results.map((user, index) => {
      return {
        id: user.login.username,
        content: loremIpsumData[0],
        image: `https://picsum.photos/seed/${index + 1}/1080`,
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 100),
        user: {
          name: user.login.username,
          avatar: user.picture.large,
        },
        createdAt: new Date(),
      };
    });

    return posts;
  } catch (error) {
    console.error("Error generating posts", error);
    return [];
  }
}
