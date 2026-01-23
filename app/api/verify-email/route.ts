import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const verificationCodes = new Map<string, { code: string, expires: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email, action, code } = await request.json()

    if (action === 'send') {
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
      const expires = Date.now() + 10 * 60 * 1000

      verificationCodes.set(email, { code: verificationCode, expires })

      // Send email with SendGrid
      const msg = {
        to: email,
        from: process.env.FROM_EMAIL!,
        subject: 'Verify Your Email - Sissy Fantasy Island',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ec4899;">Email Verification</h2>
            <p>Your verification code is:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${verificationCode}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
          </div>
        `
      }

      await sgMail.send(msg)
      return NextResponse.json({ success: true, message: 'Verification code sent' })
    }

    if (action === 'verify') {
      const stored = verificationCodes.get(email)

      if (!stored || Date.now() > stored.expires) {
        verificationCodes.delete(email)
        return NextResponse.json({ success: false, message: 'Code expired or not found' })
      }

      if (stored.code === code) {
        verificationCodes.delete(email)
        return NextResponse.json({ success: true, message: 'Email verified' })
      } else {
        return NextResponse.json({ success: false, message: 'Invalid code' })
      }
    }

    return NextResponse.json({ success: false, message: 'Invalid action' })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 })
  }
}