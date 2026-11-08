// ============================================================
//  CONFIGURAÇÃO EDITÁVEL — troque aqui textos, links e mídias.
// ============================================================

export const WHATSAPP_URL =
  'https://wa.me/5521995154231?text=Ol%C3%A1%2C%20Duda!%20Quero%20vender%20meu%20im%C3%B3vel%20e%20gostaria%20de%20marcar%20uma%20visita.'

// Mensagem em inglês para quem navega na versão EN
export const WHATSAPP_URL_EN =
  'https://wa.me/5521995154231?text=Hi%20Duda!%20I%20want%20to%20sell%20my%20property%20and%20would%20like%20to%20book%20a%20visit.'

export const INSTAGRAM_URL = 'https://www.instagram.com/duda_corretoradeimoveis/'
export const SITE_URL = 'https://www.dudacorretora.com.br'

// ------------------------------------------------------------
//  MÍDIAS (vídeos/imagens do Instagram da Duda)
//  Coloque os arquivos em /public/media e preencha `src` (vídeo .mp4)
//  e `poster` (imagem .jpg). `srcMobile` é opcional (versão leve).
//  Enquanto `src` estiver vazio, aparece um placeholder elegante.
// ------------------------------------------------------------
export const HERO_VIDEO = {
  label: 'Praia de Icaraí · Frente para o mar',
  src: './media/hero.mp4',
  poster: './media/hero.webp',
}

export const TURN_VIDEO = {
  label: 'Tour do imóvel em Icaraí',
  src: './media/virada.mp4',
  poster: './media/virada.webp',
}

export const BENTO_VIDEO = {
  label: 'Grotão · Vista panorâmica',
  src: './media/bento.mp4',
  poster: './media/bento.webp',
}

// Trechos dos Reels da Duda (@duda_corretoradeimoveis)
export const VITRINE = [
  { bairro: 'Praia de Icaraí', detalhe: '200 m² de frente para o mar', detalhe_en: '200 m² facing the sea', src: './media/vitrine/icarai-200m.mp4', poster: './media/vitrine/icarai-200m.webp' },
  { bairro: 'Praia de Icaraí', detalhe: '300 m² com piscina na varanda', detalhe_en: '300 m² with a pool on the balcony', src: './media/vitrine/icarai-300m.mp4', poster: './media/vitrine/icarai-300m.webp' },
  { bairro: 'Jardim Icaraí', detalhe: 'Cobertura com terraço e piscina', detalhe_en: 'Penthouse with terrace and pool', src: './media/vitrine/jardim-icarai.mp4', poster: './media/vitrine/jardim-icarai.webp' },
  { bairro: 'Grotão', detalhe: 'Casa com clima de serra', detalhe_en: 'A house with a mountain feel', src: './media/vitrine/grotao.mp4', poster: './media/vitrine/grotao.webp' },
  { bairro: 'Icaraí', detalhe: '90 m² a passos da praia', detalhe_en: '90 m² steps from the beach', src: './media/vitrine/icarai-90m.mp4', poster: './media/vitrine/icarai-90m.webp' },
]

// Perfil do Instagram (tela "Grande visibilidade, do jeito certo.")
// Reels mais vistos da Duda. `views` = visualizações no Instagram (atualize quando quiser).
export const PERFIL = {
  handle: 'duda_corretoradeimoveis',
  foto: './media/perfil/foto-perfil.webp',
  bio: 'Corretora de imóveis · Niterói',
  bio_en: 'Real estate agent · Niterói',
  reels: [
    { id: 'icarai-200m', views: 94080, video: './media/perfil/icarai-200m.mp4' },
    { id: 'wabisabi', views: 90014, video: './media/perfil/wabisabi.mp4' },
    { id: 'itacoatiara', views: 62549, video: './media/perfil/itacoatiara.mp4' },
    { id: 'grotao', views: 49726 },
    { id: 'cobertura', views: 45789 },
    { id: 'santarosa', views: 31351 },
    { id: 'mansao', views: 29443 },
    { id: 'icarai-300m', views: 29261 },
    { id: 'icarai-90m', views: 26141 },
    { id: 'charitas', views: 22229 },
    { id: 'camboinhas', views: 21226 },
    { id: 'jardim-icarai', views: 19615 },
  ],
}

export const BAIRROS = [
  'Icaraí', 'Jardim Icaraí', 'Santa Rosa', 'São Francisco', 'Charitas', 'Camboinhas',
  'Piratininga', 'Itaipu', 'Itacoatiara', 'Grotão', 'Ingá', 'Pendotiba', 'Maria Paula', 'Região Oceânica',
]

