import { useState } from 'react'

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
  // The placeholder is always rendered as the base layer and the image sits on
  // top of it. A screenshot that is missing, still loading, or broken therefore
  // degrades to the labelled placeholder rather than an empty box.
  const [failed, setFailed] = useState(false)

  return (
    <figure className="my-6">
      <div className={`relative overflow-hidden rounded-xl bg-ink-900 ring-1 ring-ink-800 ${ratio}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="text-2xl" aria-hidden="true">🖼️</span>
          <span className="text-xs text-ink-400">
            {alt} <span className="text-ink-500">(add screenshot)</span>
          </span>
        </div>
        {src && !failed && (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full bg-ink-900 object-cover"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {caption && <figcaption className="mt-2 text-xs text-ink-400">{caption}</figcaption>}
    </figure>
  )
}

/**
 * Key-findings grid — the recruiter-facing summary near the top of a case
 * study. Each finding is a numbered claim with one line of evidence.
 */
export function FindingCards({ findings }) {
  return (
    <ol className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {findings.map((f, i) => (
        <li
          key={f.title}
          className="flex flex-col rounded-xl bg-ink-900/50 p-5 ring-1 ring-ink-800"
        >
          <span className="font-mono text-xs text-accent-400">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 font-semibold text-ink-50">{f.title}</h3>
          <p className="mt-2 flex-1 text-sm text-ink-300">{f.body}</p>
          {f.evidence && (
            <p className="mt-3 border-t border-ink-800 pt-3 font-mono text-xs text-accent-400">
              {f.evidence}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}

/**
 * Paired comparison bars — one entity against a benchmark, per measure.
 * Both values are direct-labelled, so identity never rests on colour alone.
 * Series colours are validated as a categorical pair against the page surface.
 */
export function CompareBars({ items, seriesA, seriesB }) {
  const legend = [
    { name: seriesA, color: 'bg-series-1' },
    { name: seriesB, color: 'bg-series-2' },
  ]

  return (
    <figure className="my-6 rounded-xl bg-ink-900/40 p-5 ring-1 ring-ink-800">
      <figcaption className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-300">
        {legend.map((s) => (
          <span key={s.name} className="inline-flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-sm ${s.color}`} aria-hidden="true" />
            {s.name}
          </span>
        ))}
      </figcaption>

      <div className="space-y-5">
        {items.map((item) => {
          const max = Math.max(item.a, item.b) * 1.18
          const rows = [
            { value: item.a, color: 'bg-series-1', name: seriesA },
            { value: item.b, color: 'bg-series-2', name: seriesB },
          ]
          return (
            <div key={item.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-ink-200">{item.label}</span>
                {item.note && (
                  <span className="shrink-0 text-xs text-ink-400">{item.note}</span>
                )}
              </div>
              <div className="mt-2 space-y-0.5">
                {rows.map((r) => (
                  <div key={r.name} className="flex items-center gap-3">
                    <div className="h-2.5 min-w-0 flex-1 rounded-sm bg-ink-950/60">
                      <div
                        className={`h-full rounded-sm ${r.color}`}
                        style={{ width: `${Math.max((r.value / max) * 100, 1.5)}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="w-16 shrink-0 text-right font-mono text-xs text-ink-200">
                      {r.value}
                      {item.unit ?? ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </figure>
  )
}

/**
 * One page of a dashboard walkthrough: the question it answers, a screenshot,
 * and what the reader should take from it.
 */
export function DashboardPage({ number, question, title, src, alt, points }) {
  return (
    <section className="my-8 overflow-hidden rounded-xl bg-ink-900/40 ring-1 ring-ink-800">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-ink-800 px-5 py-4">
        <span className="font-mono text-xs text-ink-400">Page {number}</span>
        <h3 className="text-base font-semibold text-accent-400 sm:text-lg">{question}</h3>
      </div>
      <div className="p-5">
        <p className="text-sm font-medium text-ink-100">{title}</p>
        <Figure src={src} alt={alt} />
        {points?.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-ink-300">
            {points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

/**
 * Placeholder for a live embedded report. Renders an explanatory panel until a
 * real embed URL is supplied — it never fabricates one.
 */
export function EmbedPlaceholder({ title, note }) {
  return (
    <div className="my-6 rounded-xl border border-dashed border-ink-700 bg-ink-900/40 p-10 text-center">
      <span className="text-3xl" aria-hidden="true">
        📊
      </span>
      <p className="mt-3 font-semibold text-ink-100">{title}</p>
      {note && <p className="mx-auto mt-2 max-w-md text-sm text-ink-400">{note}</p>}
    </div>
  )
}
