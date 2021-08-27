import { useMachine } from "@xstate/react";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import { Toggle } from "../components";
import { SettingsMachine, BooleanLocalStorageKeys } from "../machines/settings.machine";

export default function Settings() {
  const [machine, send] = useMachine(SettingsMachine);
  if (!machine.matches("ready")) return <div>LOADING</div>;

  return (
    <>
      <Head>
        <title>Gamify Education Settings</title>
        <meta name="Set the settings for the different games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
        <div className="grid grid-cols-2 gap-4">
          <div>
            Tabletop mode:
            <div className="text-gray-400">For use on tablets when players are directly facing each other</div>
          </div>
          <div className="flex justify-center items-center">
            <Toggle
              handleToggle={(state) =>
                send({ type: "SET_BOOLEAN_SETTING", key: BooleanLocalStorageKeys.tabletop, state })
              }
              checked={machine.context.tabletop}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Default player color
// Orange Blue
// Default player names

// add claim a field sound

// settings for sound

// Success and fail text phrases can be more thematic (king and queen phrases)

// Make current selection more bold - previous selection really light if they got it wrong

// Settings to make tabletop version
