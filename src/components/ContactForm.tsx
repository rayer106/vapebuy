"use client";

import { useState } from "react";
import { ContactFormProps, ContactFormData, Status } from "@/types";

export default function ContactForm({ locale, product }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          locale,
          product,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.details?.[0]?.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  }

  if (status === "success") {
    return (
      <div style={{
        padding: "20px",
        backgroundColor: "#d4edda",
        border: "1px solid #c3e6cb",
        borderRadius: "8px",
        color: "#155724",
        textAlign: "center"
      }}>
        <h3>✅ Thank you!</h3>
        <p>We&apos;ll contact you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "#155724",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Contact Us</h2>
      
      {errorMessage && (
        <div style={{
          padding: "12px",
          backgroundColor: "#f8d7da",
          border: "1px solid #f5c6cb",
          borderRadius: "4px",
          color: "#721c24",
          marginBottom: "16px"
        }}>
          {errorMessage}
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="name" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="email" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="company" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Company
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="phone" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="message" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            resize: "vertical"
          }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          padding: "12px 24px",
          background: status === "submitting" ? "#ccc" : "#ff3d00",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: status === "submitting" ? "not-allowed" : "pointer",
          width: "100%"
        }}
      >
        {status === "submitting" ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
