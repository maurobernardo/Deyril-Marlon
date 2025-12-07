# 🚀 Como Configurar EmailJS no Vercel

## ⚠️ Erro Atual
Se você está vendo a mensagem: **"EmailJS não está configurado. Por favor, configure as variáveis de ambiente."**

Isso significa que as variáveis de ambiente do EmailJS não estão configuradas no Vercel.

---

## 📋 Passo a Passo para Configurar

### 1. Obter as Credenciais do EmailJS

Se você ainda não tem as credenciais do EmailJS:

1. Acesse [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Faça login na sua conta
3. Vá para **Account** → **General** para ver sua **Public Key**
4. Vá para **Email Services** para ver seu **Service ID**
5. Vá para **Email Templates** para ver seu **Template ID**

### 2. Configurar Variáveis no Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto (`deyril-marlon`)
3. Vá para **Settings** (Configurações)
4. Clique em **Environment Variables** (Variáveis de Ambiente)
5. Adicione as seguintes 3 variáveis:

#### Variável 1: Service ID
- **Name:** `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- **Value:** `service_xxxxxxx` (seu Service ID do EmailJS)
- **Environment:** Selecione todas: ☑ Production ☑ Preview ☑ Development
- Clique em **Save**

#### Variável 2: Template ID
- **Name:** `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- **Value:** `template_xxxxxxx` (seu Template ID do EmailJS)
- **Environment:** Selecione todas: ☑ Production ☑ Preview ☑ Development
- Clique em **Save**

#### Variável 3: Public Key
- **Name:** `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- **Value:** `xxxxxxx` (sua Public Key do EmailJS)
- **Environment:** Selecione todas: ☑ Production ☑ Preview ☑ Development
- Clique em **Save**

### 3. Fazer Redeploy

**IMPORTANTE:** Após adicionar as variáveis, você DEVE fazer um redeploy:

1. No Vercel Dashboard, vá para a aba **Deployments**
2. Encontre o último deployment
3. Clique nos **três pontos (...)** no canto superior direito
4. Selecione **Redeploy**
5. Aguarde o deploy terminar (1-2 minutos)

### 4. Verificar se Funcionou

1. Acesse seu site: `https://deyril-marlon.vercel.app`
2. Vá para a seção de contato
3. Tente enviar uma mensagem de teste
4. Se não aparecer mais o erro, está funcionando! ✅

---

## 🔍 Como Encontrar Suas Credenciais no EmailJS

### Public Key
1. EmailJS Dashboard → **Account** → **General**
2. Procure por **Public Key**
3. Copie o valor (exemplo: `faXZSI8geToY0rfbG`)

### Service ID
1. EmailJS Dashboard → **Email Services**
2. Clique no serviço que você está usando
3. O **Service ID** aparece no topo (exemplo: `service_5leerb5`)

### Template ID
1. EmailJS Dashboard → **Email Templates**
2. Clique no template que você está usando
3. O **Template ID** aparece no topo (exemplo: `template_eaq77dp`)

---

## ⚠️ Problemas Comuns

### Erro persiste após configurar
- Verifique se você fez o **Redeploy** após adicionar as variáveis
- Verifique se os valores estão corretos (sem espaços extras)
- Verifique se selecionou todos os ambientes (Production, Preview, Development)

### Não tenho conta no EmailJS
1. Acesse [EmailJS](https://www.emailjs.com)
2. Crie uma conta gratuita
3. Siga o guia em `CONTACT_FORM_SETUP.md` para configurar o serviço

### Não sei qual Service ID usar
- Se você já configurou o EmailJS antes, use o mesmo Service ID do seu arquivo `.env.local` local
- Se não tem, você precisa criar um serviço no EmailJS primeiro

---

## 📝 Exemplo de Valores

Se você já configurou localmente, use os mesmos valores do seu arquivo `.env.local`:

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=faXZSI8geToY0rfbG
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_5leerb5
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_eaq77dp
```

**Copie esses valores exatamente como estão** (sem aspas, sem espaços extras).

---

## ✅ Checklist

- [ ] Tenho as 3 credenciais do EmailJS (Public Key, Service ID, Template ID)
- [ ] Adicionei as 3 variáveis no Vercel
- [ ] Marquei todos os ambientes (Production, Preview, Development)
- [ ] Fiz o Redeploy no Vercel
- [ ] Testei o formulário de contato e não aparece mais o erro

---

## 🆘 Precisa de Ajuda?

Se ainda tiver problemas:
1. Verifique o arquivo `CONTACT_FORM_SETUP.md` para configurar o EmailJS do zero
2. Verifique o arquivo `DEPLOY_VERCEL.md` para mais detalhes sobre deploy
3. Certifique-se de que o serviço está ativo no EmailJS Dashboard










