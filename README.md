# Ravena Web Design — site institucional

Site de uma página para apresentar serviços de criação de sites e otimização de
PC, com portfólio navegável e cena 3D decorativa carregada sob demanda.

**No ar:** https://ravena-web-design-oficial.netlify.app/

## 📁 Estrutura do Projeto

```
WEB SITE NOVO VS CODE/
├── index.html            # Página principal (todo o conteúdo)
├── styles.css            # Estilos do site
├── script.js             # Cena 3D (Three.js) + entrada suave ao rolar
├── favicon.png           # Ícone da aba do navegador
├── favicon.ico           # Mesmo ícone no formato que o navegador pede sozinho
├── apple-touch-icon.png  # Ícone na tela de início do iPhone/iPad
├── og-image.png          # Preview ao compartilhar o link (1200×630)
├── grao.png              # Grão de filme sobreposto à página
├── textura-glitch.svg    # Grade pontilhada do fundo
├── sobre-mim.jpg         # Foto do "Sobre mim" (640×640)
├── trabalho-1.png        # Portfólio — print do demo da Barbearia Dom Carlos
├── trabalho-2.png        # Portfólio — print do demo Sabor do Sertão
├── trabalho-3.png        # Portfólio — print do demo Sorriso Claro
├── demos/                # Projetos demonstrativos (portfólio navegável)
│   ├── barbearia-dom-carlos.html        # Salgueiro-PE · escuro + dourado
│   ├── lanchonete-sabor-do-sertao.html  # Mauriti-CE · creme + terracota
│   ├── clinica-sorriso-claro.html       # duas unidades · branco + teal
│   └── og-*.png                         # preview de cada demo ao compartilhar
├── .gitignore
└── README.md             # Este arquivo

Ferramentas de desenvolvimento (fora do Git, não vão para o cliente):
├── preview-mobile.html            # Ver o site em molduras de celular
├── comparar-fontes.html           # Comparar fontes de título lado a lado
├── auditar.py                     # Auditoria pré-entrega
└── RELATÓRIO-AUDITORIA-FINAL.md   # Resultado da última auditoria
```

## 🎨 Características

- ✅ Cena 3D com Three.js, **carregada sob demanda**: os ~600 KB da biblioteca
  só são baixados quando a conexão comporta. Com economia de dados ligada ou em
  rede 2G/3G, ela nem é baixada — **em qualquer tamanho de tela, inclusive
  celular** — e o layout se fecha sozinho pela classe `sem-3d`, sem salto
- ✅ Degrada com elegância: se o CDN cair ou o hash de integridade não bater, a
  página abre inteira e o cartão da cena para de se anunciar como botão
- ✅ Paleta tech/neon: azul profundo com gradientes ciano e rosa como destaque
- ✅ Tipografia Bebas Neue (títulos) + Inter (texto)
- ✅ Responsivo, com breakpoints em 420px, 768px e 1024px
- ✅ Integração WhatsApp, com botão flutuante que some na seção de contato
- ✅ Faixa rolante fixa no topo e galeria de trabalhos em molduras de celular
- ✅ Google Maps incorporado (Salgueiro-PE e Mauriti-CE), sem chave de API
- ✅ Entrada suave ao rolar, conduzida pelo `script.js` (se o JS não rodar, o
  conteúdo continua visível)
- ✅ Acessível: contraste WCAG AA verificado, skip link, navegação por teclado,
  respeita `prefers-reduced-motion` (faixa, grão, scroll suave e entradas param)
- ✅ SEO: meta description, Open Graph, Twitter Card, canonical e dados
  estruturados de negócio local (`ProfessionalService`)

## 🚀 Como Usar

### 1. No VS Code

1. Abra esta pasta no VS Code
2. Instale a extensão "Live Server"
3. Clique com direito em `index.html` → "Open with Live Server"
4. Site abrirá em `http://localhost:5500` (ou porta similar)

### 2. Editar Conteúdo

**HTML** → `index.html` (estrutura, textos)
**CSS** → `styles.css` (cores, fontes, layout)
**JavaScript** → `script.js` (cena 3D, entrada ao rolar, botão flutuante)

### 3. Customizar Cores

As cores ficam centralizadas em variáveis no topo de `styles.css`, dentro de `:root`:

```css
:root {
    --color-bg: #0a0e27;               /* fundo (azul muito escuro) */
    --color-fg: #e0e7ff;               /* títulos e texto de destaque */
    --color-accent: #00d4ff;           /* ciano — cor de ação (botões, links) */
    --color-accent-secondary: #ff0080; /* rosa — segundo acento */
    --gradient-primary: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
    --gradient-accent: linear-gradient(135deg, #ff0080 0%, #ff6b00 100%);
}
```

Troque esses valores para mudar a paleta inteira de uma vez. **Ao trocar,
confira o contraste de novo** (`python3 auditar.py .`) — a paleta atual passa em
WCAG AA e uma cor nova pode reprovar. As cores da gema 3D ficam em `script.js`,
nas constantes `gemMat`, `coreMat` e nas luzes (`key`, `rim`).

