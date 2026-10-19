import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Teine parandus: eelmised votmed (aA..aZ, aa..az) sorteeruvad Postgresi
 * en_US collationis vaheldumisi. Siin on votmed ainult numbritega. Siin votame iga toote eestikeelse pealkirja uks kord ja sorteerime
 * Node'is eesti keele reeglite jargi.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  const res = (await db.execute(sql`
    SELECT DISTINCT ON (p.id) p.id, l.title
    FROM products p
    LEFT JOIN products_locales l ON l._parent_id = p.id AND l._locale = 'et'
    ORDER BY p.id, l.id
  `)) as unknown as { rows: { id: number; title: string | null }[] }
  const rows = [...(res.rows ?? [])]
  const collator = new Intl.Collator('et', { sensitivity: 'base', numeric: true })
  rows.sort((a, b) => collator.compare(a.title ?? '￿', b.title ?? '￿') || a.id - b.id)

  // Ainult numbrid parast 'a0', et Postgresi en_US collation (aA < aa < aB) jarjekorda
  // segi ei ajaks. Kuju a0NNN1 on kehtiv fractional-indexing voti (ei lope nulliga)
  // ja uued tooted saavad Payloadilt 'a1', mis jaab koigi nende jarele.
  const keyFor = (i: number) => 'a0' + String(i).padStart(4, '0') + '1'
  for (let i = 0; i < rows.length; i++) {
    await db.execute(sql`UPDATE products SET _order = ${keyFor(i)} WHERE id = ${rows[i].id}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // jarjekorra vaartused jaavad; tagasi poordumisel pole midagi lohkuda
}
