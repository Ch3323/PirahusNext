import Lobby from "@/src/lib/game/lobby/Lobby";
import { getCurrentUser } from "@/src/lib/get-current-user";

export default async function MinigamesPage() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return <Lobby points={0} />;
    }
    return <Lobby points={session.point} />;
  } catch (error) {
    return <Lobby points={0} />;
  }
}
