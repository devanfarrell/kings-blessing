import Head from "next/head";

export default function KingsBlessing() {
  let obj: any = {};
  if (typeof window !== "undefined" && localStorage) {
    const main = localStorage.getItem("KINGS_BLESSING/TOP_LEVEL_STATE");
    const player1 = localStorage.getItem(`KINGS_BLESSING/P1`);
    const player2 = localStorage.getItem(`KINGS_BLESSING/P2`);
    obj = { main, player1, player2 };

    try {
      if (main) obj.main = JSON.parse(main);
      if (player1) obj.player1 = JSON.parse(player1);
      if (player2) obj.player2 = JSON.parse(player2);
    } catch {}
  }

  return (
    <>
      <Head>
        <title>Kings Blessing!</title>
        <meta name="description" content="A game for teaching equivalent fractions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <pre>{JSON.stringify(obj, null, 2)}</pre>
      </div>
    </>
  );
}
