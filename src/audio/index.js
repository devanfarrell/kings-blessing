import UIFx from "uifx";

import kingsBlessingFailFile from "./kings_blessing_fail.wav";
import kingsBlessingSuccessFile from "./kings_blessing_success.wav";
import kingsBlessingClickFile from "./kings_blessing_click.wav";

const kingsBlessingFailSound = new UIFx(kingsBlessingFailFile, { volume: 0.8 });
const kingsBlessingSuccessSound = new UIFx(kingsBlessingSuccessFile, { volume: 0.8 });
const kingsBlessingClickSound = new UIFx(kingsBlessingClickFile, { volume: 0.6 });

export { kingsBlessingFailSound, kingsBlessingSuccessSound, kingsBlessingClickSound };
