import type { Locale } from './i18n'

/**
 * Uute lehtede (Kasulikku, Tehtud tood) ja SEO tekstid.
 * Hoitud eraldi, et paamine sonastik jaaks loetavaks.
 */
type Extra = {
  siteTitle: string
  siteDescription: string
  works: string
  worksLede: string
  allWorks: string
  posts: string
  postsLede: string
  readMore: string
  backToPosts: string
  productsTitle: string
  productsDescription: string
}

const EXTRA: Record<'et' | 'en' | 'fi' | 'lv', Extra> = {
  et: {
    siteTitle: 'Bornit Baltic | BORNIT® esindaja Baltikumis ja Soomes',
    siteDescription:
      'Bituumenmaterjalide projektimüük ja paigaldus: hüdroisolatsioon, vuugitihendus, teedeehitusmaterjalid ja märgistus. Tehniline info ja hinnapäring iga toote juures.',
    works: 'Tehtud tööd',
    worksLede: 'Objektid, kus Bornit Balticu materjalid ja paigaldus on juba töös.',
    allWorks: 'Vaata kõiki töid',
    posts: 'Kasulikku',
    postsLede: 'Juhendid ja nõuanded bituumenmaterjalide valimiseks ja paigaldamiseks.',
    readMore: 'Loe edasi',
    backToPosts: 'Kõik artiklid',
    productsTitle: 'Tooted',
    productsDescription:
      'BORNIT®, GRÜN ja SILIKAL tooted: hüdroisolatsioon, vuugitihendus, teedeehitus, katuse saneerimine ja markeerimine.',
  },
  en: {
    siteTitle: 'Bornit Baltic | BORNIT® representative in the Baltics and Finland',
    siteDescription:
      'Bitumen materials for projects, with installation: waterproofing, joint sealing, road construction materials and marking. Technical data and a quote form for every product.',
    works: 'Projects',
    worksLede: 'Sites where Bornit Baltic materials and installation are already at work.',
    allWorks: 'See all projects',
    posts: 'Useful',
    postsLede: 'Guides and advice on choosing and installing bitumen materials.',
    readMore: 'Read more',
    backToPosts: 'All articles',
    productsTitle: 'Products',
    productsDescription:
      'BORNIT®, GRÜN and SILIKAL products: waterproofing, joint sealing, road construction, roof renovation and marking.',
  },
  fi: {
    siteTitle: 'Bornit Baltic | BORNIT®-edustaja Baltiassa ja Suomessa',
    siteDescription:
      'Bitumimateriaalien projektimyynti ja asennus: vedeneristys, saumaus, tienrakennusmateriaalit ja merkinnät. Tekniset tiedot ja tarjouspyyntö jokaisen tuotteen kohdalla.',
    works: 'Toteutetut kohteet',
    worksLede: 'Kohteet, joissa Bornit Balticin materiaalit ja asennus ovat jo käytössä.',
    allWorks: 'Katso kaikki kohteet',
    posts: 'Hyödyllistä',
    postsLede: 'Ohjeita ja neuvoja bitumimateriaalien valintaan ja asennukseen.',
    readMore: 'Lue lisää',
    backToPosts: 'Kaikki artikkelit',
    productsTitle: 'Tuotteet',
    productsDescription:
      'BORNIT®-, GRÜN- ja SILIKAL-tuotteet: vedeneristys, saumaus, tienrakennus, kattosaneeraus ja merkinnät.',
  },
  lv: {
    siteTitle: 'Bornit Baltic | BORNIT® pārstāvis Baltijā un Somijā',
    siteDescription:
      'Bitumena materiālu projektu tirdzniecība un uzstādīšana: hidroizolācija, šuvju blīvēšana, ceļu būves materiāli un marķējums. Tehniskie dati un cenu pieprasījums katram produktam.',
    works: 'Paveiktie darbi',
    worksLede: 'Objekti, kuros Bornit Baltic materiāli un uzstādīšana jau darbojas.',
    allWorks: 'Skatīt visus darbus',
    posts: 'Noderīgi',
    postsLede: 'Padomi bitumena materiālu izvēlei un uzstādīšanai.',
    readMore: 'Lasīt vairāk',
    backToPosts: 'Visi raksti',
    productsTitle: 'Produkti',
    productsDescription:
      'BORNIT®, GRÜN un SILIKAL produkti: hidroizolācija, šuvju blīvēšana, ceļu būve, jumtu renovācija un marķējums.',
  },
}

export const extra = (locale: Locale): Extra =>
  EXTRA[(locale in EXTRA ? locale : 'et') as keyof typeof EXTRA]