### 4. Publicar (Netlify + GitHub)

O repositório está conectado ao GitHub (`devsravenacris-art/ravena-web-design2`)
e o Netlify publica sozinho a cada push.

```bash
git add -A
git commit -m "descreva o que mudou"
git push
```

> ⚠️ **Publicar é dar push.** Alteração salva no VS Code e não commitada não vai
> ao ar. Antes de dizer que o site está atualizado, confira `git status` (limpo)
> e `git status -sb` (sem "ahead"), e só então abra o site publicado.

Se algum dia publicar arrastando a pasta para o Netlify em vez de usar o Git,
lembre que as ferramentas de desenvolvimento listadas acima sobem junto — elas
só ficam de fora porque estão no `.gitignore`.

## 📝 Edições Comuns

### Portfólio: projetos demonstrativos

A pasta `demos/` tem três sites completos e navegáveis, criados para negócios
fictícios da região. Cada um usa uma paleta e uma tipografia diferentes — a
intenção é mostrar versatilidade, e não repetir o mesmo estilo três vezes.

Todos trazem, no topo e no rodapé, o aviso de que são projetos demonstrativos, e
saem do índice do Google por `noindex`. **Não remova esse aviso.** Demo assumida
é prática normal de portfólio; demo apresentada como cliente real é propaganda
enganosa.

Os arquivos `trabalho-1.png`, `trabalho-2.png` e `trabalho-3.png` são as
miniaturas exibidas na galeria da página principal. Para deixá-las idênticas ao
site renderizado:

1. Abra o demo no `preview-mobile.html` pelo Live Server
2. Escolha "iPhone 14 Pro / 15" na lista de aparelhos
3. Tire um print só da área da tela (Win + Shift + S)
4. Salve por cima da miniatura correspondente, mantendo o nome do arquivo

> ⚠️ O nome do negócio precisa bater em **quatro** lugares: a legenda em
> `index.html`, o `alt` da imagem, o `<title>` do arquivo em `demos/` e o texto
> escrito dentro do próprio print. Se um deles ficar para trás, quem clica no
> cartão cai num negócio com outro nome.

Ao substituir por um **cliente real**, troque também o `alt` e a legenda em
`index.html`, e remova a palavra "demonstrativo" daquele item.

### Trocar a foto do "Sobre mim"

Substitua `sobre-mim.jpg` por uma foto sua **quadrada** (800 × 800 px é o ideal).
Foto de celular com luz de janela, levemente de lado, funciona bem; evite banco
de imagens e evite foto 3×4 de documento — numa página que vende design, ela
trabalha contra o texto.

### Mudar Números de Telefone

Aparecem em `index.html` (links `wa.me`, texto visível e o JSON-LD) e também nos
três arquivos de `demos/`:

```
(87) 99161-4428   →   wa.me/5587991614428
(88) 99474-4444   →   wa.me/5588994744444
```

### Mudar Email

Procure em `index.html` — aparece no link `mailto:`, no texto visível abaixo dos
botões e no JSON-LD:

```
desenvolvedoraravena@proton.me
```

### Mudar Valores dos Planos

Procure em `index.html` pela seção `id="precos"`. São quatro planos:

```html
<div class="price">R$ 300</div>     <!-- Essencial -->
<div class="price">R$ 500</div>     <!-- Básico -->
<div class="price">R$ 1.000</div>   <!-- Profissional -->
<div class="price">R$ 1.500</div>   <!-- Premium -->
```

Ao mexer nos valores, atualize também `priceRange` no JSON-LD (topo do
`index.html`) e a frase "Planos a partir de R$ 300" na `og:description`.

## 🔧 Tecnologias Usadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Three.js r128 via cdnjs, com verificação de integridade (SRI)
- Netlify (hospedagem)

## 📱 Navegadores Suportados

- Chrome (recomendado)
- Firefox
- Safari
- Edge
- Navegadores mobile (Android e iOS)

## ✅ Antes de publicar

```bash
python3 auditar.py .
```

O script cobre o que é objetivo: contraste, meta tags, segredos, higiene de Git,
semântica. O que ele **não** cobre e você precisa conferir a olho:

- Este README ainda descreve o site que existe? (é o arquivo que envelhece mais rápido)
- Toda afirmação verificável do site é verdadeira? (selos de "mais contratado",
  depoimentos, percentuais, cases)
- Testou num **Android intermediário real**? Emulador simula tamanho de tela,
  não simula GPU — e o site usa `backdrop-filter`, material com `transmission`
  e 600 partículas

## 📧 Contato & Suporte

- WhatsApp: (87) 99161-4428
- Email: desenvolvedoraravena@proton.me
- GitHub: https://github.com/devsravenacris-art

---

Criado com ❤️ por Ravena Leite
