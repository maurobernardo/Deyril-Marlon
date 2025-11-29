import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, apelido, email, assunto, contacto, mensagem } = body

    // Validate required fields
    if (!nome || !apelido || !email || !assunto || !contacto || !mensagem) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Here you can integrate with an email service
    // Option 1: Use a service like Resend, SendGrid, or Nodemailer
    // Option 2: Use EmailJS (client-side) - simpler but less secure
    // Option 3: Use a form service like Formspree
    
    // For now, we'll log the data and return success
    // In production, replace this with actual email sending logic
    console.log('Contact Form Submission:', {
      nome,
      apelido,
      email,
      assunto,
      contacto,
      mensagem,
      timestamp: new Date().toISOString(),
    })

    // TODO: Replace with actual email sending service
    // Example with Resend (requires RESEND_API_KEY in .env):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'deyrilibraimo@gmail.com',
      subject: `Nova mensagem de contato: ${assunto}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${nome} ${apelido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contacto:</strong> ${contacto}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
    })
    */

    return NextResponse.json(
      { 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        success: true 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.',
        success: false 
      },
      { status: 500 }
    )
  }
}



