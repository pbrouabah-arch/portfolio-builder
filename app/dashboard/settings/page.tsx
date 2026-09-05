import SettingsAccount from "@/components/dashboard/SettingsAccount";
import SettingsDanger from "@/components/dashboard/SettingsDanger";

export default function SettingsPage() {
  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-[#2F3A25]">
          Settings
        </h1>

        <p className="mt-3 text-lg text-[#4B5563]">
          Manage your account and portfolio preferences.
        </p>
      </div>

      <SettingsAccount />

      <SettingsDanger />
    </main>
  );
}