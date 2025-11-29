# Configuração do Formulário de Contato

O formulário de contato está funcional e pronto para uso. **EmailJS está implementado** e configurado para enviar emails diretamente do cliente.

## Estado Atual

- ✅ Formulário funcional com validação
- ✅ EmailJS implementado e configurado
- ✅ Tratamento de erros implementado
- ✅ Mensagens de sucesso/erro traduzidas
- ✅ Template HTML completo com todos os campos
- ⚠️ **Ação necessária:** Crie o arquivo `.env.local` com suas credenciais do EmailJS (veja instruções abaixo)

## Como Configurar o Envio de Email

Para enviar emails reais, você precisa integrar um serviço de email. Aqui estão algumas opções:

### Opção 1: Resend (Recomendado - Fácil e Gratuito)

1. Crie uma conta em [Resend](https://resend.com)
2. Obtenha sua API Key
3. Instale o pacote:
```bash
npm install resend
```

4. Adicione a variável de ambiente no arquivo `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

5. Descomente e atualize o código em `app/api/contact/route.ts`:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'onboarding@resend.dev', // Use seu domínio verificado
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
```

### Opção 2: Nodemailer (Gmail, Outlook, etc.)

1. Instale o pacote:
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

2. Configure as variáveis de ambiente no `.env.local`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
```

3. Atualize `app/api/contact/route.ts` para usar Nodemailer.

### Opção 3: Formspree (Mais Simples - Sem Backend)

1. Crie uma conta em [Formspree](https://formspree.io)
2. Crie um novo formulário
3. Atualize `components/Contact.tsx` para enviar diretamente para o endpoint do Formspree:
```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
})
```

### Opção 4: EmailJS (Cliente-Side) ✅ IMPLEMENTADO

1. Crie uma conta em [EmailJS](https://www.emailjs.com)
2. Após criar a conta, vá para **Email Services** e adicione um serviço de email (Gmail, Outlook, etc.)
3. Vá para **Email Templates** e crie um novo template com as seguintes variáveis:
   - `{{title}}` - Assunto da mensagem (usado no Subject)
   - `{{name}}` - Nome completo do remetente
   - `{{email}}` - Email do remetente (usado no Reply To)
   - `{{from_name}}` - Nome completo do remetente (usado no From Name)
   - `{{from_email}}` - Email do remetente
   - `{{phone}}` - Número de telefone
   - `{{subject}}` - Assunto da mensagem
   - `{{message}}` - Mensagem completa
   - `{{time}}` - Data e hora do envio
   - `{{to_email}}` - Email do destinatário (deyrilibraimo@gmail.com)

4. Template HTML completo (copie e cole no EmailJS):
   
   O template HTML completo está disponível no arquivo `EMAILJS_TEMPLATE.html` na raiz do projeto.
   
   Este template inclui **todos os campos do formulário**:
   - Nome completo
   - Email
   - Telefone
   - Assunto
   - Mensagem
   - Data e hora
   
   O template está formatado de forma profissional e responsiva, pronto para uso no EmailJS.

**Configurações do Template:**
- **Subject:** `Contact Us: {{title}}`
- **To Email:** `deyrilibraimo@gmail.com`
- **From Name:** `{{from_name}}`
- **From Email:** (Use Default Email Address - marcado)
- **Reply To:** `{{from_email}}` ✅ (Pode deixar assim - o código envia o email do remetente)

5. Vá para **Account** > **General** e copie sua **Public Key**

6. Crie um arquivo `.env.local` na raiz do projeto (se não existir) e adicione:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
```

7. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

**Nota:** O pacote `@emailjs/browser` já está instalado e o componente `Contact.tsx` já está configurado para usar EmailJS.

## Testando o Formulário

1. Configure as variáveis de ambiente do EmailJS (veja instruções na Opção 4 acima)
2. Reinicie o servidor de desenvolvimento: `npm run dev`
3. Preencha todos os campos do formulário
4. Clique em "Enviar Mensagem"
5. Você receberá os emails em `deyrilibraimo@gmail.com`

**Nota:** Se as variáveis de ambiente não estiverem configuradas, você verá uma mensagem de erro ao tentar enviar.

## Estrutura dos Dados

O formulário envia os seguintes dados:
- `nome`: Primeiro nome
- `apelido`: Sobrenome
- `email`: Email do remetente
- `assunto`: Assunto da mensagem
- `contacto`: Número de telefone
- `mensagem`: Mensagem completa

## Notas Importantes

