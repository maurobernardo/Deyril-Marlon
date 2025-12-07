# 🚨 Solução Imediata para o Erro Gmail API

Baseado na tela que você está vendo no EmailJS Dashboard, siga estes passos:

## ✅ Solução Passo a Passo (Na Tela Atual)

### Passo 1: Desconectar o Gmail
1. Na tela "Edit Service" que você está vendo
2. Clique no botão **"Disconnect"** (ao lado de "Connected as deyrilibraimo@gmail.com")
3. Aguarde a confirmação de desconexão

### Passo 2: Reconectar com Permissões Corretas
1. Após desconectar, você verá um botão para conectar novamente
2. Clique em **"Connect"** ou **"Connect Gmail"**
3. **IMPORTANTE**: Quando o Google pedir permissões, certifique-se de:
   - ✅ Marcar **"Send email on your behalf"** (Enviar email em seu nome)
   - ✅ Aceitar **TODAS** as permissões solicitadas
   - ❌ **NÃO** cancele ou feche a janela sem aceitar todas as permissões

### Passo 3: Verificar a Conexão
1. Após reconectar, você deve ver "Connected as deyrilibraimo@gmail.com" novamente
2. O checkbox "Send test email to verify configuration" deve estar marcado
3. Clique em **"Update Service"** (botão azul no final)
4. Se aparecer um erro de teste, continue para a Solução Alternativa abaixo

---

## 🔄 Solução Alternativa: Usar SMTP (Se OAuth Não Funcionar)

Se após reconectar o erro persistir, configure via SMTP:

### Passo 1: Criar Senha de App do Gmail

1. Abra uma nova aba e acesse: https://myaccount.google.com/security
2. Certifique-se de que a **Verificação em duas etapas** está ativada
3. Role até encontrar **"Senhas de app"** (App Passwords)
4. Clique em **"Selecionar app"** → escolha **"Email"**
5. Clique em **"Selecionar dispositivo"** → escolha **"Outro (Personalizado)"**
6. Digite: `EmailJS`
7. Clique em **"Gerar"**
8. **Copie a senha de 16 caracteres** (exemplo: `abcd efgh ijkl mnop`)

### Passo 2: Criar Novo Serviço SMTP no EmailJS

1. No EmailJS Dashboard, feche a tela "Edit Service" atual
2. Vá para **Email Services** (menu lateral)
3. Clique em **"Add New Service"**
4. Selecione **"SMTP"** (não escolha Gmail OAuth)
5. Preencha os campos:
   - **Name**: `Gmail SMTP`
   - **Host**: `smtp.gmail.com`
   - **Port**: `587`
   - **Username**: `deyrilibraimo@gmail.com`
   - **Password**: Cole a senha de app de 16 caracteres (sem espaços)
   - **Secure**: Selecione **"TLS"**
6. Clique em **"Create Service"**
7. **Copie o novo Service ID** que será gerado (será algo como `service_xxxxxxx`)

### Passo 3: Atualizar o Projeto

1. Abra o arquivo `.env.local` na raiz do seu projeto
2. Atualize a linha:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   ```
   (substitua `service_xxxxxxx` pelo novo Service ID do SMTP)
3. Salve o arquivo
4. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Teste o formulário novamente

---

## ⚠️ Por Que Isso Acontece?

O erro "Request had insufficient authentication scopes" ocorre quando:
- O Google não concedeu todas as permissões necessárias durante a conexão OAuth
- As permissões foram revogadas posteriormente
- Há um problema com a configuração OAuth no Google Cloud Console

**A solução SMTP é mais confiável** porque não depende de OAuth e usa autenticação direta.

---

## 📋 Checklist Rápido

- [ ] Desconectei o Gmail no EmailJS
- [ ] Reconectei aceitando TODAS as permissões
- [ ] Testei novamente e ainda deu erro
- [ ] Criei uma Senha de App do Gmail
- [ ] Criei um novo serviço SMTP no EmailJS
- [ ] Atualizei o `.env.local` com o novo Service ID
- [ ] Reiniciei o servidor (`npm run dev`)
- [ ] Testei o formulário e funcionou! ✅

---

## 💡 Dica

Se você quiser manter o serviço Gmail OAuth atual funcionando, pode tentar:
1. Desconectar completamente
2. Limpar o cache do navegador
3. Reconectar em uma janela anônima/privada
4. Aceitar todas as permissões sem pular nenhuma etapa

Mas a solução SMTP é geralmente mais estável e confiável para produção.











