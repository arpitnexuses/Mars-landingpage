"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function RegistrationForm() {
  const [referredBy, setReferredBy] = useState<string>("")
  const [showOtherField, setShowOtherField] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [membershipNotice, setMembershipNotice] = useState("")
  const [isReferralSubmitted, setIsReferralSubmitted] = useState(false)
  const [isReferredByOpen, setIsReferredByOpen] = useState(false)
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    emailInvalid: false,
    companyName: false,
    interests: false,
    organizationName: false,
  })

  const handleReferredByChange = (value: string) => {
    const nextValue = referredBy === value ? "" : value
    setReferredBy(nextValue)
    setShowOtherField(nextValue === "Other")
    setMembershipNotice("")
    setIsReferralSubmitted(false)
  }

  const handlePayment = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Find the form element
    const form = (e.target as HTMLElement).closest('form') as HTMLFormElement
    if (!form) return
    
    setIsSubmitting(true)

    const formData = new FormData(form)

    // Get all form values
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const delegate = formData.get("delegate") === "on"
    const sponsor = formData.get("sponsor") === "on"
    const companyName = formData.get("companyName") as string
    const message = formData.get("message") as string
    const organizationName = formData.get("organizationName") as string

    // Validate mandatory fields
    const orgNameRequired = referredBy === "Other"
    const nextErrors = {
      firstName: !firstName || firstName.trim().length === 0,
      lastName: !lastName || lastName.trim().length === 0,
      email: !email || email.trim().length === 0,
      emailInvalid: false,
      companyName: !companyName || companyName.trim().length === 0,
      interests: !delegate && !sponsor,
      organizationName: orgNameRequired && (!organizationName || organizationName.trim().length === 0),
    }
    // email format validation only if email present
    if (!nextErrors.email) {
      const emailPattern = /^\S+@\S+\.[\S]+$/
      nextErrors.emailInvalid = !emailPattern.test(email)
    }
    setErrors(nextErrors)

    if (nextErrors.firstName) {
      toast.error("First Name is required")
      setIsSubmitting(false)
      return
    }
    if (nextErrors.lastName) {
      toast.error("Last Name is required")
      setIsSubmitting(false)
      return
    }
    if (nextErrors.email) {
      toast.error("Email is required")
      setIsSubmitting(false)
      return
    }
    if (nextErrors.emailInvalid) {
      toast.error("Enter a valid email address")
      setIsSubmitting(false)
      return
    }
    if (nextErrors.companyName) {
      toast.error("Company Name is required")
      setIsSubmitting(false)
      return
    }
    if (nextErrors.interests) {
      toast.error("Please select at least one option under 'I'm interested in'")
      setIsSubmitting(false)
      return
    }
    if (nextErrors.organizationName) {
      toast.error("Organization Name is required when referred by 'Other'")
      setIsSubmitting(false)
      return
    }

    // Collect interests
    const interests: string[] = []
    if (delegate) interests.push("Join as a Delegate")
    if (sponsor) interests.push("Join as Sponsor Partner")

    const payload = {
      firstName,
      lastName,
      email,
      interests,
      companyName,
      referredBy,
      organizationName: organizationName || "",
      message: message || "",
    }

    try {
      // Always submit the form to backend
      const res = await fetch('/api/send-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || json.success === false) {
        throw new Error(json.error || 'Failed to submit form')
      }

      if (referredBy) {
        // Do not redirect to payment; show notice
        setMembershipNotice("We will verify your membership status and contact you within three business days.")
        toast.success('Submitted successfully')
        setIsSubmitting(false)
        setIsReferralSubmitted(true)
        return
      }

      // Persist payload for use after payment success
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('registrationPayload', JSON.stringify(payload))
      }

      // Redirect to payment page
      window.location.href = "https://payments.foloosi.com/pay/FLSPRD009290101760468755?submissionGuid=3bf10454-739e-40f5-a0bc-c5f162c8dd47"
    } catch (error) {
      console.error("Error preparing payment:", error)
      toast.error("An error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-12 shadow-sm border-2" style={{ borderColor: '#FF530A' }}>
        <form className="space-y-5">
          {/* First Name and Last Name */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm text-foreground">
                First Name<span className="text-red-600">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                className={`h-11 border-input bg-white focus:border-[#FF530A] focus-visible:ring-[#FF530A] ${errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                onChange={() => setErrors((prev) => ({ ...prev, firstName: false }))}
              />
              {errors.firstName && (
                <p className="text-xs text-red-600">First Name is required.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm text-foreground">
                Last Name<span className="text-red-600">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                className={`h-11 border-input bg-white focus:border-[#FF530A] focus-visible:ring-[#FF530A] ${errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                onChange={() => setErrors((prev) => ({ ...prev, lastName: false }))}
              />
              {errors.lastName && (
                <p className="text-xs text-red-600">Last Name is required.</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-foreground">
              Email<span className="text-red-600">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className={`h-11 border-input bg-white focus:border-[#FF530A] focus-visible:ring-[#FF530A] ${(errors.email || errors.emailInvalid) ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              onChange={() => setErrors((prev) => ({ ...prev, email: false, emailInvalid: false }))}
            />
            {errors.email && (
              <p className="text-xs text-red-600">Email is required.</p>
            )}
            {!errors.email && errors.emailInvalid && (
              <p className="text-xs text-red-600">Enter a valid email address.</p>
            )}
          </div>

          {/* I'm interested in */}
          <div className={`space-y-3 ${errors.interests ? 'border border-red-500 rounded-md p-3' : ''}`}>
            <Label className="text-sm text-foreground">
              I'm interested in<span className="text-red-600">*</span>
            </Label>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-2 rounded-md">
                <Checkbox id="delegate" name="delegate" onCheckedChange={() => setErrors((prev) => ({ ...prev, interests: false }))} />
                <label
                  htmlFor="delegate"
                  className="text-sm text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Join as a Delegate
                </label>
              </div>
              <div className="flex items-center gap-2 rounded-md">
                <Checkbox id="sponsor" name="sponsor" onCheckedChange={() => setErrors((prev) => ({ ...prev, interests: false }))} />
                <label
                  htmlFor="sponsor"
                  className="text-sm text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Join as Sponsor Partner
                </label>
              </div>
            </div>
            {errors.interests && (
              <p className="text-xs text-red-600">Select at least one option.</p>
            )}
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm text-foreground">
              Company Name<span className="text-red-600">*</span>
            </Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              required
              className={`h-11 border-input bg-white focus:border-[#FF530A] focus-visible:ring-[#FF530A] ${errors.companyName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              onChange={() => setErrors((prev) => ({ ...prev, companyName: false }))}
            />
            {errors.companyName && (
              <p className="text-xs text-red-600">Company Name is required.</p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="referredBy" className="text-sm text-foreground">
                Referred by
              </Label>
              <Select onValueChange={handleReferredByChange} value={referredBy} open={isReferredByOpen} onOpenChange={setIsReferredByOpen}>
              <SelectTrigger className="h-11 w-full border-input bg-white focus:border-[#FF530A] focus-visible:ring-[#FF530A]">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="MEDC"
                    onMouseDown={(e) => {
                      if (referredBy === "MEDC") {
                        e.preventDefault()
                        setReferredBy("")
                        setShowOtherField(false)
                        setIsReferredByOpen(false)
                      }
                    }}
                  >
                    MEDC
                  </SelectItem>
                  <SelectItem
                    value="SCGT"
                    onMouseDown={(e) => {
                      if (referredBy === "SCGT") {
                        e.preventDefault()
                        setReferredBy("")
                        setShowOtherField(false)
                        setIsReferredByOpen(false)
                      }
                    }}
                  >
                    SCGT
                  </SelectItem>
                  <SelectItem
                    value="MEA"
                    onMouseDown={(e) => {
                      if (referredBy === "MEA") {
                        e.preventDefault()
                        setReferredBy("")
                        setShowOtherField(false)
                        setIsReferredByOpen(false)
                      }
                    }}
                  >
                    MEA
                  </SelectItem>
                  <SelectItem
                    value="GIBF"
                    onMouseDown={(e) => {
                      if (referredBy === "GIBF") {
                        e.preventDefault()
                        setReferredBy("")
                        setShowOtherField(false)
                        setIsReferredByOpen(false)
                      }
                    }}
                  >
                    GIBF
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    onMouseDown={(e) => {
                      if (referredBy === "Other") {
                        e.preventDefault()
                        setReferredBy("")
                        setShowOtherField(false)
                        setIsReferredByOpen(false)
                      }
                    }}
                  >
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Organization Name (shown on right when Other is selected) */}
            {showOtherField && (
              <div className="space-y-2">
                <Label htmlFor="organizationName" className="text-sm text-foreground">
                  Organization Name<span className="text-red-600">*</span>
                </Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  required
                  className={`h-11 border-input bg-white focus:border-[#FF530A] focus-visible:ring-[#FF530A] ${errors.organizationName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  onChange={() => setErrors((prev) => ({ ...prev, organizationName: false }))}
                  placeholder="Enter organization name"
                />
                {errors.organizationName && (
                  <p className="text-xs text-red-600">Organization Name is required.</p>
                )}
              </div>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm text-foreground">
              Message
            </Label>
            <Textarea id="message" name="message" rows={5} className="resize-none border-input bg-white focus:border-[#FF530A] focus-visible:ring-[#FF530A]" />
          </div>

          <div className="flex justify-end md:justify-end pt-4">
            <Button
              type="button"
              onClick={handlePayment}
              disabled={isSubmitting || (Boolean(referredBy) && isReferralSubmitted)}
              className="w-full md:w-auto h-12 bg-[#4A5568] px-[57px] text-white hover:bg-[#3A4558] disabled:opacity-50 text-lg"
            >
              {isSubmitting
                ? "Submitting..."
                : referredBy
                  ? (isReferralSubmitted ? "Submitted" : "Submit")
                  : "Proceed to make Payment"}
            </Button>
          </div>
          {membershipNotice && (
            <div className="pt-3">
              <div className="rounded-md border border-[#FF530A] bg-[#FFF5ED] p-4 text-center">
                <p className="text-sm text-[#FF530A]">{membershipNotice}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
