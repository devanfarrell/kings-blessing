import Head from "next/head";
import KingsBlessingGame from "../../games/kingsBlessing";

export default function KingsBlessing() {
  return (
    <>
      <Head>
        <title>Kings Blessing!</title>
        <meta name="description" content="A game for teaching equivalent fractions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <KingsBlessingGame />
    </>
  );
}
