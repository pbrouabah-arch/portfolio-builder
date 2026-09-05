"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsDanger() {
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleDeletePortfolio() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your portfolio?\n\nThis will permanently remove your portfolio data. Your account will remain active."
    );

    if (!confirmed) return;

    const secondConfirmation = window.confirm(
      "This action cannot be undone. Delete your portfolio permanently?"
    );

    if (!secondConfirmation) return;

    setLoadingPortfolio(true);
    setMessage("");
    setError("");

    try {
      const { error: deleteError } = await supabase.rpc(
        "delete_portfolio_data"
      );

      if (deleteError) {
        throw deleteError;
      }

      setMessage(
        "Your portfolio has been deleted successfully. Your account is still active."
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete your portfolio."
      );
    } finally {
      setLoadingPortfolio(false);
    }
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you absolutely sure you want to delete your account?\n\nYour account and all associated data will be permanently deleted."
    );

    if (!confirmed) return;

    const finalConfirmation = window.prompt(
      'Type "DELETE" to permanently delete your account.'
    );

    if (finalConfirmation !== "DELETE") {
      setError("Account deletion cancelled.");
      return;
    }

    setLoadingAccount(true);
    setMessage("");
    setError("");

    try {
      const { error: deleteError } = await supabase.rpc(
        "delete_user_account"
      );

      if (deleteError) {
        throw deleteError;
      }

      await supabase.auth.signOut();

      window.location.href = "/login";
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete your account."
      );

      setLoadingAccount(false);
    }
  }

  return (
    <section className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-red-600">
        Danger Zone
      </h2>

      <p className="mt-2 text-[#4F5358]">
        These actions are permanent and cannot be undone.
      </p>

      <div className="mt-10 space-y-6">
        {/* Delete Portfolio */}
        <div className="flex flex-col gap-5 rounded-2xl border border-red-100 bg-red-50/30 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-[#2F3A25]">
              Delete Portfolio
            </h3>

            <p className="mt-1 text-sm text-[#4F5358]">
              Permanently remove your portfolio data while keeping your
              account.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeletePortfolio}
            disabled={loadingPortfolio || loadingAccount}
            className="shrink-0 rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingPortfolio ? "Deleting..." : "Delete Portfolio"}
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex flex-col gap-5 rounded-2xl border border-red-200 bg-red-50/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-[#2F3A25]">
              Delete Account
            </h3>

            <p className="mt-1 text-sm text-[#4F5358]">
              Permanently delete your account and all associated data.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={loadingPortfolio || loadingAccount}
            className="shrink-0 rounded-2xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingAccount ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}
    </section>
  );
}