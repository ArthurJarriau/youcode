'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginButton } from '@/features/auth/LoginButton'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
   
    console.error(error)
  }, [error])
 
  return (
    <Card className="max-w-lg m-auto mt-4">
        <CardHeader>
            <CardTitle> You need to be logged in to view this page.</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Something went wrong.</p>
            <p>
            <strong>{error.message}</strong>
            </p>
        </CardContent>
        <CardFooter>
            <LoginButton />
        </CardFooter>
    </Card>
  )
}