// ------------------------------------------------------------
//  SOBRE A DUDA — substitua os placeholders entre colchetes.
// ------------------------------------------------------------
export const ABOUT = {
  photo: './media/duda.webp', // foto vertical 4:5 (usada se não houver vídeo)
  // Vídeo da Duda (toca uma vez quando a seção aparece e para no último quadro).
  // Deixe null para mostrar só a foto.
  video: {
    src: './media/duda.mp4',
    srcMobile: './media/duda-mobile.mp4',
    poster: './media/duda-poster.webp', // primeiro quadro
    final: './media/duda-final.webp', // último quadro (usado com "reduzir movimento")
  },
  bio: '[Breve história da Duda: de onde é, há quanto tempo trabalha com imóveis e por que escolheu Niterói.]',
  bio_en: '[Short story about Duda: where she is from, how long she has worked in real estate and why she chose Niterói.]',
  // value: null mostra "[00]+". Coloque um número (ex.: 8) para ativar a contagem animada.
  stats: [
    { value: null, suffix: '+', label: 'anos de mercado', label_en: 'years in the market' },
    { value: null, suffix: '+', label: 'imóveis vendidos', label_en: 'homes sold' },
    { value: null, suffix: '+', label: 'bairros atendidos', label_en: 'neighborhoods covered' },
  ],
}

// ------------------------------------------------------------
//  DEPOIMENTOS — somente depoimentos reais. Substitua os colchetes.
// ------------------------------------------------------------
export const TESTIMONIALS = [
  { text: '[Depoimento real do proprietário]', text_en: '[Real owner testimonial]', name: '[Nome]', bairro: '[Bairro]', dias: '[x]' },
  { text: '[Depoimento real do proprietário]', text_en: '[Real owner testimonial]', name: '[Nome]', bairro: '[Bairro]', dias: '[x]' },
  { text: '[Depoimento real do proprietário]', text_en: '[Real owner testimonial]', name: '[Nome]', bairro: '[Bairro]', dias: '[x]' },
]
// Vídeo-depoimento opcional (deixe src vazio para mostrar o placeholder, ou null para esconder)
export const TESTIMONIAL_VIDEO = { label: '[Vídeo-depoimento]', src: '', poster: '' }

export const FAQ = [
  { q: 'Preciso assinar exclusividade?', a: 'Não. Você não fica preso a contrato de exclusividade comigo.', q_en: 'Do I have to sign an exclusivity agreement?', a_en: 'No. You are not tied to an exclusivity contract with me.' },
  { q: 'Meu imóvel precisa estar perfeito para gravar?', a: 'Não. Eu mostro o imóvel como ele é, valorizando o que ele tem de melhor. Na visita eu te dou dicas simples para deixar tudo pronto.', q_en: 'Does my home need to be perfect for filming?', a_en: 'No. I show the home as it is, highlighting the best it has to offer. During the visit I give you simple tips to get everything ready.' },
  { q: 'Quanto custa?', a: 'A comissão é combinada com você na visita e só é paga quando o negócio é fechado.', q_en: 'How much does it cost?', a_en: 'The commission is agreed with you during the visit and is only paid when the deal closes.' },
  { q: 'Você cuida da documentação?', a: 'Sim. Eu acompanho toda a parte de documentos, certidões e financiamento do comprador até a assinatura.', q_en: 'Do you handle the paperwork?', a_en: "Yes. I take care of all the documents, certificates and the buyer's financing through to signing." },
  { q: 'Quem vai visitar meu imóvel?', a: 'Só interessados que eu já conversei e filtrei. Nada de visita de curioso.', q_en: 'Who will visit my home?', a_en: 'Only people I have already spoken to and screened. No curious onlookers.' },
  { q: 'Quais bairros você atende?', a: 'Niterói inteira, com forte atuação em Icaraí, Santa Rosa, São Francisco, Charitas e Região Oceânica, além de Maria Paula e Pendotiba.', q_en: 'Which neighborhoods do you cover?', a_en: 'All of Niterói, with a strong presence in Icaraí, Santa Rosa, São Francisco, Charitas and Região Oceânica, as well as Maria Paula and Pendotiba.' },
  { q: 'Também posso alugar meu imóvel com você?', a: 'Sim. Me chama e a gente conversa sobre locação também.', q_en: 'Can I also rent out my home with you?', a_en: 'Yes. Message me and we can talk about renting too.' },
]
