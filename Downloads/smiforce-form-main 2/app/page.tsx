"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [showForm, setShowForm] = useState(false)
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
      if (personalDomains.includes(emailDomain as string)) {
        newErrors.email = "Please use a business email address"
      }
    }

    setErrors(newErrors)
    return !newErrors.fullName && !newErrors.email
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        console.error("Failed to send email", await res.text())
      }
    } catch (err) {
      console.error("Error calling /api/send-email", err)
    }

    const pdfUrl = "/pdf.pdf"
    try {
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
        setTimeout(() => {
          document.body.removeChild(link)
          window.URL.revokeObjectURL(blobUrl)
        }, 100)
      } else {
        throw new Error("Fetch failed")
      }
    } catch (error) {
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
      } catch (directError) {
        console.error("PDF download failed:", directError)
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 800))

    setFormData({ fullName: "", email: "", phoneNumber: "" })
    setErrors({ fullName: "", email: "" })
    setIsSubmitting(false)
    setShowForm(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if ((errors as any)[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full my-0 px-0 py-[10px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch w-full">
          {/* Left side - Image */}
          <div className="relative flex h-full transition-transform">
            <Image
              src="https://22527425.fs1.hubspotusercontent-na2.net/hubfs/22527425/Intellectus/Screenshot%202025-10-28%20at%201.01.56%20PM.png"
              alt="SmiForce CIO & CISO AI Reporting Dashboard"
              width={800}
              height={600}
              className="w-full h-auto max-w-none"
              priority
            />
          </div>

          {/* Right side - Content */}
          <div className={`space-y-5 lg:space-y-6 xl:space-y-7 flex flex-col h-full justify-start lg:justify-center pl-[10px] pr-[10px] lg:pl-0 lg:pr-0 ${showForm ? "pt-0 lg:pt-0" : "pt-10 lg:pt-0"}`}>
            {!showForm && (
              <>
                <h1 className="text-xl lg:text-[24px] xl:text-[26px] font-bold leading-tight">
                  Transform Data into <span className="text-[#C4342B]">Strategic</span>
                  <br />
                  <span className="text-[#C4342B]">Insights with SmiForce</span>
                </h1>

                <p className="text-[15px] lg:text-[15px] xl:text-[16px] text-gray-700 leading-relaxed">
                  SmiForce's AI-powered CIO & CISO Reporting Dashboard overcomes
                  <br className="hidden lg:block" />
                  data fragmentation, enhances visibility, and automates reporting,
                  <br className="hidden lg:block" />
                   delivering actionable insights to drive smarter decisions and boost operational
                   <br className="hidden lg:block" />
                  efficiency.
                </p>

                <p className="text-[15px] lg:text-[15px] xl:text-[16px] text-gray-700 leading-relaxed">
                  Download the Solution Brief to Discover How SmiForce Can Drive Your Data Strategy!
                </p>

                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-[#C4342B] hover:bg-[#A02D24] text-white px-7 py-5 lg:px-7 lg:py-5 xl:px-7 xl:py-5 text-base lg:text-[15px] xl:text-[16px] font-semibold w-fit"
                  size="lg"
                >
                  DOWNLOAD NOW
                </Button>
              </>
            )}

            {showForm && (
              <Card className="w-full max-h-[calc(100vh-100px)] lg:h-[calc(100%_-_120px)] mt-[-30px] mb-[12px] lg:mt-[55px] lg:mb-[65px] border border-gray-200 shadow-md flex flex-col overflow-y-auto">
                <CardHeader className="pb-2 lg:pb-4">
                  <CardTitle className="text-2xl">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4342B] to-[#A02D24]">
                      Download Solution Brief
                    </span>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Please fill in your details to download the SmiForce solution brief.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-800">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleChange("fullName", e.target.value)}
                          placeholder="Enter your full name"
                          className={`${errors.fullName ? "border-red-500" : ""} focus-visible:ring-[#C4342B] focus-visible:border-[#C4342B]`}
                        />
                        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-800">
                          Business Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="name@company.com"
                          className={`${errors.email ? "border-red-500" : ""} focus-visible:ring-[#C4342B] focus-visible:border-[#C4342B]`}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                      </div>

                      <div className="space-y-2 lg:col-span-2">
                        <Label htmlFor="phoneNumber" className="text-gray-800">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleChange("phoneNumber", e.target.value)}
                          placeholder="Optional"
                          className="focus-visible:ring-[#C4342B] focus-visible:border-[#C4342B]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row gap-3 pt-0 lg:pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
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
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
