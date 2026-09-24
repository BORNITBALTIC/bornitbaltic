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

Toodete ja kategooriate andmed on repos: `data/bornit/products.json` ja
`categories.json`. Need on valja loetud vana lehe avalikust WooCommerce
Store APIst.

Import serveris (pildid ja PDFid tommatakse vanalt lehelt):

```bash
npm run import:bornit
npm run stats
```

Andmete uuesti valjalugemine (WATi juurkaustas, kui vana leht on muutunud):

```bash
python tools/bornit_scrape.py --media    # .tmp/bornit/ alla
cp .tmp/bornit/{products,categories}.json bornitbaltic/data/bornit/
```

Kui `.tmp/bornit/media` on olemas, voetakse failid sealt, muidu laetakse
igauks vanalt lehelt alla. Import on idempotentne: kordusjooks uuendab
olemasolevaid kirjeid (`wcId` toodetel ja kategooriatel, `legacyUrl`
failidel), nii et seda voib ohutult korrata.

Kontrolltooriistad:

```bash
python tools/bornit_check.py    # brauseris: ekraanipildid, konsool, vorm
python tools/bornit_urls.py     # koik 178 vana URLi peavad andma 200
```

## Railway

Projekt on juba pusti: teenused `web` (see repo) ja `postgres`, molemal
oma ketas. `web` ketas on `/app/media`, seal elavad pildid ja PDFid.

**Skeem kaib migratsioonidega.** Payload teeb automaatse `push`i ainult
arenduses, tootmises mitte. Kui kollektsioone muudad:

```bash
# 1. ava Postgresile ajutine avalik port (Railway UIs: postgres -> Settings -> Networking
#    -> TCP Proxy, port 5432). Peale tood sulge see uuesti.
# 2. genereeri migratsioon selle vastu
DATABASE_URI=postgresql://postgres:...@<proxy>:<port>/railway PAYLOAD_MIGRATING=true   npx payload migrate:create --name mis-muutus
git add src/migrations && git commit && git push
```

Teenuse `preDeployCommand` on `npm run payload migrate`, seega uus
migratsioon jookseb automaatselt enne iga kaivitust.

Keskkonnamuutujad (`web`):

| Muutuja | Selgitus |
| --- | --- |
| `DATABASE_URI` | `postgresql://postgres:...@postgres.railway.internal:5432/railway` |
| `PAYLOAD_SECRET` | krypteerimisvoti |
| `NEXT_PUBLIC_SERVER_URL` | avalik aadress |
| `MEDIA_DIR` | `/app/media` (ketta uhenduspunkt) |
| `INQUIRY_TO` | `marek@bornitbaltic.ee` |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | esimese kasutaja loomiseks |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | meiliteenus |

Ilma SMTP andmeteta paring salvestub Payloadi, aga kirja valja ei lahe.

**Sisu uuesti importimine serveris**: sea muutuja `RUN_IMPORT=true` ja tee
deploy. `scripts/start.mjs` kaivitab serveri ja laseb impordi taustal, kus
ketas `/app/media` on kylge pandud. Peale tood sea `RUN_IMPORT=false`.
Import tombab pildid ja PDFid vanalt lehelt ja on idempotentne: olemasolev
kirje uuendatakse, puuduv fail laetakse uuesti.

Eeldeploy (`preDeployCommand`) ei sobi impordiks, sest seal ei ole ketast
veel kylge pandud ja failid kaoksid.

**Oma domeen**: lisa `web` teenusele custom domain bornitbaltic.ee ja
suuna DNS Railway peale. Seejarel muuda `NEXT_PUBLIC_SERVER_URL`.

## Vormid

Molemad vormid (avalehe hinnaparing ja tootelehe paring) kaivad labi
`src/lib/inquiry.ts`, salvestuvad kollektsiooni **Paringud** ja saadavad
meili. Nii ei kao paring ara ka siis, kui meiliteenus on maas.
