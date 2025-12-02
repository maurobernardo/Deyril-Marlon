# Setup Instructions

## Estrutura de Pastas para Imagens

Para que as imagens dos projetos funcionem corretamente, você precisa criar a seguinte estrutura de pastas:

```
public/
  projects/
    space4all/
      image0.jpg  (SPACE4ALL Research Approach)
      image1.jpg  (Map of Study Locations)
      image2.jpg  (Participatory Validation - Kisumu)
      image3.jpg  (Participatory Validation - Beira)
      video.mp4   (Transect Walk video)
```

## Adicionar Foto de Perfil

Para adicionar sua foto de perfil na seção Home:

1. Coloque sua imagem em `public/profile.jpg` ou `public/profile.png`
2. Atualize o componente `components/Home.tsx` para usar a imagem real:

```tsx
<Image
  src="/profile.jpg"
  alt="Deyril Marlon Ibraimo"
  width={400}
  height={400}
  className="rounded-full object-cover"
/>
```

## Links de Redes Sociais

Atualize os links das redes sociais no arquivo `components/Home.tsx`:

```tsx
const socialLinks = {
  linkedin: 'https://linkedin.com/in/seu-perfil',
  facebook: 'https://facebook.com/seu-perfil',
  instagram: 'https://instagram.com/seu-perfil',
}
```

## Adicionar Mais Projetos

Para adicionar mais projetos, edite o arquivo `components/Projects.tsx` e adicione novos objetos ao array `projects`:

```tsx
const projects = [
  {
    id: 'space4all',
    // ... configuração existente
  },
  {
    id: 'novo-projeto',
    title: 'Título do Projeto',
    subtitle: 'Subtítulo',
    date: '2024',
    description: 'Descrição...',
    images: [
      '/projects/novo-projeto/image1.jpg',
      // ... mais imagens
    ],
    video: '/projects/novo-projeto/video.mp4', // opcional
  },
]
```

Depois, crie a página de detalhes em `app/projects/[id]/page.tsx` adicionando um caso para o novo projeto.

## Personalizar Cores

As cores podem ser personalizadas no arquivo `tailwind.config.js`. A paleta atual usa:
- Primary: Light Blue (#00BFFF)
- Dark mode: Background escuro (#0F0F0F)

## Executar o Projeto

```bash
npm install
npm run dev
```

Acesse http://localhost:3000






