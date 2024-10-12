import { CounterClientComponent } from "@/nComponents/ClientComponent";
import { ElectronCheck } from "@/nComponents/ElectronCheck";
import { ServerPokemonComponent } from "@/nComponents/ServerComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-around p-24 flex-row">
      <ElectronCheck />

      <ServerPokemonComponent />

      <CounterClientComponent />
    </main>
  );
}
