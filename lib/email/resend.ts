// Email service using Resend (Modern alternative)
// Install: npm install resend

import { Resend } from 'resend'

// Set your Resend API key in .env.local
// RESEND_API_KEY=re_your_api_key_here
// RESEND_FROM_EMAIL=noreply@sissyfantasyisland.com

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmation(orderData: {
  email: string
  orderId: string
  items: any[]
  total: number
  name: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Sissy Fantasy Island <noreply@sissyfantasyisland.com>',
      to: orderData.email,
      subject: `Order Confirmation #${orderData.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ec4899;">Thank You for Your Order!</h1>
          <p>Hi ${orderData.name},</p>
          <p>Your order has been confirmed and will be shipped discreetly.</p>
          
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> ${orderData.orderId}</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #fce7f3;">
                <th style="padding: 10px; text-align: left;">Item</th>
                <th style="padding: 10px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${orderData.items.map(item => `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #f3f4f6;">${item.name} x${item.quantity}</td>
                  <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Total</td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">$${orderData.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <p style="margin-top: 20px;">You will receive a tracking number once your order ships.</p>
          <p style="color: #6b7280; font-size: 12px;">All packages are shipped in discreet, unmarked packaging.</p>
        </div>
      `
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendNewsletterWelcome(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Sissy Fantasy Island <noreply@sissyfantasyisland.com>',
      to: email,
      subject: 'Welcome to Sissy Fantasy Island - 15% Off Your First Order!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ec4899;">Welcome to Sissy Fantasy Island!</h1>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>Use code <strong style="color: #ec4899;">WELCOME15</strong> for 15% off your first order.</p>
          <a href="https://sissyfantasyisland.com" style="display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">Shop Now</a>
          <p style="color: #6b7280; font-size: 12px;">You're receiving this because you subscribed to our newsletter.</p>
        </div>
      `
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}
