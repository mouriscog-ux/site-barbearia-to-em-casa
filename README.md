# Barbearia Tô em Casa — Website Oficial

Site institucional moderno, minimalista e premium desenvolvido para a **BARBEARIA TÔ EM CASA**.

## ✨ Destaques do Projeto

- **Identidade Visual:** Modern Minimalism com estética premium (paleta preto, grafite e branco quente, toques em champagne gold).
- **Fotografias Coloridas:** Imagens reais, vivas e nítidas de cortes, barbas alinhadas e ambiente lounge (sem fotografias em preto e branco).
- **Hero Cinematográfico:** Fundo em vídeo de alta qualidade com transição suave, controles de áudio e play/pause e imagem de fallback responsiva.
- **Animações GSAP & ScrollTrigger:**
  - Pré-carregador com entrada cinematográfica e abertura em cortina.
  - Revelação de textos com máscaras (`split-reveal`).
  - Animações escalonadas ao rolar a página (*stagger reveals*).
  - Zoom sutil e suave nas fotografias ao passar o cursor.
  - Microinterações e efeitos magnéticos nos botões de agendamento.
- **Agendamento Interativo (Wizard de 4 Etapas):**
  1. Seleção de Serviço (com cálculo de tempo e investimento demonstrativo).
  2. Escolha do Profissional (com especialidade e experiência).
  3. Seleção de Data e Horário (calendário interativo e turnos de manhã, tarde e noite).
  4. Resumo e Confirmação com integração direta ao WhatsApp.
- **100% Responsivo:** Otimizado para monitores ultra-wide, laptops, tablets e smartphones (com menu drawer exclusivo).

---

## 📁 Estrutura de Arquivos

```
site barbearia to em casa/
├── index.html              # Estrutura semântica completa com as 11 seções
├── package.json            # Scripts opcionais para servidor Vite
├── README.md               # Instruções e documentação
├── css/
│   └── styles.css          # Design system, variáveis, animações e layout
├── js/
│   ├── animations.js       # GSAP, ScrollTrigger, máscaras e microinterações
│   ├── booking.js          # Lógica do fluxo de agendamento interativo e WhatsApp
│   └── main.js             # Menu mobile, filtros da galeria, controles do hero e lightbox
└── assets/
    └── icons/
        ├── logo.svg        # Logomarca vetorial exclusiva Tô em Casa
        └── favicon.svg     # Ícone do navegador
```

---

## 🚀 Como Executar

### Opção 1: Direto no Navegador (Mais Rápido)
Basta dar dois cliques no arquivo `index.html` ou abri-lo com qualquer navegador moderno (Chrome, Edge, Safari, Firefox). O site foi construído para funcionar perfeitamente de forma autônoma sem requerer build!

### Opção 2: Servidor Local Vite
Se preferir rodar com hot-reload local:
```bash
npm install
npm run dev
```
O servidor estará disponível em `http://localhost:5173`.

---

## 🛠️ Personalização Rápida

- **Preços e Serviços:** edite o array `servicesData` em [`js/booking.js`](file:///C:/Users/26012248/Documents/GitHub/site%20barbearia%20to%20em%20casa/js/booking.js) e os cards na seção `#servicos` em [`index.html`](file:///C:/Users/26012248/Documents/GitHub/site%20barbearia%20to%20em%20casa/index.html).
- **Profissionais:** edite o array `barbersData` em [`js/booking.js`](file:///C:/Users/26012248/Documents/GitHub/site%20barbearia%20to%20em%20casa/js/booking.js) e os cards na seção `#profissionais`.
- **Número do WhatsApp:** altere o link `https://wa.me/5511999999999` em [`js/booking.js`](file:///C:/Users/26012248/Documents/GitHub/site%20barbearia%20to%20em%20casa/js/booking.js) e nos links de contato em [`index.html`](file:///C:/Users/26012248/Documents/GitHub/site%20barbearia%20to%20em%20casa/index.html).
- **Logomarca:** o arquivo vetorial está em [`assets/icons/logo.svg`](file:///C:/Users/26012248/Documents/GitHub/site%20barbearia%20to%20em%20casa/assets/icons/logo.svg). Você pode substituir por seu próprio arquivo SVG ou imagem PNG a qualquer momento.
