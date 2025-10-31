"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccess() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const sendEmail = async () => {
      try {
        setStatus("sending")
        const stored = sessionStorage.getItem("registrationPayload")
        if (!stored) {
          setStatus("error")
          setError("No registration data found. Please fill the form again.")
          return
        }
        const payload = JSON.parse(stored)
        const res = await fetch("/api/send-registration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        const result = await res.json()
        if (result.success) {
          setStatus("success")
          sessionStorage.removeItem("registrationPayload")
        } else {
          setStatus("error")
          setError(result.error || "Failed to send email")
        }
      } catch (e) {
        setStatus("error")
        setError(e instanceof Error ? e.message : "Unknown error")
      }
    }
    sendEmail()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow-sm text-center">
        {status === "sending" && (
          <>
            <h1 className="text-xl font-semibold text-foreground">Processing your registration…</h1>
            <p className="mt-2 text-sm text-muted-foreground">Please wait while we finalize your submission.</p>
          </>
        )}
        {status === "success" && (
          <>
            <h1 className="text-xl font-semibold text-foreground">Payment confirmed ✅</h1>
            <p className="mt-2 text-sm text-muted-foreground">Your registration details have been emailed successfully.</p>
            <div className="mt-6">
              <Button onClick={() => (window.location.href = "/")}>Back to Home</Button>
            </div>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-xl font-semibold text-foreground">We couldn't complete your submission</h1>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="secondary" onClick={() => (window.location.href = "/")}>Back to Home</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
