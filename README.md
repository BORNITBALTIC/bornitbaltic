# Bornit Baltic

Payload CMS ja avalik leht. Avaleht on kliendi kinnitatud kujundus muutmata kujul,
tootekataloog tuleb Payloadist ja on Marekile hallatav.

## Mis kus on

```
src/
  app/(frontend)/            avalik leht
    page.tsx                 avaleht (kujundus src/template/home.html sees)
    tooted/                  toodete avaleht ja tootelehed
    tootekategooria/         kategoorialehed
    paring/saada/route.ts    avalehe vormi vastuvotja
    styles.css               templatei CSS muutmata
    catalog.css              kataloogilehtede CSS
  app/(payload)/             Payloadi admin ja API (genereeritud)
  collections/               Tooted, Tootekategooriad, Failid, Paringud, Kasutajad
  lib/                       andmeparingud, paringuloogika, templatei osad
  template/                  avalehe kujunduse osad (pais, jalus, ikoonid, sisu)
scripts/
  import-bornit.ts           vana lehe sisu import (idempotentne)
  seed-admin.ts              esimene admin kasutaja
  stats.ts                   ulevaade andmebaasist
public/site.js               templatei JavaScript
```

## URLid

Vana lehe URLid on alles, sest domeen on Google'is indekseeritud:

| Leht | URL |
| --- | --- |
| Tooted | `/tooted` |
| Kategooria | `/tootekategooria/<kategooria>[/<alamkategooria>]` |
| Toode | `/tooted/<kategooria>[/<alamkategooria>]/<toote-slug>` |
| Admin | `/admin` |

## Kohalik arendus

```bash
npm install
cp .env.example .env        # tapida PAYLOAD_SECRET
npm run dev                 # http://localhost:3000
```

`DATABASE_URI` tuhjaks jattes kasutatakse kohalikku SQLitet (`.bornit.db`).
Postgresi aadressi lisades laheb sama kood Postgresile.

Esimene kasutaja:

```bash
ADMIN_EMAIL=marek@bornitbaltic.ee ADMIN_PASSWORD=... npm run seed:admin
```

## Sisu import vanalt lehelt

Andmed loetakse valja vana WooCommerce lehe avalikust Store APIst.

```bash
python tools/bornit_scrape.py --media    # WATi juurkaustas: .tmp/bornit/ alla
npm run import:bornit                    # Payloadi
npm run stats                            # kontroll
```

Import on idempotentne: kordusjooks uuendab olemasolevaid kirjeid
(`wcId` toodetel ja kategooriatel, `legacyUrl` failidel).

## Railway

1. Lisa projekti **PostgreSQL** ja vota selle `DATABASE_URL`.
2. Lisa teenusele **Volume**, uhenduspunkt `/app/media`.
3. Keskkonnamuutujad:

   | Muutuja | Vaartus |
   | --- | --- |
   | `DATABASE_URI` | Postgresi aadress |
   | `PAYLOAD_SECRET` | juhuslik 64 margiline string |
   | `NEXT_PUBLIC_SERVER_URL` | `https://bornitbaltic.ee` |
   | `MEDIA_DIR` | `/app/media` |
   | `PAYLOAD_DB_PUSH` | `true` esimesel deployl, seejarel `false` |
   | `INQUIRY_TO` | `marek@bornitbaltic.ee` |
   | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | meiliteenuse andmed |

4. Esimese deploy jarel loo admin ja jooksuta import.

Ilma SMTP andmeteta paring salvestub Payloadi, aga meili valja ei lahe.
Kirjad kaivad aadressile `INQUIRY_TO`.

## Vormid

Molemad vormid (avalehe hinnaparing ja tootelehe paring) kaivad labi
`src/lib/inquiry.ts`, salvestuvad kollektsiooni **Paringud** ja saadavad
meili. Nii ei kao paring ara ka siis, kui meiliteenus on maas.
