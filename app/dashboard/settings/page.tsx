import SettingsAccount from "@/components/dashboard/SettingsAccount";
import SettingsPortfolio from "@/components/dashboard/SettingsPortfolio";
import SettingsDanger from "@/components/dashboard/SettingsDanger";

export default function SettingsPage() {
  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-5xl font-bold text-[#2F3A25]">
          Settings
        </h1>

        <p className="mt-3 text-lg text-[#6B7280]">
          Manage your account and portfolio preferences.
        </p>
      </div>

      <SettingsAccount />

      <SettingsPortfolio />

      <SettingsDanger />

    </main>
  );
}