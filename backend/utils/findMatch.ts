type User = {
  socketId: string;
  userId: string;
  username: string;
  skillLevel: string;
  techStack: string[];
};

export function findMatch(queue: User[], user: User): User | undefined {
  const match = queue.find((queuedUser) => {
    if (queuedUser.userId === user.userId) return false;
    if (queuedUser.skillLevel !== user.skillLevel) return false;

    return queuedUser.techStack === user.techStack;
  });

  return match;
}
