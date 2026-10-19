import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_documents_language" AS ENUM('et', 'en', 'fi', 'lv', 'lt', 'de', 'muu');
  CREATE TYPE "public"."enum__products_v_version_documents_language" AS ENUM('et', 'en', 'fi', 'lv', 'lt', 'de', 'muu');
  ALTER TABLE "products_documents" ADD COLUMN "language" "enum_products_documents_language" DEFAULT 'et';
  ALTER TABLE "_products_v_version_documents" ADD COLUMN "language" "enum__products_v_version_documents_language" DEFAULT 'et';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_documents" DROP COLUMN "language";
  ALTER TABLE "_products_v_version_documents" DROP COLUMN "language";
  DROP TYPE "public"."enum_products_documents_language";
  DROP TYPE "public"."enum__products_v_version_documents_language";`)
}
