"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  })
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    } else {
      // Check for personal email domains
      const personalDomains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
        "aol.com",
        "icloud.com",
        "mail.com",
        "protonmail.com",
        "yandex.com",
        "zoho.com",
        "gmx.com",
        "live.com",
        "msn.com",
      ]
      const emailDomain = formData.email.split("@")[1]?.toLowerCase()

      if (personalDomains.includes(emailDomain)) {
        newErrors.email = "Please use a business email address"
      }
    }

    setErrors(newErrors)
    return !newErrors.fullName && !newErrors.email
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Send details to email first
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        console.error("Failed to send email", await res.text())
        // continue to allow download even if email fails
      }
    } catch (err) {
      console.error("Error calling /api/send-email", err)
      // continue to allow download even if email fails
    }

    // Use local PDF from public folder
    const pdfUrl = "/pdf.pdf"

    try {
      console.log("[v0] Starting PDF download...")

      // Fetch and create blob for same-origin resources
      const response = await fetch(pdfUrl)

      if (response.ok) {
        const blob = await response.blob()
        const blobUrl = window.URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = blobUrl
        link.download = "SmiForce-Solution-Brief.pdf"
        link.style.display = "none"
        document.body.appendChild(link)
        link.click()

        // Clean up
        setTimeout(() => {
          document.body.removeChild(link)
          window.URL.revokeObjectURL(blobUrl)
        }, 100)

        console.log("[v0] PDF download initiated successfully")
      } else {
        throw new Error("Fetch failed")
      }
    } catch (error) {
      console.log("[v0] Download failed, trying direct download:", error)

      // Fallback: Direct download link
      try {
        const link = document.createElement("a")
        link.href = pdfUrl
        link.download = "SmiForce-Solution-Brief.pdf"
        link.target = "_blank"
        link.rel = "noopener noreferrer"
        link.style.display = "none"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        console.log("[v0] PDF download initiated via direct link")
      } catch (directError) {
        console.error("[v0] PDF download failed:", directError)
      }
    }

    // Wait a moment before closing to ensure download starts
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Reset form and close modal
    setFormData({ fullName: "", email: "", phoneNumber: "" })
    setErrors({ fullName: "", email: "" })
    setIsSubmitting(false)
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Download Solution Brief</DialogTitle>
          <DialogDescription>Please fill in your details to download the SmiForce solution brief.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your business email"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#C4342B] hover:bg-[#A02D24]" disabled={isSubmitting}>
              {isSubmitting ? "Downloading..." : "Download"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
