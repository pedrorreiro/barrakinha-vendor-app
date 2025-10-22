import { Post } from "@/hooks/usePostActions";
import { mockUsers, UserProfile } from "./mock";

// Serviço MOCK em memória para simular a API
// Mantém as mesmas assinaturas usadas no app

type ApiComment = {
  id: string;
  text: string;
  postId: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
};

type LikeResponse = {
  liked: boolean;
  likes: number;
};

type CreateCommentRequest = {
  postId: string;
  text: string;
  userId: string;
};



export class ApiService {
  // Latência artificial para simular rede
  private static async simulateLatency(minMs = 200, maxMs = 600): Promise<void> {
    const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Dados em memória

  private static users = mockUsers;
 

  private static findUser(userId: string): UserProfile {
    const found = this.users.find((u) => u.id === userId);
    return (
      found || {
        id: userId,
        username: `user_${userId}`,
        avatarUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
      }
    );
  }

  private static allPosts: Post[] = [
    {
      id: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
      photoUrl: "https://picsum.photos/seed/1/1080",
      likes: 0,
      comments: 0,
      user: { ...ApiService.findUser("1") },
      createdAt: new Date("2024-01-15T10:30:00.000Z"),
      updatedAt: new Date("2024-01-15T10:30:00.000Z"),
    },
    {
      id: "2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      photoUrl: "https://picsum.photos/seed/2/1080",
      likes: 0,
      comments: 0,
      user: { ...ApiService.findUser("2") },
      createdAt: new Date("2024-01-14T15:45:00.000Z"),
      updatedAt: new Date("2024-01-14T15:45:00.000Z"),
    },
    {
      id: "3",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      photoUrl: "https://picsum.photos/seed/3/1080",
      likes: 0,
      comments: 0,
      user: { ...ApiService.findUser("3") },
      createdAt: new Date("2024-01-13T09:20:00.000Z"),
      updatedAt: new Date("2024-01-13T09:20:00.000Z"),
    },
    {
      id: "4",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
      photoUrl: "https://picsum.photos/seed/4/1080",
      likes: 0,
      comments: 0,
      user: { ...ApiService.findUser("4") },
      createdAt: new Date("2024-01-12T14:10:00.000Z"),
      updatedAt: new Date("2024-01-12T14:10:00.000Z"),
    },
    {
      id: "5",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
      photoUrl: "https://picsum.photos/seed/5/1080",
      likes: 0,
      comments: 0,
      user: { ...ApiService.findUser("2") },
      createdAt: new Date("2024-01-11T11:55:00.000Z"),
      updatedAt: new Date("2024-01-11T11:55:00.000Z"),
    },
  ];

  private static commentsByPost: Record<string, ApiComment[]> = {};

  // likes por post e usuário (para alternar like)
  private static likesByPost: Record<string, Set<string>> = {};

  // Paginação simples
  private static page = 0;
  private static readonly pageSize = 5;

  static resetFeed(): void {
    this.page = 0;
  }

  static async getPosts(): Promise<Post[]> {
    await this.simulateLatency();

    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    const slice = this.allPosts.slice(start, end);
    if (slice.length > 0) {
      this.page += 1;
    }
    // Retorna cópias novas para evitar mutação acidental pelo app
    return slice.map((p) => ({ ...p }));
  }

  static async like(postId: string): Promise<LikeResponse> {
    await this.simulateLatency(100, 300);
    const defaultUserId = "1"; // usuário mockado

    if (!this.likesByPost[postId]) {
      this.likesByPost[postId] = new Set<string>();
    }

    const set = this.likesByPost[postId];
    let liked: boolean;
    if (set.has(defaultUserId)) {
      set.delete(defaultUserId);
      liked = false;
    } else {
      set.add(defaultUserId);
      liked = true;
    }

    // Atualiza contagem no post em memória
    const post = this.allPosts.find((p) => p.id === postId);
    if (post) {
      post.likes = set.size;
      post.updatedAt = new Date();
    }

    return { liked, likes: set.size };
  }

  static async addComment({ postId, text, userId }: CreateCommentRequest): Promise<ApiComment> {
    await this.simulateLatency(150, 350);

    const user = this.findUser(userId);
    const now = new Date();
    const newComment: ApiComment = {
      id: Math.random().toString(36).slice(2),
      text,
      postId,
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    if (!this.commentsByPost[postId]) {
      this.commentsByPost[postId] = [];
    }
    this.commentsByPost[postId].unshift(newComment);

    // Atualiza contagem de comentários no post
    const post = this.allPosts.find((p) => p.id === postId);
    if (post) {
      post.comments = this.commentsByPost[postId].length;
      post.updatedAt = new Date();
    }

    return newComment;
  }

  static async getComments(postId: string): Promise<ApiComment[]> {
    await this.simulateLatency(120, 260);
    const list = this.commentsByPost[postId] || [];
    // Retorna cópias novas
    return list.map((c) => ({ ...c }));
  }
}