- ✅ EmailJS está implementado e pronto para uso
- ⚠️ **Configure as variáveis de ambiente** do EmailJS para ativar o envio de emails
- ✅ O formulário está totalmente funcional e validado
- ✅ Mensagens de erro e sucesso estão traduzidas (PT/EN)
- ✅ Envio de email funciona diretamente do cliente (não precisa de servidor backend)

## Variáveis de Ambiente Necessárias

Crie um arquivo `.env.local` na raiz do projeto com:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
```

**Exemplo de arquivo `.env.local` (baseado na sua configuração):**
```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=faXZSI8geToY0rfbG
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_5leerb5
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_eaq77dp
```

**Onde encontrar essas informações:**
- **Public Key**: Account > General > Public Key (ex: `faXZSI8geToY0rfbG`)
- **Service ID**: Email Services > Seu serviço > Service ID (ex: `service_5leerb5`)
- **Template ID**: Email Templates > Seu template > Template ID (ex: `template_eaq77dp`)

**Nota:** Um arquivo `.env.local.example` está disponível na raiz do projeto como referência.

## 🔧 Solução de Problemas

### Erro: "Gmail_API: Request had insufficient authentication scopes"

Este erro ocorre quando o serviço Gmail no EmailJS não tem as permissões OAuth corretas configuradas. Aqui estão as soluções:

#### Solução 1: Reconfigurar o Serviço Gmail no EmailJS (Recomendado)

1. Acesse o [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Vá para **Email Services**
3. Clique no serviço Gmail que está usando
4. Clique em **Reconnect** ou **Re-authenticate**
5. Certifique-se de conceder **todas as permissões** solicitadas pelo Google:
   - ✅ Enviar emails em seu nome
   - ✅ Acessar informações básicas da conta
6. Salve as alterações
7. Teste novamente o formulário

#### Solução 2: Usar um Serviço de Email Diferente no EmailJS

Se o problema persistir com Gmail, você pode usar outro serviço:

**Opção A: Outlook/Office 365**
1. No EmailJS Dashboard, vá para **Email Services**
2. Clique em **Add New Service**
3. Selecione **Outlook**
4. Siga as instruções de autenticação
5. Atualize o `NEXT_PUBLIC_EMAILJS_SERVICE_ID` no `.env.local`

**Opção B: SendGrid**
1. No EmailJS Dashboard, vá para **Email Services**
2. Clique em **Add New Service**
3. Selecione **SendGrid**
4. Configure com sua API Key do SendGrid
5. Atualize o `NEXT_PUBLIC_EMAILJS_SERVICE_ID` no `.env.local`

**Opção C: SMTP Genérico**
1. No EmailJS Dashboard, vá para **Email Services**
2. Clique em **Add New Service**
3. Selecione **SMTP**
4. Configure com suas credenciais SMTP:
   - Host: `smtp.gmail.com` (ou outro servidor SMTP)
   - Port: `587`
   - Username: Seu email
   - Password: Senha de app do Gmail (não sua senha normal)
5. Atualize o `NEXT_PUBLIC_EMAILJS_SERVICE_ID` no `.env.local`

#### Solução 3: Criar uma Senha de App do Gmail (Para SMTP)

Se você optar por usar SMTP com Gmail:

1. Acesse [Google Account Security](https://myaccount.google.com/security)
2. Ative a **Verificação em duas etapas** (se ainda não estiver ativada)
3. Vá para **Senhas de app**
4. Selecione **Email** e **Outro (Personalizado)**
5. Digite "EmailJS" como nome
6. Copie a senha gerada (16 caracteres)
7. Use essa senha no serviço SMTP do EmailJS

#### Solução 4: Verificar Permissões OAuth no Google Cloud Console

Se você configurou o Gmail via OAuth manualmente:

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Selecione seu projeto
3. Vá para **APIs & Services** > **OAuth consent screen**
4. Certifique-se de que os seguintes escopos estão adicionados:
   - `https://www.googleapis.com/auth/gmail.send`
   - `https://www.googleapis.com/auth/userinfo.email`
5. Vá para **APIs & Services** > **Credentials**
6. Verifique se as credenciais OAuth estão corretas
7. Re-autorize o serviço no EmailJS

### Outros Erros Comuns

**Erro: "EmailJS configuration is incomplete"**
- Verifique se todas as variáveis de ambiente estão configuradas no `.env.local`
- Reinicie o servidor de desenvolvimento após adicionar as variáveis

**Erro: "Service ID not found"**
- Verifique se o `NEXT_PUBLIC_EMAILJS_SERVICE_ID` está correto
- Certifique-se de que o serviço está ativo no EmailJS Dashboard

**Erro: "Template ID not found"**
- Verifique se o `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` está correto
- Certifique-se de que o template está publicado no EmailJS Dashboard

