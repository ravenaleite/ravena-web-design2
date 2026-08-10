# Ravena Web Design - Landing Page 3D

Website profissional com cena 3D interativa para apresentar serviços de criação de sites.

## 📁 Estrutura do Projeto

```
WEB SITE NOVO VS CODE/
├── index.html          # Página principal
├── styles.css          # Estilos do site
├── script.js            # Cena 3D (Three.js)
└── README.md            # Este arquivo
```

## 🎨 Características

- ✅ Cena 3D interativa com Three.js (reage a mouse e toque, em qualquer dispositivo)
- ✅ Paleta preto / creme, com vermelho como cor de destaque única
- ✅ Tipografia Amatic SC (títulos) + Inter (texto)
- ✅ Totalmente responsivo (mobile, tablet, desktop) com breakpoints em 420px, 768px e 1024px
- ✅ Otimizado para conversão
- ✅ Integração WhatsApp

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
    --color-bg: #050403;        /* fundo */
    --color-fg: #f2ede1;        /* títulos e texto de destaque (creme) */
    --color-accent: #e8402c;    /* cor de ação (botões) */
    --color-accent-light: #ff6647; /* hover dos botões */
}
```

Troque esses valores para mudar a paleta inteira do site de uma vez. As cores da gema 3D ficam em `script.js`, nas constantes `gemMat`, `coreMat` e nas luzes (`hemi`, `key`, `rim`).

### 4. Publicar (Netlify + GitHub)

O repositório já está conectado ao GitHub (`devsravenacris-art/ravena-web-design2`). Fluxo recomendado:

1. Suba as alterações pro GitHub (`git add`, `git commit`, `git push`)
2. No [Netlify](https://app.netlify.com), importe o projeto conectando a conta GitHub e escolhendo esse repositório
3. Não é necessário comando de build — é um site estático (publish directory: `.`)
4. A cada novo `git push`, o Netlify publica a atualização automaticamente

## 📝 Edições Comuns

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
