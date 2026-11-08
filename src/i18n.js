import { usePrefs } from './prefs'

/*
  Textos do site em português (pt) e inglês (en).
  Use *palavra* para a ênfase em itálico com traço coral nos títulos.
*/
export const STR = {
  pt: {
    meta: {
      title: 'Duda Corretora | Venda seu imóvel em Niterói',
      description: 'Quer vender seu imóvel em Niterói? Eu gravo vídeos verdadeiros do seu imóvel, divulgo em uma das maiores vitrines digitais da cidade, filtro os interessados e cuido da burocracia. Sem exclusividade.',
    },
    cursorWatch: 'Assistir', cursorDrag: 'Arrastar',
    cta: 'Marque sua visita', ctaShort: 'Visita', ctaAria: 'Marque sua visita pelo WhatsApp',
    skip: 'Pular para o conteúdo',
    nav: {
      aria: 'Principal', brand: 'Duda, voltar ao topo', open: 'Abrir menu', close: 'Fechar menu',
      links: { 'como-funciona': 'Como funciona', vitrine: 'Vitrine', sobre: 'Sobre', duvidas: 'Dúvidas' },
      toNight: 'Ativar modo noite', toDay: 'Ativar modo dia', lang: 'Read in English', langShort: 'EN',
    },
    hero: {
      eyebrow: 'Corretora em Niterói · CRECI 104.409',
      title: 'Seu imóvel merece ser *visto*. Não só anunciado.',
      sub: 'Eu gravo, apresento e divulgo seu imóvel com verdade, para uma das maiores vitrines de imóveis de Niterói. E só levo até você quem realmente quer comprar.',
      secondary: 'Ver como eu apresento um imóvel',
      trustAria: 'Garantias',
      trust: ['Sem contrato de exclusividade', 'Eu cuido da burocracia', 'Visitas com compradores reais'],
      cardVisit: 'Nova visita agendada', cardVideo: 'Apartamento de frente para o mar',
      scroll: 'Rolar para a próxima seção',
    },
    marquee: 'Bairros que eu atendo em Niterói',
    problem: {
      eyebrow: 'Vender imóvel não precisa ser assim',
      title: 'Você não tem tempo a perder com quem só está *olhando*.',
      pains: [
        { t: 'Anúncio parado', d: 'Seu imóvel some no meio de milhares de fotos iguais em portais.' },
        { t: 'Visita que não compra', d: 'Você abre a porta, arruma a casa e a pessoa só queria conhecer.' },
        { t: 'Papelada sem fim', d: 'Certidões, documentos, banco, cartório. Tudo cai no seu colo.' },
      ],
      bridge: 'Eu faço diferente. E é bem simples.',
    },
    turn: {
      eyebrow: 'A virada',
      title: 'Em tempos de IA, a *autenticidade* é o funil.',
      blocks: [
        { t: 'Eu, meu olhar e o seu imóvel.', d: 'Muitos proprietários esperam uma superprodução. Eu chego com meu cinegrafista e um olhar cuidadoso. Equipe enxuta, sem roteiro forçado, com verdade.' },
        { t: 'Pessoas se conectam com pessoas reais.', d: 'Quem me assiste confia no que vê. Por isso seu imóvel não é só mais um anúncio: é uma recomendação.' },
        { t: 'Grande visibilidade, do jeito certo.', d: 'Seu imóvel aparece para milhares de pessoas que procuram casa em Niterói, e muitas delas estão prontas para comprar.' },
      ],
      quote: 'A simplicidade atrai, a autenticidade vende e ser de verdade gera confiança.',
      rec: 'gravando', comments: 'Comentários', topReels: 'Reels mais vistos',
      commentList: ['Que luz linda nessa sala', 'Dá pra marcar uma visita?', 'Finalmente um vídeo que mostra a casa de verdade', 'Qual o andar? Amei a varanda', 'Te chamei no direct!'],
    },
    vitrine: {
      aria: 'A vitrine', eyebrow: 'A vitrine',
      title: 'É assim que o *seu* imóvel vai ser apresentado.',
      hintDesk: 'Passe o mouse para assistir. Toque no ícone para ouvir.',
      hintMob: 'Deslize para ver. Toque no ícone para ouvir.',
      soundOn: 'Ativar som dos vídeos', soundOff: 'Desativar som dos vídeos',
      carousel: 'Vídeos de imóveis apresentados pela Duda',
      next: 'Seu imóvel pode ser o', nextEm: 'próximo',
    },
    how: {
      eyebrow: 'Sem complicação',
      title: 'Do primeiro oi até a *chave na mão* de quem comprou.',
      step: 'Passo',
      steps: [
        { t: 'Você me chama', d: 'Um oi no WhatsApp e já combinamos o melhor dia para eu conhecer seu imóvel.' },
        { t: 'Eu visito seu imóvel', d: 'Conheço cada detalhe, entendo sua expectativa e alinhamos um preço justo para o mercado do bairro.' },
        { t: 'Eu gravo e divulgo', d: 'Faço o vídeo pessoalmente e coloco seu imóvel na minha vitrine, no Instagram e no site.' },
        { t: 'Eu cuido do resto', d: 'Filtro os interessados, acompanho as visitas, conduzo a negociação e cuido da documentação até a assinatura.' },
      ],
      micro: 'Leva 1 minuto. Sem compromisso.',
    },
    bento: {
      eyebrow: 'Para o proprietário',
      title: 'Tudo o que seu imóvel precisa para *sair*.',
      video: ['Vídeo autêntico do seu imóvel', 'Gravado por mim e pelo meu cinegrafista, com o olhar de quem vende.'],
      vis: ['Grande visibilidade', 'Uma das maiores vitrines de imóveis de Niterói.'],
      free: ['Sem exclusividade', 'Você continua livre.'],
      visits: ['Visitas com quem quer comprar', 'Eu filtro antes de marcar.'],
      price: ['Preço alinhado ao mercado', 'Leitura do bairro na visita.'],
      docs: ['Burocracia comigo', 'Documentos, certidões e acompanhamento até a escritura.'],
      days: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    },
    about: {
      eyebrow: 'Prazer, Duda',
      title: 'Uma corretora que *conhece cada rua* de Niterói.',
      photoAlt: 'Duda, corretora de imóveis em Niterói',
      videoAlt: 'Duda, corretora de imóveis em Niterói, cruza os braços e sorri',
      photoPh: 'Foto da Duda', signature: 'Assinatura Duda',
    },
    testi: {
      eyebrow: 'Quem vendeu comigo', title: 'Proprietários que *confiaram*.',
      sold: (d) => `vendido em ${d} dias`, prev: 'Depoimento anterior', next: 'Próximo depoimento',
      aria: 'Depoimentos', video: 'Vídeo-depoimento (opcional)',
    },
    faq: { title: 'Dúvidas de quem vai *vender*.', card1: 'Ainda com dúvida?', card2: 'Me chama no WhatsApp.' },
    final: {
      title: 'Vamos colocar seu imóvel *na vitrine*?',
      sub: 'Me chama no WhatsApp, marcamos uma visita e eu cuido do resto.',
      micro: 'Atendimento de segunda a sexta, das 9h às 18h',
    },
    footer: {
      tag: 'Seu imóvel merece ser visto, não só anunciado.',
      contact: 'Contato', hours: 'Horário', hoursText: 'Seg. a sex., 9h às 18h',
      social: 'Redes', site: 'Ver imóveis à venda', license: 'Registro',
      copy: 'Duda Corretora de Imóveis · Niterói/RJ',
      top: 'Voltar ao topo',
    },
  },

  en: {
    meta: {
      title: 'Duda Corretora | Sell your home in Niterói',
      description: 'Selling a home in Niterói? I film honest videos of your property, share them on one of the largest property showcases in the city, screen buyers and handle the paperwork. No exclusivity.',
    },
    cursorWatch: 'Watch', cursorDrag: 'Drag',
    cta: 'Book a visit', ctaShort: 'Visit', ctaAria: 'Book a visit on WhatsApp',
    skip: 'Skip to content',
    nav: {
      aria: 'Main', brand: 'Duda, back to top', open: 'Open menu', close: 'Close menu',
      links: { 'como-funciona': 'How it works', vitrine: 'Showcase', sobre: 'About', duvidas: 'FAQ' },
      toNight: 'Switch to night mode', toDay: 'Switch to day mode', lang: 'Ler em português', langShort: 'PT',
    },
    hero: {
      eyebrow: 'Real estate agent in Niterói · CRECI 104.409',
      title: 'Your home deserves to be *seen*. Not just listed.',
      sub: 'I film, present and promote your home honestly, on one of the largest property showcases in Niterói. And I only bring you people who really want to buy.',
      secondary: 'See how I present a home',
      trustAria: 'Guarantees',
      trust: ['No exclusivity contract', 'I handle the paperwork', 'Visits from real buyers'],
      cardVisit: 'New visit booked', cardVideo: 'Sea-front apartment',
      scroll: 'Scroll to the next section',
    },
    marquee: 'Neighborhoods I cover in Niterói',
    problem: {
      eyebrow: 'Selling a home doesn’t have to be like this',
      title: 'You have no time to waste on people who are just *looking*.',
      pains: [
        { t: 'A stalled listing', d: 'Your home gets lost among thousands of identical photos on listing sites.' },
        { t: 'Visits that don’t buy', d: 'You open the door, tidy the house, and the person only wanted to look around.' },
        { t: 'Endless paperwork', d: 'Certificates, documents, the bank, the notary. It all lands on you.' },
      ],
      bridge: 'I do it differently. And it’s simple.',
    },
    turn: {
      eyebrow: 'The turning point',
      title: 'In the age of AI, *authenticity* is the funnel.',
      blocks: [
        { t: 'Me, my eye and your home.', d: 'Many owners expect a big production. I show up with my videographer and a careful eye. A lean crew, no forced script, just the truth.' },
        { t: 'People connect with real people.', d: 'Those who watch me trust what they see. That’s why your home isn’t just another listing: it’s a recommendation.' },
        { t: 'Wide visibility, the right way.', d: 'Your home reaches thousands of people looking for a place in Niterói, and many of them are ready to buy.' },
      ],
      quote: 'Simplicity attracts, authenticity sells, and being real builds trust.',
      rec: 'recording', comments: 'Comments', topReels: 'Most viewed reels',
      commentList: ['Such lovely light in this room', 'Can I book a visit?', 'Finally a video that shows the real home', 'Which floor? Love the balcony', 'Sent you a DM!'],
    },
    vitrine: {
      aria: 'The showcase', eyebrow: 'The showcase',
      title: 'This is how *your* home will be presented.',
      hintDesk: 'Hover to watch. Tap the icon to listen.',
      hintMob: 'Swipe to browse. Tap the icon to listen.',
      soundOn: 'Turn video sound on', soundOff: 'Turn video sound off',
      carousel: 'Property videos presented by Duda',
      next: 'Your home could be', nextEm: 'next',
    },
    how: {
      eyebrow: 'No hassle',
      title: 'From the first hello to the *keys in the buyer’s hand*.',
      step: 'Step',
      steps: [
        { t: 'You message me', d: 'One hello on WhatsApp and we set the best day for me to see your home.' },
        { t: 'I visit your home', d: 'I get to know every detail, understand your expectations and agree on a fair price for the neighborhood.' },
        { t: 'I film and promote', d: 'I make the video in person and put your home in my showcase, on Instagram and on the website.' },
        { t: 'I handle the rest', d: 'I screen buyers, follow up on visits, lead the negotiation and handle the paperwork through to signing.' },
      ],
      micro: 'Takes 1 minute. No commitment.',
    },
    bento: {
      eyebrow: 'For owners',
      title: 'Everything your home needs to *sell*.',
      video: ['An authentic video of your home', 'Filmed by me and my videographer, with a seller’s eye.'],
      vis: ['Wide visibility', 'One of the largest property showcases in Niterói.'],
      free: ['No exclusivity', 'You stay free.'],
      visits: ['Visits from people who want to buy', 'I screen them before booking.'],
      price: ['A market-aligned price', 'A read on the neighborhood during the visit.'],
      docs: ['Paperwork is on me', 'Documents, certificates and follow-up through to the deed.'],
      days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    },
    about: {
      eyebrow: 'Nice to meet you, I’m Duda',
      title: 'An agent who *knows every street* in Niterói.',
      photoAlt: 'Duda, real estate agent in Niterói',
      videoAlt: 'Duda, real estate agent in Niterói, crosses her arms and smiles',
      photoPh: 'Photo of Duda', signature: 'Duda’s signature',
    },
    testi: {
      eyebrow: 'Owners who sold with me', title: 'Owners who *trusted* me.',
      sold: (d) => `sold in ${d} days`, prev: 'Previous testimonial', next: 'Next testimonial',
      aria: 'Testimonials', video: 'Video testimonial (optional)',
    },
    faq: { title: 'Questions from people *selling*.', card1: 'Still have questions?', card2: 'Message me on WhatsApp.' },
    final: {
      title: 'Shall we put your home *in the showcase*?',
      sub: 'Message me on WhatsApp, we’ll book a visit and I’ll handle the rest.',
      micro: 'Monday to Friday, 9am to 6pm (Brasília time)',
    },
    footer: {
      tag: 'Your home deserves to be seen, not just listed.',
      contact: 'Contact', hours: 'Hours', hoursText: 'Mon–Fri, 9am–6pm',
      social: 'Social', site: 'See homes for sale', license: 'License',
      copy: 'Duda Corretora de Imóveis · Niterói/RJ',
      top: 'Back to top',
    },
  },
}

export function useT() {
  const { lang } = usePrefs()
  return STR[lang]
}

/* Lê um campo do config com versão em inglês opcional (campo_en). */
export function tx(obj, key, lang) {
  if (!obj) return ''
  return lang === 'en' && obj[`${key}_en`] ? obj[`${key}_en`] : obj[key]
}
