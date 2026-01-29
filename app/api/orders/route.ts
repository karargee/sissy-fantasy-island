import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { customer, cart, totals } = await request.json()

    const emailHtml = `
      <h2>NEW ORDER RECEIVED</h2>
      
      <h3>Customer Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</li>
        <li><strong>Email:</strong> ${customer.email}</li>
        <li><strong>Address:</strong> ${customer.address}, ${customer.city}, ${customer.state} ${customer.zipCode}</li>
      </ul>
      
      <h3>Order Items:</h3>
      <ul>
        ${cart.map((item: any) => `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
      </ul>
      
      <h3>Order Summary:</h3>
      <ul>
        <li>Subtotal: $${totals.subtotal.toFixed(2)}</li>
        <li>Shipping: $${totals.shipping.toFixed(2)}</li>
        <li>Tax: $${totals.tax.toFixed(2)}</li>
        <li><strong>Total: $${totals.total.toFixed(2)}</strong></li>
      </ul>
      
      <p><strong>Payment Method:</strong> Bitcoin (Pending)</p>
    `

    await resend.emails.send({
      from: 'orders@resend.dev',
      to: 'sissyfantasyisland@gmail.com',
      subject: `New Order - ${customer.firstName} ${customer.lastName} - $${totals.total.toFixed(2)}`,
      html: emailHtml,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 })
  }
}
