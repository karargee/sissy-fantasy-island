import { NextRequest, NextResponse } from 'next/server'
import { sendNewsletterWelcome } from '@/lib/email/sendgrid'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    // Save email to database (optional)
    // await db.newsletter.create({ data: { email } })

    // Send welcome email
    const result = await sendNewsletterWelcome(email)
    if (!result.success) {
      throw new Error('Failed to send email')
    }

    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed to newsletter' 
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
