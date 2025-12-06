# 📸 Guia de Onde Colocar as Imagens

## 🏠 Imagem do Home (Foto de Perfil)

**Localização:** `public/profile.jpg` ou `public/profile.png`

Coloque sua foto de perfil diretamente na pasta `public` com um dos seguintes nomes:
- `profile.jpg`
- `profile.png`

**Exemplo de estrutura:**
```
public/
  ├── profile.jpg          ← SUA FOTO AQUI
  └── projects/
```

**Depois de adicionar a imagem**, você precisa descomentar o código no arquivo `components/Home.tsx`:

1. Abra o arquivo `components/Home.tsx`
2. Encontre as linhas 122-129 (onde está o comentário)
3. Descomente o código do Image e comente ou remova o div com "DM"

```tsx
{/* Antes (comentado) */}
{/* <Image
  src="/profile.jpg"
  alt="Deyril Marlon Ibraimo"
  width={400}
  height={400}
  className="rounded-full object-cover w-64 h-64 md:w-80 md:h-80"
/> */}

{/* Depois (ativo) */}
<Image
  src="/profile.jpg"
  alt="Deyril Marlon Ibraimo"
  width={400}
  height={400}
  className="rounded-full object-cover w-64 h-64 md:w-80 md:h-80"
/>
```

---

## 🚀 Imagens do Projeto SPACE4ALL

**Localização:** `public/projects/space4all/`

Coloque todas as imagens e vídeo do projeto SPACE4ALL nesta pasta:

**Estrutura necessária:**
```
public/
  └── projects/
      └── space4all/
          ├── image0.jpg    ← SPACE4ALL Research Approach
          ├── image1.jpg    ← Map of Study Locations
          ├── image2.jpg    ← Participatory Validation - Kisumu, January 2025
          ├── image3.jpg    ← Participatory Validation - Beira, February 2025
          └── video.mp4     ← Transect Walk video (opcional)
```

### 📋 Detalhes das Imagens:

1. **image0.jpg** - Imagem mostrando a abordagem de pesquisa do SPACE4ALL
2. **image1.jpg** - Mapa das localizações do estudo (Kisumu, Nairobi, Accra, Tema, Beira, Chimoio)
3. **image2.jpg** - Validação participativa em Kisumu, Janeiro 2025
4. **image3.jpg** - Validação participativa em Beira, Fevereiro 2025
5. **video.mp4** - Vídeo do Transect Walk em Manyata B Neighbourhood, Kisumu, Kenya (opcional)

### ⚠️ Importante:

- Os nomes dos arquivos devem ser **exatamente** como mostrado acima (image0.jpg, image1.jpg, etc.)
- Formatos aceitos: `.jpg`, `.jpeg`, `.png` para imagens
- Para o vídeo: `.mp4`, `.webm`, ou `.mov`
- Se não tiver todas as 4 imagens, o sistema ainda funcionará, mas mostrará placeholders para as que faltarem

---

## ✅ Resumo Rápido

| Tipo | Pasta | Arquivo |
|------|-------|---------|
| Foto de Perfil | `public/` | `profile.jpg` ou `profile.png` |
| Imagem 1 SPACE4ALL | `public/projects/space4all/` | `image0.jpg` |
| Imagem 2 SPACE4ALL | `public/projects/space4all/` | `image1.jpg` |
| Imagem 3 SPACE4ALL | `public/projects/space4all/` | `image2.jpg` |
| Imagem 4 SPACE4ALL | `public/projects/space4all/` | `image3.jpg` |
| Vídeo SPACE4ALL | `public/projects/space4all/` | `video.mp4` (opcional) |

---

## 🔧 Após Adicionar as Imagens

1. **Para a foto de perfil:** Descomente o código no `components/Home.tsx` (linhas 123-129)
2. **Para as imagens do projeto:** Elas aparecerão automaticamente, não precisa fazer nada além de colocar os arquivos na pasta correta
3. Reinicie o servidor de desenvolvimento se estiver rodando: `npm run dev`












