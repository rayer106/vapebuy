"use client";

export default function CTA({ locale }: { locale: string }) {
  async function handleClick() {
    await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify({
        locale,
        product: "vape-abc-12k"
      })
    });

    alert("Submitted!");
  }

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "12px 20px",
        background: "#ff3d00",
        color: "#fff",
        borderRadius: 8,
        border: "none"
      }}
    >
      Buy Now
    </button>
  );
}