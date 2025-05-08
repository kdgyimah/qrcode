'use client';

type ToggleSwitchProps = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
};

export default function ToggleSwitch({ enabled, setEnabled }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-14 h-7 rounded-full px-1 transition-colors duration-300 ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <div
        className={`h-5 w-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          enabled ? 'translate-x-7' : ''
        }`}
      />
    </button>
  );
}
