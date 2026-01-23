// Email service using SendGrid
// Install: npm install @sendgrid/mail

import sgMail from '@sendgrid/mail'

// Set your SendGrid API key in .env.local
// SENDGRID_API_KEY=your_api_key_here
// SENDGRID_FROM_EMAIL=noreply@sissyfantasyisland.com

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function sendOrderConfirmation(orderData: {
  email: string
  orderId: string
  items: any[]
  total: number
  name: string
}) {
  const msg = {
    to: orderData.email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@sissyfantasyisland.com',
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
  }

  try {
    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendNewsletterWelcome(email: string) {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@sissyfantasyisland.com',
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
  }

  try {
    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendContactFormNotification(data: {
  name: string
  email: string
  message: string
}) {
  const msg = {
    to: 'support@sissyfantasyisland.com', // Your support email
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@sissyfantasyisland.com',
    replyTo: data.email,
    subject: `Contact Form: ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      </div>
    `
  }

  try {
    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}
