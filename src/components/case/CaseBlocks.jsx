/**
 * Building blocks for case-study bodies.
 *
 * Case-study content files import from here and compose these — so every
 * project reads consistently and none of them need custom CSS.
 */

/** A titled section. `id` becomes an anchor target for the side nav. */
export function CaseSection({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-ink-800/80 py-12 first:border-0 first:pt-0">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-semibold text-ink-50 sm:text-3xl">{title}</h2>
      <div className="prose-case mt-5 max-w-3xl">{children}</div>
    </section>
  )
}

/** Headline numbers. Used in the case-study header and inline in sections. */
export function StatRow({ stats, className = '' }) {
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink-800 ring-1 ring-ink-800 sm:grid-cols-4 ${className}`}>
      {stats.map((s) => (
        <div key={s.label} className="bg-ink-950 p-5">
          <dt className="text-xs uppercase tracking-wide text-ink-400">{s.label}</dt>
          <dd className="mt-2 text-2xl font-semibold text-ink-50">{s.value}</dd>
          {s.note && <p className="mt-1 text-xs text-ink-400">{s.note}</p>}
        </div>
      ))}
    </dl>
  )
}

/** Pulled-out insight, caveat, or result. */
export function Callout({ tone = 'accent', title, children }) {
  const tones = {
    accent: 'border-accent-500/40 bg-accent-500/5',
    warn: 'border-amber-500/40 bg-amber-500/5',
    neutral: 'border-ink-700 bg-ink-900/60',
  }
  return (
    <div className={`my-6 rounded-xl border-l-2 p-5 ${tones[tone]}`}>
      {title && <p className="font-semibold text-ink-50">{title}</p>}
      <div className={`prose-case ${title ? 'mt-2' : ''}`}>{children}</div>
    </div>
  )
}

/** Bullet list with consistent markers. */
export function Bullets({ items }) {
  return (
    <ul className="my-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Numbered process steps (approach / methodology sections). */
export function Steps({ steps }) {
  return (
    <ol className="my-6 space-y-5">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-sm font-semibold text-accent-400 ring-1 ring-accent-500/30">
            {i + 1}
          </span>
          <div>
            <p className="font-semibold text-ink-50">{s.title}</p>
            <p className="mt-1 text-sm text-ink-300">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Simple data table. `columns` are strings, `rows` are arrays of cells. */
export function DataTable({ columns, rows, caption }) {
  return (
    <figure className="my-6 overflow-x-auto rounded-xl ring-1 ring-ink-800">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead className="bg-ink-900 text-xs uppercase tracking-wide text-ink-400">
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-800">
          {rows.map((row, i) => (
            <tr key={i} className="bg-ink-950/60">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? 'text-ink-100' : 'text-ink-300'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <figcaption className="border-t border-ink-800 bg-ink-900/40 px-4 py-2 text-xs text-ink-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** Code / DAX / SQL snippet. */
export function CodeBlock({ language = 'sql', code, caption }) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl ring-1 ring-ink-800">
      <div className="flex items-center justify-between border-b border-ink-800 bg-ink-900 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-400">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto bg-ink-950 p-4 text-[0.8rem] leading-relaxed">
        <code className="font-mono text-ink-200">{code.trim()}</code>
      </pre>
      {caption && (
        <figcaption className="border-t border-ink-800 bg-ink-900/40 px-4 py-2 text-xs text-ink-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * Screenshot / visual placeholder.
 * Drop a file in `public/projects/<slug>/` and pass `src` to show the real
 * image; without `src` it renders a labelled placeholder so the layout still
 * reads correctly before assets exist.
 */
export function Figure({ src, alt, caption, ratio = 'aspect-[16/9]' }) {
  return (
    <figure className="my-6">
      <div className={`overflow-hidden rounded-xl ring-1 ring-ink-800 ${ratio}`}>
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink-900 text-center">
            <span className="text-2xl" aria-hidden="true">🖼️</span>
            <span className="px-6 text-xs text-ink-400">
              {alt} <span className="text-ink-500">(add screenshot)</span>
            </span>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-2 text-xs text-ink-400">{caption}</figcaption>}
    </figure>
  )
}
