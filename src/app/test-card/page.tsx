"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TestCardPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Card Component Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Card 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a test card to verify the card component is working correctly.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Card 2</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Another test card with different content.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Card 3</CardTitle>
          </CardHeader>
          <CardContent>
            <p>A third test card to ensure multiple instances work.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
