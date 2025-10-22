export type UserProfile = {
    id: string;
    username: string;
    avatarUrl: string;
  };

export const mockUsers: UserProfile[] = [
    {
      id: "1",
      username: "astolfo",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      username: "fulana_ciclaninha",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      username: "joaozinho",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      username: "maria",
      avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];
