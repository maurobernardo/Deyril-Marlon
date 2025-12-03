# Guia de Deploy no Vercel

Este guia irá ajudá-lo a hospedar seu portfólio no Vercel de forma rápida e fácil.

## 📋 Pré-requisitos

1. Conta no GitHub (ou GitLab/Bitbucket)
2. Conta no Vercel (gratuita)
3. Projeto versionado no Git

## 🚀 Passo a Passo

### 1. Preparar o Repositório Git

Se ainda não tiver um repositório Git:

```bash
# Inicializar o repositório (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer o commit inicial
git commit -m "Initial commit - Portfolio ready for deployment"

# Criar um repositório no GitHub e conectar
# (Substitua YOUR_USERNAME e YOUR_REPO pelos seus dados)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Criar Conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"** (recomendado)
4. Autorize o Vercel a acessar seus repositórios

### 3. Fazer Deploy do Projeto

#### Opção A: Deploy via Dashboard (Recomendado para iniciantes)

1. No dashboard do Vercel, clique em **"Add New Project"**
2. Selecione o repositório do seu portfólio
3. O Vercel detectará automaticamente que é um projeto Next.js
4. Configure as seguintes opções:
   - **Framework Preset**: Next.js (já detectado)
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: `npm run build` (já configurado)
   - **Output Directory**: `.next` (já configurado)
   - **Install Command**: `npm install` (já configurado)

5. **IMPORTANTE**: Configure as Variáveis de Ambiente antes de fazer o deploy:

   Clique em **"Environment Variables"** e adicione:

   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID = seu_service_id_aqui
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = seu_template_id_aqui
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = sua_public_key_aqui
   ```

   > **Nota**: Se você ainda não tem essas credenciais do EmailJS, consulte o arquivo `CONTACT_FORM_SETUP.md` para configurar o EmailJS primeiro.

6. Clique em **"Deploy"**

#### Opção B: Deploy via CLI

1. Instale a CLI do Vercel:
   ```bash
   npm i -g vercel
   ```

2. No diretório do projeto, execute:
   ```bash
   vercel
   ```

3. Siga as instruções no terminal:
   - Faça login na sua conta Vercel
   - Confirme o projeto
   - Configure as variáveis de ambiente quando solicitado

4. Para fazer deploy em produção:
   ```bash
   vercel --prod
   ```

### 4. Configurar Variáveis de Ambiente

**IMPORTANTE**: As variáveis de ambiente devem ser configuradas no dashboard do Vercel para que o formulário de contato funcione.

1. No dashboard do Vercel, vá para seu projeto
2. Clique em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

   | Nome | Valor | Ambiente |
   |------|-------|----------|
   | `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Seu Service ID do EmailJS | Production, Preview, Development |
   | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Seu Template ID do EmailJS | Production, Preview, Development |
   | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Sua Public Key do EmailJS | Production, Preview, Development |

4. Clique em **Save** para cada variável

5. **Após adicionar as variáveis**, você precisa fazer um novo deploy:
   - Vá para a aba **Deployments**
   - Clique nos três pontos (...) do último deployment
   - Selecione **Redeploy**

### 5. Verificar o Deploy

Após o deploy:

1. O Vercel fornecerá uma URL como: `https://seu-projeto.vercel.app`
2. Acesse a URL e verifique se o site está funcionando
3. Teste o formulário de contato para garantir que as variáveis de ambiente estão configuradas corretamente

## 🔄 Deploys Automáticos

O Vercel faz deploy automático sempre que você:

- Faz push para a branch `main` (produção)
- Faz push para outras branches (preview)
- Abre um Pull Request (preview)

## 🌐 Domínio Personalizado (Opcional)

Para usar um domínio personalizado:

1. No dashboard do Vercel, vá para **Settings** → **Domains**
2. Adicione seu domínio
3. Siga as instruções para configurar o DNS

## 📝 Checklist de Deploy

- [ ] Repositório Git criado e código commitado
- [ ] Conta Vercel criada
- [ ] Projeto importado no Vercel
- [ ] Variáveis de ambiente configuradas:
  - [ ] `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - [ ] `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
  - [ ] `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- [ ] Deploy realizado com sucesso
- [ ] Site acessível e funcionando
- [ ] Formulário de contato testado

## 🐛 Solução de Problemas

### Erro de Build

- Verifique se todas as dependências estão no `package.json`
- Certifique-se de que o Node.js versão 18+ está sendo usado
- Verifique os logs de build no dashboard do Vercel

### Formulário de Contato Não Funciona

- Verifique se as variáveis de ambiente estão configuradas corretamente
- Certifique-se de que fez um redeploy após adicionar as variáveis
- Verifique o console do navegador para erros

### Imagens Não Aparecem

- Certifique-se de que todas as imagens estão na pasta `public/`
- Verifique os caminhos das imagens no código
- Imagens devem usar caminhos relativos começando com `/`

### Erro 404 em Rotas

- Verifique se está usando o App Router do Next.js corretamente
- Certifique-se de que os arquivos estão na estrutura correta (`app/`)

## 📚 Recursos Adicionais

- [Documentação do Vercel](https://vercel.com/docs)
- [Documentação do Next.js](https://nextjs.org/docs)
- [EmailJS Setup Guide](./CONTACT_FORM_SETUP.md)

## 💡 Dicas

1. **Preview Deployments**: Cada push cria um preview deployment único, perfeito para testar antes de ir para produção
2. **Analytics**: O Vercel oferece analytics gratuitos para monitorar seu site
3. **Performance**: O Vercel otimiza automaticamente seu site Next.js
4. **SSL**: Certificados SSL são fornecidos automaticamente e gratuitamente

## 🎉 Pronto!

Seu portfólio está agora hospedado no Vercel e acessível ao mundo inteiro!






