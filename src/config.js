// ============================================================
//  CONFIGURAÇÃO EDITÁVEL — troque aqui textos, links e mídias.
// ============================================================

export const WHATSAPP_URL =
  'https://wa.me/5521995154231?text=Ol%C3%A1%2C%20Duda!%20Quero%20vender%20meu%20im%C3%B3vel%20e%20gostaria%20de%20marcar%20uma%20visita.'

export const CTA_LABEL = 'Marque sua visita'

export const INSTAGRAM_URL = 'https://www.instagram.com/duda_corretoradeimoveis/'
export const SITE_URL = 'https://www.dudacorretora.com.br'

// ------------------------------------------------------------
//  MÍDIAS (vídeos/imagens do Instagram da Duda)
//  Coloque os arquivos em /public/media e preencha `src` (vídeo .mp4)
//  e `poster` (imagem .jpg). `srcMobile` é opcional (versão leve).
//  Enquanto `src` estiver vazio, aparece um placeholder elegante.
// ------------------------------------------------------------
export const HERO_VIDEO = {
  label: 'Icaraí · Frente para o mar',
  src: '', // ex.: './media/icarai-frente-mar.mp4'
  poster: '',
}

export const TURN_VIDEO = {
  label: 'Tour gravado no celular',
  src: '',
  poster: '',
}

export const BENTO_VIDEO = {
  label: 'Seu imóvel aqui',
  src: '',
  poster: '',
}

export const VITRINE = [
  { bairro: 'Praia de Icaraí', detalhe: '200 m² de frente para o mar', src: '', poster: '' },
  { bairro: 'Itacoatiara', detalhe: 'Casa brutalista entre árvores', src: '', poster: '' },
  { bairro: 'Grotão', detalhe: 'Casa com clima de serra', src: '', poster: '' },
  { bairro: 'Camboinhas', detalhe: 'Triplex em condomínio', src: '', poster: '' },
  { bairro: 'Jardim Icaraí', detalhe: 'Cobertura com terraço', src: '', poster: '' },
  { bairro: 'Santa Rosa', detalhe: 'Primeiro apê reformado', src: '', poster: '' },
  { bairro: 'Charitas', detalhe: 'Vista para a Baía de Guanabara', src: '', poster: '' },
]

export const BAIRROS = [
  'Icaraí', 'Jardim Icaraí', 'Santa Rosa', 'São Francisco', 'Charitas', 'Camboinhas',
  'Piratininga', 'Itaipu', 'Itacoatiara', 'Grotão', 'Ingá', 'Pendotiba', 'Maria Paula', 'Região Oceânica',
]

// ------------------------------------------------------------
//  SOBRE A DUDA — substitua os placeholders entre colchetes.
// ------------------------------------------------------------
export const ABOUT = {
  photo: './media/duda.webp', // foto vertical 4:5
  bio: '[Breve história da Duda: de onde é, há quanto tempo trabalha com imóveis e por que escolheu Niterói.]',
  // value: null mostra "[00]+". Coloque um número (ex.: 8) para ativar a contagem animada.
  stats: [
    { value: null, suffix: '+', label: 'anos de mercado' },
    { value: null, suffix: '+', label: 'imóveis vendidos' },
    { value: null, suffix: '+', label: 'bairros atendidos' },
  ],
}

// ------------------------------------------------------------
//  DEPOIMENTOS — somente depoimentos reais. Substitua os colchetes.
// ------------------------------------------------------------
export const TESTIMONIALS = [
  { text: '[Depoimento real do proprietário]', name: '[Nome]', bairro: '[Bairro]', dias: '[x]' },
  { text: '[Depoimento real do proprietário]', name: '[Nome]', bairro: '[Bairro]', dias: '[x]' },
  { text: '[Depoimento real do proprietário]', name: '[Nome]', bairro: '[Bairro]', dias: '[x]' },
]
// Vídeo-depoimento opcional (deixe src vazio para mostrar o placeholder, ou null para esconder)
export const TESTIMONIAL_VIDEO = { label: '[Vídeo-depoimento]', src: '', poster: '' }

export const FAQ = [
  { q: 'Preciso assinar exclusividade?', a: 'Não. Você não fica preso a contrato de exclusividade comigo.' },
  { q: 'Meu imóvel precisa estar perfeito para gravar?', a: 'Não. Eu mostro o imóvel como ele é, valorizando o que ele tem de melhor. Na visita eu te dou dicas simples para deixar tudo pronto.' },
  { q: 'Quanto custa?', a: 'A comissão é combinada com você na visita e só é paga quando o negócio é fechado.' },
  { q: 'Você cuida da documentação?', a: 'Sim. Eu acompanho toda a parte de documentos, certidões e financiamento do comprador até a assinatura.' },
  { q: 'Quem vai visitar meu imóvel?', a: 'Só interessados que eu já conversei e filtrei. Nada de visita de curioso.' },
  { q: 'Quais bairros você atende?', a: 'Niterói inteira, com forte atuação em Icaraí, Santa Rosa, São Francisco, Charitas e Região Oceânica, além de Maria Paula e Pendotiba.' },
  { q: 'Também posso alugar meu imóvel com você?', a: 'Sim. Me chama e a gente conversa sobre locação também.' },
]
