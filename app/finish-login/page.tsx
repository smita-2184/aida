"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function FinishLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [verificationSuccess, setVerificationSuccess] = useState(false)

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("emailForSignIn")
    if (savedEmail) {
      setEmail(savedEmail)
    }

    if (isSignInWithEmailLink(auth, window.location.href)) {
      setVerificationSuccess(true)
      if (!savedEmail) {
        // User opened the link on a different device.
        // To prevent session fixation attacks, ask for email again.
        return
      }
      
      setLoading(true)
      signInWithEmailLink(auth, savedEmail, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn")
          router.push("/") // Redirect to dashboard on success
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please provide your email to complete sign-in.")
      return
    }
    setLoading(true)
    signInWithEmailLink(auth, email, window.location.href)
      .then(() => {
        window.localStorage.removeItem("emailForSignIn")
        router.push("/")
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Signing you in...</p>
      </div>
    )
  }
  
  if (verificationSuccess && !email) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-muted/40">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Confirm Email</CardTitle>
            <CardDescription>
              To complete your sign-in, please provide your email address again for verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Complete Sign-In</Button>
              {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Verifying your sign-in link...</p>
      {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
    </div>
  )
} 