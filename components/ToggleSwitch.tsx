'use client';

import { Switch } from '@headlessui/react';

type ToggleSwitchProps = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
};

export default function ToggleSwitch({ enabled, setEnabled }: ToggleSwitchProps) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      } relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none`}
    >
      <span
        className={`${
          enabled ? 'translate-x-7' : 'translate-x-1'
        } inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300`}
      />
    </Switch>
  );
}
