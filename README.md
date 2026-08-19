# Ravena Web Design - Landing Page 3D

Website profissional com cena 3D interativa para apresentar serviços de criação de sites.

## 📁 Estrutura do Projeto

```
WEB SITE NOVO VS CODE/
├── index.html            # Página principal
├── styles.css            # Estilos do site
├── script.js             # Cena 3D (Three.js) + interface (scroll, contadores)
├── og-image.png          # Imagem de preview ao compartilhar o link
├── apple-touch-icon.png  # Ícone na tela de início do iPhone/iPad
├── trabalho-1.png        # Portfólio — print da Barbearia Dom Carlos
├── trabalho-2.png        # Portfólio — print do Sabor do Sertão
├── trabalho-3.png        # Portfólio — print da clínica Sorriso Claro
├── sobre-mim.jpg         # Foto do "Sobre mim"
├── demos/                # Projetos demonstrativos (portfólio navegável)
│   ├── barbearia-dom-carlos.html        # Salgueiro-PE · escuro + dourado
│   ├── lanchonete-sabor-do-sertao.html  # Mauriti-CE · creme + terracota
│   ├── clinica-sorriso-claro.html       # duas unidades · branco + teal
│   └── og-*.png                         # preview de cada demo ao compartilhar
├── .gitignore
└── README.md             # Este arquivo

Ferramentas de desenvolvimento (fora do Git, não vão para o cliente):
├── preview-mobile.html   # Ver o site em molduras de celular
├── comparar-fontes.html  # Comparar fontes de título lado a lado
└── auditar.py            # Auditoria pré-entrega (contraste, SEO, acessibilidade)
```

## 🎨 Características

- ✅ Cena 3D interativa com Three.js, carregada **sob demanda**: os ~600 KB da
  biblioteca só são baixados em tela de 1024px ou mais e com conexão boa. No
  celular, no tablet em pé ou em rede lenta, a página abre sem esse peso e o
  layout se fecha sozinho (classe `sem-3d`)
- ✅ Paleta tech/neon: azul profundo com gradientes ciano e rosa como destaque
- ✅ Tipografia Bebas Neue (títulos) + Inter (texto)
- ✅ Totalmente responsivo (mobile, tablet, desktop) com breakpoints em 420px, 768px e 1024px
- ✅ Otimizado para conversão
- ✅ Integração WhatsApp, com botão flutuante que some na seção de contato
- ✅ Galeria de trabalhos em molduras de celular
- ✅ Google Maps incorporado (Salgueiro-PE e Mauriti-CE), sem chave de API
- ✅ Entrada suave ao rolar e números que contam até o valor
- ✅ Acessível: contraste WCAG AA, navegação por teclado, respeita `prefers-reduced-motion`
- ✅ SEO: meta description, Open Graph, Twitter Card e dados estruturados de negócio local

## 🚀 Como Usar

### 1. No VS Code

1. Abra esta pasta no VS Code
2. Instale a extensão "Live Server"
3. Clique com direito em `index.html` → "Open with Live Server"
4. Site abrirá em `http://localhost:5500` (ou porta similar)

### 2. Editar Conteúdo

**HTML** → Edite `index.html` (estrutura, textos)
**CSS** → Edite `styles.css` (cores, fontes, layout)
**JavaScript** → Edite `script.js` (cena 3D)

### 3. Customizar Cores

As cores ficam centralizadas em variáveis no topo de `styles.css`, dentro de `:root`:

```css
:root {
    --color-bg: #0a0e27;              /* fundo (azul muito escuro) */
    --color-fg: #e0e7ff;              /* títulos e texto de destaque */
    --color-accent: #00d4ff;          /* ciano — cor de ação (botões, links) */
    --color-accent-secondary: #ff0080; /* rosa — segundo acento */
    --gradient-primary: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
    --gradient-accent: linear-gradient(135deg, #ff0080 0%, #ff6b00 100%);
}
```

Troque esses valores para mudar a paleta inteira do site de uma vez. As cores da gema 3D ficam em `script.js`, nas constantes `gemMat`, `coreMat` e nas luzes (`key`, `rim`).

### 4. Publicar (Netlify + GitHub)

O repositório já está conectado ao GitHub (`devsravenacris-art/ravena-web-design2`). Fluxo recomendado:

1. Suba as alterações pro GitHub (`git add`, `git commit`, `git push`)
2. No [Netlify](https://app.netlify.com), importe o projeto conectando a conta GitHub e escolhendo esse repositório
3. Não é necessário comando de build — é um site estático (publish directory: `.`)
4. A cada novo `git push`, o Netlify publica a atualização automaticamente

## 📝 Edições Comuns

### Portfólio: projetos demonstrativos

A pasta `demos/` tem três sites completos e navegáveis, criados para negócios
fictícios da região. Cada um usa uma paleta e uma tipografia diferentes — a
intenção é mostrar versatilidade, e não repetir o mesmo estilo três vezes.

Todos trazem, no topo e no rodapé, o aviso de que são projetos demonstrativos.
**Não remova esse aviso.** Demo assumida é prática normal de portfólio; demo
apresentada como cliente real é propaganda enganosa.

Os arquivos `trabalho-1.png`, `trabalho-2.png` e `trabalho-3.png` são as
miniaturas exibidas na galeria da página principal. Para deixá-las idênticas ao
site renderizado:

1. Abra o demo no `preview-mobile.html` pelo Live Server
2. Escolha "iPhone 14 Pro / 15" na lista de aparelhos
3. Tire um print só da área da tela (Win + Shift + S)
4. Salve por cima da miniatura correspondente, mantendo o nome do arquivo

Ao substituir por um **cliente real**, troque também o `alt` e a legenda em
`index.html`, e remova a palavra "demonstrativo" daquele item.

### ⚠️ Trocar a foto e o texto do "Sobre mim"

1. Substitua `sobre-mim.jpg` por uma foto sua **quadrada** (800 × 800 px é o ideal).
   Foto de celular com luz de janela funciona bem; evite banco de imagens.
2. Em `index.html`, na seção `id="sobre"`, reescreva o parágrafo que está entre
   colchetes `[ ]`. Ele existe só como orientação e não pode ir ao ar.

### Mudar Números de Telefone
Procure em `index.html`:
```html
(87) 99161-4428
(88) 99474-4444
```

### Mudar Email
Procure em `index.html`:
```html
ravas2304@gmail.com
```

### Mudar GitHub
Procure em `index.html`:
```html
https://github.com/devsravenacris-art
```

### Mudar Valores dos Planos
Procure em `index.html` pelas seções de preços:
```html
<div class="price">R$ 500</div>
<div class="price">R$ 1.000</div>
<div class="price">R$ 1.500</div>
```

## 🔧 Tecnologias Usadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Three.js (cena 3D)
- Netlify (hospedagem)

## 📱 Navegadores Suportados

- Chrome (recomendado)
- Firefox
- Safari
- Edge
- Navegadores mobile (Android e iOS)

## 🎯 Dicas de Uso

1. **Para clientes de outras áreas**: troque os "cases" (Resultados Reais) pelo segmento relevante (personal trainer, coach, consultoria, etc.)
2. **Cores**: ajuste fácil trocando as variáveis em `:root` no `styles.css`
3. **Cena 3D**: ajuste velocidade de giro e sensibilidade ao toque em `script.js`

## 📧 Contato & Suporte

Questões sobre o site:
- GitHub: https://github.com/devsravenacris-art
- WhatsApp: (87) 99161-4428

---

Criado com ❤️ por Ravena Leite
