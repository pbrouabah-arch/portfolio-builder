"use client";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/rock-bg.jpg')" }}
      />
    </div>
  );
}