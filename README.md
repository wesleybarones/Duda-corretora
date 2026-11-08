# Duda Corretora · Landing page de captação ("Maré mansa")

React + Vite + Framer Motion + Lenis. Página estática: sem backend e sem formulário. Toda conversão vai para o WhatsApp.

## Rodar
```bash
npm install
npm run dev       # desenvolvimento
npm run build     # gera a pasta dist/ (pronta para Vercel, Netlify ou qualquer host estático)
```

## O que editar (tudo em `src/config.js`)
- **Vídeos e imagens**: coloque os arquivos em `public/media/` e preencha `src` (mp4) e `poster` (jpg) em
  `HERO_VIDEO`, `TURN_VIDEO`, `BENTO_VIDEO` e na lista `VITRINE` (bairro + detalhe de cada card).
  `srcMobile` é opcional, para uma versão mais leve no celular. Sem `src`, aparece o placeholder com a concha.
- **Sobre a Duda**: `ABOUT.photo` (vertical 4:5), `ABOUT.bio` e `ABOUT.stats`.
  Em `stats`, troque `value: null` por um número (ex.: `8`) e a contagem animada passa a funcionar.
- **Depoimentos**: `TESTIMONIALS` e `TESTIMONIAL_VIDEO` (use `null` para esconder o slot de vídeo).
  Coloque apenas depoimentos reais.
- **FAQ, bairros, links**: `FAQ`, `BAIRROS`, `WHATSAPP_URL`, `INSTAGRAM_URL`, `SITE_URL`.

## Estrutura
- `src/components/Hero.jsx`: hero com forma de maré que muda devagar, celulares, cards flutuantes e parallax
- `src/components/Story.jsx`: faixa de bairros, "O problema", transição em onda e "A virada" (celular fixo + citação)
- `src/components/Vitrine.jsx`: rolagem horizontal fixa no desktop e carrossel com snap no tablet/mobile
- `src/components/Process.jsx`: espiral do náutilo em "Como funciona" e o bento
- `src/components/Closing.jsx`: Sobre, Depoimentos, FAQ, CTA final, rodapé, botão flutuante, barra mobile e cursor
- `src/styles.css`: design system (tokens no `:root`)

## Vídeos
Os trechos dos Reels ficam em `public/media/` (hero, virada, bento) e `public/media/vitrine/`.
Para trocar ou adicionar: coloque o `.mp4` (vertical, sem áudio, ~540x960) e a capa `.webp`
na pasta e ajuste `src/config.js`.

## Publicação
O projeto `duda-corretora` na Vercel está ligado a este repositório: cada push no `main`
publica automaticamente em https://duda-corretora.vercel.app.
