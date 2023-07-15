import { observer } from "mobx-react-lite";
import { suspend } from "suspend-react";
import { useState } from "react";
import InputSelect from "../components/InputSelect";
import SetupDialog from "../components/SetupDialog";
import Amplifier from "../services/Amplifier";
import MicrophonePermissionService from "../services/MicrophonePermissionService";
import PolymorphicEffectView from "../components/PolymorficEffectView";

export const Component = observer(() => {
  const [amplifier, setAmplifier] = useState<Amplifier>();
  const microphonePermissionService = suspend(
    async () => await MicrophonePermissionService.create(),
    ["IndexPage/microphonePermissionService"]
  );

  return (
    <div className="p-2">
      <SetupDialog
        microphonePermissionService={microphonePermissionService}
        onPermissionGranted={async () => setAmplifier(await Amplifier.create())}
      />

      <InputSelect
        microphonePermissionService={microphonePermissionService}
        className="mb-2"
        value={amplifier?.inputDeviceInfo}
        onChange={(device) => amplifier?.setInputDevice(device ?? undefined)}
      />

      <div className="flex flex-wrap gap-2">
        {amplifier?.effects?.map((effect) => (
          <PolymorphicEffectView key={effect.id} effect={effect} />
        ))}
      </div>
    </div>
  );
});
