import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_content_services_icon" AS ENUM('i-truck', 'i-hand', 'i-gear', 'i-doc', 'i-hydro', 'i-road', 'i-joint', 'i-roof', 'i-tool', 'i-spray', 'i-marking');
  CREATE TABLE "products_drawings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer
  );
  
  CREATE TABLE "products_drawings_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_products_v_version_drawings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_drawings_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_content_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_site_content_services_icon" DEFAULT 'i-doc'
  );
  
  CREATE TABLE "site_content_services_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "site_content_works_locales" (
  	"title" varchar NOT NULL,
  	"meta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_content_locales" (
  	"services_title" varchar,
  	"works_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "products" ADD COLUMN "_order" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version__order" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "redirects_id" integer;
  ALTER TABLE "products_drawings" ADD CONSTRAINT "products_drawings_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_drawings" ADD CONSTRAINT "products_drawings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_drawings_locales" ADD CONSTRAINT "products_drawings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_drawings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_drawings" ADD CONSTRAINT "_products_v_version_drawings_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_drawings" ADD CONSTRAINT "_products_v_version_drawings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_drawings_locales" ADD CONSTRAINT "_products_v_version_drawings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_drawings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_services" ADD CONSTRAINT "site_content_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_services_locales" ADD CONSTRAINT "site_content_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_works" ADD CONSTRAINT "site_content_works_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content_works" ADD CONSTRAINT "site_content_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_works_locales" ADD CONSTRAINT "site_content_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_locales" ADD CONSTRAINT "site_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_drawings_order_idx" ON "products_drawings" USING btree ("_order");
  CREATE INDEX "products_drawings_parent_id_idx" ON "products_drawings" USING btree ("_parent_id");
  CREATE INDEX "products_drawings_file_idx" ON "products_drawings" USING btree ("file_id");
  CREATE UNIQUE INDEX "products_drawings_locales_locale_parent_id_unique" ON "products_drawings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_drawings_order_idx" ON "_products_v_version_drawings" USING btree ("_order");
  CREATE INDEX "_products_v_version_drawings_parent_id_idx" ON "_products_v_version_drawings" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_drawings_file_idx" ON "_products_v_version_drawings" USING btree ("file_id");
  CREATE UNIQUE INDEX "_products_v_version_drawings_locales_locale_parent_id_unique" ON "_products_v_version_drawings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "site_content_services_order_idx" ON "site_content_services" USING btree ("_order");
  CREATE INDEX "site_content_services_parent_id_idx" ON "site_content_services" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_content_services_locales_locale_parent_id_unique" ON "site_content_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_content_works_order_idx" ON "site_content_works" USING btree ("_order");
  CREATE INDEX "site_content_works_parent_id_idx" ON "site_content_works" USING btree ("_parent_id");
  CREATE INDEX "site_content_works_image_idx" ON "site_content_works" USING btree ("image_id");
  CREATE UNIQUE INDEX "site_content_works_locales_locale_parent_id_unique" ON "site_content_works_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_content_locales_locale_parent_id_unique" ON "site_content_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products__order_idx" ON "products" USING btree ("_order");
  CREATE INDEX "_products_v_version_version__order_idx" ON "_products_v" USING btree ("version__order");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");`)

  // Olemasolevad tooted saavad jarjekorra praeguse (tahestikulise) seisu jargi,
  // et admini lohistamine ja lehtede sort alustaksid samast punktist.
  // Voti on fractional-indexing kujul (a0..az, b00..), millega Payload ise edasi tootab.
  const rows = (await db.execute(sql`
    SELECT p.id FROM products p
    LEFT JOIN products_locales l ON l._parent_id = p.id AND l._locale = 'et'
    ORDER BY l.title NULLS LAST, p.id
  `)) as unknown as { rows: { id: number }[] }
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const keyFor = (i: number) =>
    i < 62 ? 'a' + digits[i] : 'b' + digits[Math.floor((i - 62) / 62)] + digits[(i - 62) % 62]
  let i = 0
  for (const row of rows.rows ?? []) {
    await db.execute(sql`UPDATE products SET _order = ${keyFor(i)} WHERE id = ${row.id}`)
    i += 1
  }

  // Avalehe teenused ja tehtud tood: template'i senine sisu administ muudetavaks.
  try {
    const works: { file: string; alt: string; title: string; meta: string }[] = [
      { file: 'too-parkla.webp', alt: 'Kaubanduskeskuse parkla uue asfaldi ja markeeringutega', title: 'Kaubanduskeskuse parkla', meta: 'Vuugiliim, praosaneerimine ja märgistus — Harjumaa' },
      { file: 'too-kelder.webp', alt: 'Korterelamu keldriseina bituumenhüdroisolatsioon', title: 'Korterelamu keldri renoveerimine', meta: 'Vundamendi hüdroisolatsioon pakskihtmassiga — Tartu' },
      { file: 'too-viadukt.webp', alt: 'Viadukti katendi hüdroisolatsiooni rullmaterjal', title: 'Viadukti katendi hüdroisolatsioon', meta: 'Bituumenmembraan ja vuugitihendus — Ida-Virumaa' },
    ]
    const path = await import('path')
    const fs = await import('fs')
    const worksData: { image: number; title: string; meta: string }[] = []
    for (const w of works) {
      const filePath = path.resolve(process.cwd(), 'public', 'img', w.file)
      if (!fs.existsSync(filePath)) continue
      const media = await payload.create({ collection: 'media', data: { alt: w.alt }, filePath, req })
      worksData.push({ image: media.id as number, title: w.title, meta: w.meta })
    }
    await payload.updateGlobal({
      slug: 'site-content',
      locale: 'et',
      req,
      data: {
        servicesTitle: 'Müüme materjali ja paigaldame selle ise',
        services: [
          { icon: 'i-truck', title: 'Projektimüük', text: 'Valime objektile sobiva materjali, arvutame kulu ja tarnime otse platsile.' },
          { icon: 'i-hand', title: 'Paigaldus', text: 'Teostame müüdavate materjalide paigaldustöid: hüdroisolatsioon, vuugid, praod, märgistus.' },
          { icon: 'i-gear', title: 'Seadmed', text: 'Vuugiliimi ja praomastiksi paigaldusseadmed ning bituumenikatlad — müügiks ja rendiks.' },
          { icon: 'i-doc', title: 'Tehniline nõustamine', text: 'Andmelehed, kulunormid ja paigaldusjuhised sinu keeles, enne kui tellid.' },
        ],
        worksTitle: 'Objektid, kus materjal on juba töös',
        works: worksData,
      },
    })
  } catch (err) {
    payload.logger.warn({ err }, 'Avalehe sisu algvaartusi ei saanud luua, leht kasutab template teksti')
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_drawings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_drawings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_drawings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_drawings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "redirects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_works_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_drawings" CASCADE;
  DROP TABLE "products_drawings_locales" CASCADE;
  DROP TABLE "_products_v_version_drawings" CASCADE;
  DROP TABLE "_products_v_version_drawings_locales" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "site_content_services" CASCADE;
  DROP TABLE "site_content_services_locales" CASCADE;
  DROP TABLE "site_content_works" CASCADE;
  DROP TABLE "site_content_works_locales" CASCADE;
  DROP TABLE "site_content" CASCADE;
  DROP TABLE "site_content_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_redirects_fk";
  
  DROP INDEX "products__order_idx";
  DROP INDEX "_products_v_version_version__order_idx";
  DROP INDEX "payload_locked_documents_rels_redirects_id_idx";
  ALTER TABLE "products" DROP COLUMN "_order";
  ALTER TABLE "_products_v" DROP COLUMN "version__order";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "redirects_id";
  DROP TYPE "public"."enum_site_content_services_icon";`)
}
