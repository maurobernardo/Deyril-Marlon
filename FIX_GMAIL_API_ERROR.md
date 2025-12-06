# 🔧 Como Corrigir o Erro "Gmail_API: Request had insufficient authentication scopes"

Este erro indica que o serviço Gmail no EmailJS não tem as permissões OAuth necessárias.

## ✅ Solução Rápida (5 minutos)

### Passo 1: Reautenticar o Gmail no EmailJS

1. Acesse https://dashboard.emailjs.com
2. Faça login na sua conta
3. Vá para **Email Services** (menu lateral)
4. Clique no serviço Gmail que está configurado
5. Clique no botão **"Reconnect"** ou **"Re-authenticate"**
6. Uma nova janela do Google abrirá - **aceite todas as permissões**
7. Aguarde a confirmação de sucesso
8. Teste o formulário novamente

### Passo 2: Verificar se Funcionou

1. Abra seu site em modo de desenvolvimento
2. Preencha o formulário de contato
3. Envie uma mensagem de teste
4. Se ainda der erro, continue para a Solução Alternativa abaixo

---

## 🔄 Solução Alternativa: Usar SMTP ao Invés de OAuth

Se a reautenticação não funcionar, configure o Gmail via SMTP:

### Passo 1: Criar Senha de App do Gmail

1. Acesse https://myaccount.google.com/security
2. Certifique-se de que a **Verificação em duas etapas** está ativada
3. Role até **"Senhas de app"** (ou "App passwords")
4. Clique em **"Selecionar app"** → escolha **"Email"**
5. Clique em **"Selecionar dispositivo"** → escolha **"Outro (Personalizado)"**
6. Digite: `EmailJS`
7. Clique em **"Gerar"**
8. **Copie a senha de 16 caracteres** (você precisará dela)

### Passo 2: Configurar SMTP no EmailJS

1. No EmailJS Dashboard, vá para **Email Services**
2. Clique em **"Add New Service"** ou edite o serviço existente
3. Selecione **"SMTP"** (não Gmail OAuth)
4. Preencha os campos:
   - **Service Name**: `Gmail SMTP` (ou qualquer nome)
   - **Host**: `smtp.gmail.com`
   - **Port**: `587`
   - **Username**: Seu email Gmail completo (ex: `deyrilibraimo@gmail.com`)
   - **Password**: A senha de app de 16 caracteres que você copiou
   - **Secure**: Marque como **"TLS"**
5. Clique em **"Save"**
6. Copie o novo **Service ID**

### Passo 3: Atualizar o .env.local

1. Abra o arquivo `.env.local` na raiz do projeto
2. Atualize o `NEXT_PUBLIC_EMAILJS_SERVICE_ID` com o novo Service ID do SMTP
3. Salve o arquivo
4. Reinicie o servidor: `npm run dev`
5. Teste o formulário novamente

---

## 🆘 Se Nada Funcionar: Usar Outro Serviço

### Opção 1: Outlook/Office 365 (Mais Fácil)

1. No EmailJS Dashboard, **Add New Service**
2. Selecione **"Outlook"**
3. Siga o fluxo de autenticação
4. Atualize o `NEXT_PUBLIC_EMAILJS_SERVICE_ID` no `.env.local`

### Opção 2: SendGrid (Recomendado para Produção)

1. Crie conta em https://sendgrid.com (plano gratuito disponível)
2. Gere uma API Key
3. No EmailJS, **Add New Service** → **SendGrid**
4. Configure com a API Key
5. Atualize o `NEXT_PUBLIC_EMAILJS_SERVICE_ID` no `.env.local`

---

## 📝 Checklist de Verificação

Antes de reportar que não funciona, verifique:

- [ ] O serviço está ativo no EmailJS Dashboard?
- [ ] As variáveis de ambiente estão no `.env.local` (não `.env`)?
- [ ] O servidor foi reiniciado após mudar o `.env.local`?
- [ ] O template está publicado no EmailJS?
- [ ] Você testou com todos os campos preenchidos?
- [ ] Verificou o console do navegador para mais detalhes do erro?

---

## 💡 Dica Pro

Para evitar problemas futuros, recomendo usar **SendGrid** ou **Resend** para produção, pois são mais confiáveis e não dependem de OAuth do Gmail.

Para mais informações, consulte o arquivo `CONTACT_FORM_SETUP.md`.










