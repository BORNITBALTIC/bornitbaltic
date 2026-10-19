import { cookies } from 'next/headers'

/**
 * Kataloogilehtede keel.
 *
 * Paise keelevalik (public/site.js) kirjutab valiku kupsisesse
 * `bornit_lang`. Serveripoolne renderdus loeb selle siit ja kysib
 * Payloadist sisu samas keeles. Payloadi seadistuses on fallback sees,
 * seega tolkimata vali tuleb eesti keeles.
 *
 * URLid jaavad koigis keeltes samaks, sest vana lehe aadressid on
 * Google'is indekseeritud.
 */
export const LOCALES = ['et', 'en', 'fi', 'lv', 'lt'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'et'

export const isLocale = (v: unknown): v is Locale =>
  typeof v === 'string' && (LOCALES as readonly string[]).includes(v)

export const getLocale = async (): Promise<Locale> => {
  const store = await cookies()
  const value = store.get('bornit_lang')?.value
  return isLocale(value) ? value : DEFAULT_LOCALE
}

type Dict = {
  home: string
  products: string
  productsLede: string
  categories: string
  description: string
  specs: string
  documents: string
  images: string
  drawings: string
  related: string
  askPrice: string
  empty: string
  breadcrumb: string
  productCount: (n: number) => string
  formEyebrow: string
  formHeading: string
  formLede: string
  fieldProduct: string
  fieldName: string
  fieldCompany: string
  fieldEmail: string
  fieldPhone: string
  fieldQuantity: string
  fieldMessage: string
  quantityHint: string
  send: string
  sending: string
  orCall: string
  sent: string
  thanks: string
  errName: string
  errEmail: string
  errMessage: string
  errGeneric: string
  ok: string
  docKinds: Record<string, string>
  pdf: string
}

const DICTS: Record<Locale, Dict> = {
  et: {
    home: 'Avaleht',
    products: 'Tooted',
    productsLede:
      'Kogu BORNIT®, GRÜN ja SILIKAL valik. Vali kategooria, iga toote juures on tehniline info, ohutuskaart ja hinnapäringu vorm.',
    categories: 'Tootekategooriad',
    description: 'Kirjeldus',
    specs: 'Tehnilised andmed',
    documents: 'Dokumendid',
    images: 'Pildid',
    drawings: 'Joonised ja illustratsioonid',
    related: 'Samast kategooriast',
    askPrice: 'Küsi hinnapäring',
    empty: 'Selles kategoorias pole veel tooteid.',
    breadcrumb: 'Asukoht',
    productCount: (n) => `${n} ${n === 1 ? 'toode' : 'toodet'}`,
    formEyebrow: 'Hinnapäring',
    formHeading: 'Küsi selle toote kohta',
    formLede: 'Saada kogus ja objekt, vastame hinna, saadavuse ja paigaldusnõuannetega.',
    fieldProduct: 'Toode',
    fieldName: 'Nimi',
    fieldCompany: 'Ettevõte',
    fieldEmail: 'E-post',
    fieldPhone: 'Telefon',
    fieldQuantity: 'Kogus',
    fieldMessage: 'Objekt ja küsimus',
    quantityHint: 'näiteks 200 l või 40 m2',
    send: 'Saada päring',
    sending: 'Saadan…',
    orCall: 'Või helista',
    sent: 'Saadetud',
    thanks: 'Aitah',
    errName: 'Palun sisesta oma nimi.',
    errEmail: 'Palun kontrolli e-posti aadressi.',
    errMessage: 'Palun kirjuta, mida vajad.',
    errGeneric: 'Midagi läks katki. Palun helista või kirjuta meilile.',
    ok: 'Aitah, päring on saadetud. Võtame ühendust esimesel võimalusel.',
    docKinds: {
      tehniline_info: 'Tehniline info',
      ohutuskaart: 'Ohutuskaart',
      infoleht: 'Infoleht',
      toimivusdeklaratsioon: 'Toimivusdeklaratsioon',
      kasutusjuhend: 'Kasutusjuhend',
      muu: 'Dokument',
    },
    pdf: 'PDF',
  },

  en: {
    home: 'Home',
    products: 'Products',
    productsLede:
      'The full BORNIT®, GRÜN and SILIKAL range. Pick a category: every product carries its technical data sheet, safety data sheet and an enquiry form.',
    categories: 'Product categories',
    description: 'Description',
    specs: 'Technical data',
    documents: 'Documents',
    images: 'Images',
    drawings: 'Drawings and illustrations',
    related: 'From the same category',
    askPrice: 'Request a quote',
    empty: 'No products in this category yet.',
    breadcrumb: 'Location',
    productCount: (n) => `${n} ${n === 1 ? 'product' : 'products'}`,
    formEyebrow: 'Enquiry',
    formHeading: 'Ask about this product',
    formLede: 'Send the quantity and the site, and we answer with price, availability and advice.',
    fieldProduct: 'Product',
    fieldName: 'Name',
    fieldCompany: 'Company',
    fieldEmail: 'Email',
    fieldPhone: 'Phone',
    fieldQuantity: 'Quantity',
    fieldMessage: 'Site and question',
    quantityHint: 'e.g. 200 l or 40 m2',
    send: 'Send enquiry',
    sending: 'Sending…',
    orCall: 'Or call',
    sent: 'Sent',
    thanks: 'Thank you',
    errName: 'Please enter your name.',
    errEmail: 'Please check the email address.',
    errMessage: 'Please tell us what you need.',
    errGeneric: 'Something went wrong. Please call or email us.',
    ok: 'Thank you, your enquiry has been sent. We will be in touch shortly.',
    docKinds: {
      tehniline_info: 'Technical data sheet',
      ohutuskaart: 'Safety data sheet',
      infoleht: 'Product leaflet',
      toimivusdeklaratsioon: 'Declaration of performance',
      kasutusjuhend: 'Instructions',
      muu: 'Document',
    },
    pdf: 'PDF',
  },

  fi: {
    home: 'Etusivu',
    products: 'Tuotteet',
    productsLede:
      'Koko BORNIT®-, GRÜN- ja SILIKAL-valikoima. Valitse ryhmä: jokaisella tuotteella on tekniset tiedot, käyttöturvallisuustiedote ja kyselylomake.',
    categories: 'Tuoteryhmät',
    description: 'Kuvaus',
    specs: 'Tekniset tiedot',
    documents: 'Asiakirjat',
    images: 'Kuvat',
    drawings: 'Piirustukset ja kuvitukset',
    related: 'Samasta ryhmästä',
    askPrice: 'Pyydä tarjous',
    empty: 'Tässä ryhmässä ei ole vielä tuotteita.',
    breadcrumb: 'Sijainti',
    productCount: (n) => `${n} ${n === 1 ? 'tuote' : 'tuotetta'}`,
    formEyebrow: 'Tarjouspyyntö',
    formHeading: 'Kysy tästä tuotteesta',
    formLede: 'Kerro määrä ja kohde, vastaamme hinnalla, saatavuudella ja asennusneuvoilla.',
    fieldProduct: 'Tuote',
    fieldName: 'Nimi',
    fieldCompany: 'Yritys',
    fieldEmail: 'Sähköposti',
    fieldPhone: 'Puhelin',
    fieldQuantity: 'Määrä',
    fieldMessage: 'Kohde ja kysymys',
    quantityHint: 'esim. 200 l tai 40 m2',
    send: 'Lähetä kysely',
    sending: 'Lähetetään…',
    orCall: 'Tai soita',
    sent: 'Lähetetty',
    thanks: 'Kiitos',
    errName: 'Syötä nimesi.',
    errEmail: 'Tarkista sähköpostiosoite.',
    errMessage: 'Kerro, mitä tarvitset.',
    errGeneric: 'Jokin meni vikaan. Soita tai lähetä sähköpostia.',
    ok: 'Kiitos, kysely on lähetetty. Olemme pian yhteydessä.',
    docKinds: {
      tehniline_info: 'Tekniset tiedot',
      ohutuskaart: 'Käyttöturvallisuustiedote',
      infoleht: 'Tuote-esite',
      toimivusdeklaratsioon: 'Suoritustasoilmoitus',
      kasutusjuhend: 'Käyttöohje',
      muu: 'Asiakirja',
    },
    pdf: 'PDF',
  },

  lv: {
    home: 'Sākums',
    products: 'Produkti',
    productsLede:
      'Viss BORNIT®, GRÜN un SILIKAL klāsts. Izvēlies kategoriju: katram produktam ir tehniskā datu lapa, drošības datu lapa un pieprasījuma forma.',
    categories: 'Produktu kategorijas',
    description: 'Apraksts',
    specs: 'Tehniskie dati',
    documents: 'Dokumenti',
    images: 'Attēli',
    drawings: 'Rasējumi un ilustrācijas',
    related: 'No tās pašas kategorijas',
    askPrice: 'Pieprasīt cenu',
    empty: 'Šajā kategorijā vēl nav produktu.',
    breadcrumb: 'Atrašanās vieta',
    productCount: (n) => {
      // lati keeles: 1, 21, 31 ... vienskaitlis; 0 ja 10, 20 ... genitiivs
      const mod10 = n % 10
      const mod100 = n % 100
      if (mod10 === 1 && mod100 !== 11) return `${n} produkts`
      if (mod10 === 0 || (mod100 >= 11 && mod100 <= 19)) return `${n} produktu`
      return `${n} produkti`
    },
    formEyebrow: 'Cenas pieprasījums',
    formHeading: 'Jautā par šo produktu',
    formLede:
      'Nosaki daudzumu un objektu, atbildēsim ar cenu, pieejamību un montāžas ieteikumiem.',
    fieldProduct: 'Produkts',
    fieldName: 'Vārds',
    fieldCompany: 'Uzņēmums',
    fieldEmail: 'E-pasts',
    fieldPhone: 'Tālrunis',
    fieldQuantity: 'Daudzums',
    fieldMessage: 'Objekts un jautājums',
    quantityHint: 'piem. 200 l vai 40 m2',
    send: 'Nosūtīt pieprasījumu',
    sending: 'Sūta…',
    orCall: 'Vai zvani',
    sent: 'Nosūtīts',
    thanks: 'Paldies',
    errName: 'Lūdzu ievadi savu vārdu.',
    errEmail: 'Lūdzu pārbaudi e-pasta adresi.',
    errMessage: 'Lūdzu uzraksti, kas nepieciešams.',
    errGeneric: 'Kaut kas nogāja greizi. Lūdzu zvani vai raksti e-pastu.',
    ok: 'Paldies, pieprasījums ir nosūtīts. Sazināsimies tuvinākā laikā.',
    docKinds: {
      tehniline_info: 'Tehniskā datu lapa',
      ohutuskaart: 'Drošības datu lapa',
      infoleht: 'Produkta buķlets',
      toimivusdeklaratsioon: 'Ekspluatācijas īpašību deklarācija',
      kasutusjuhend: 'Lietošanas instrukcija',
      muu: 'Dokuments',
    },
    pdf: 'PDF',
  },

  lt: {
    home: 'Pradžia',
    products: 'Produktai',
    productsLede:
      'Visas BORNIT®, GRÜN ir SILIKAL asortimentas. Pasirink kategoriją: prie kiekvieno produkto yra techniniai duomenys, saugos duomenų lapas ir užklausos forma.',
    categories: 'Produktų kategorijos',
    description: 'Aprašymas',
    specs: 'Techniniai duomenys',
    documents: 'Dokumentai',
    images: 'Nuotraukos',
    drawings: 'Brėžiniai ir iliustracijos',
    related: 'Iš tos pačios kategorijos',
    askPrice: 'Prašyti kainos',
    empty: 'Šioje kategorijoje produktų kol kas nėra.',
    breadcrumb: 'Vieta',
    productCount: (n) => {
      // leedu keeles: 1, 21 ... vienaskaita; 11-19 ja 10, 20 ... daugiskaitos kilmininkas
      const mod10 = n % 10
      const mod100 = n % 100
      if (mod10 === 1 && mod100 !== 11) return `${n} produktas`
      if (mod10 === 0 || (mod100 >= 11 && mod100 <= 19)) return `${n} produktų`
      return `${n} produktai`
    },
    formEyebrow: 'Kainos užklausa',
    formHeading: 'Klausk apie šį produktą',
    formLede:
      'Nurodyk kiekį ir objektą, atsakysime kaina, prieinamumu ir montavimo patarimais.',
    fieldProduct: 'Produktas',
    fieldName: 'Vardas',
    fieldCompany: 'Įmonė',
    fieldEmail: 'El. paštas',
    fieldPhone: 'Telefonas',
    fieldQuantity: 'Kiekis',
    fieldMessage: 'Objektas ir klausimas',
    quantityHint: 'pvz. 200 l arba 40 m2',
    send: 'Siųsti užklausą',
    sending: 'Siunčiama…',
    orCall: 'Arba skambink',
    sent: 'Išsiųsta',
    thanks: 'Ačiū',
    errName: 'Prašome įvesti vardą.',
    errEmail: 'Prašome patikrinti el. pašto adresą.',
    errMessage: 'Prašome parašyti, ko reikia.',
    errGeneric: 'Kai kas nepavyko. Prašome paskambinti arba parašyti el. paštu.',
    ok: 'Ačiū, užklausa išsiųsta. Susisieksime artimiausiu metu.',
    docKinds: {
      tehniline_info: 'Techniniai duomenys',
      ohutuskaart: 'Saugos duomenų lapas',
      infoleht: 'Produkto lankstinukas',
      toimivusdeklaratsioon: 'Eksploatacinių savybių deklaracija',
      kasutusjuhend: 'Naudojimo instrukcija',
      muu: 'Dokumentas',
    },
    pdf: 'PDF',
  },
}

export const dict = (locale: Locale): Dict => DICTS[locale] ?? DICTS[DEFAULT_LOCALE]

/** Kliendikomponentidele antakse ainult vajalikud stringid, mitte funktsioonid. */
export type FormStrings = {
  eyebrow: string
  heading: string
  lede: string
  product: string
  name: string
  company: string
  email: string
  phone: string
  quantity: string
  quantityHint: string
  message: string
  send: string
  sending: string
  orCall: string
  sent: string
  thanks: string
}

export const formStrings = (locale: Locale): FormStrings => {
  const d = dict(locale)
  return {
    eyebrow: d.formEyebrow,
    heading: d.formHeading,
    lede: d.formLede,
    product: d.fieldProduct,
    name: d.fieldName,
    company: d.fieldCompany,
    email: d.fieldEmail,
    phone: d.fieldPhone,
    quantity: d.fieldQuantity,
    quantityHint: d.quantityHint,
    message: d.fieldMessage,
    send: d.send,
    sending: d.sending,
    orCall: d.orCall,
    sent: d.sent,
    thanks: d.thanks,
  }
}
