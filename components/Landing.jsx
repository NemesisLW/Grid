import React from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
const Landing = () => {
  return (
    <div>
        <Label htmlFor="terms">We Made a avatar for you </Label>
        <Button variant="link"> <Link href="/avatar">Check Avatar</Link></Button>

    </div>
  )
}

export default Landing