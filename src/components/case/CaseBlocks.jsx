import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

/**
 * Building blocks for case-study bodies.
 *
 * Content files compose these, so every project reads consistently and none of
 * them need custom CSS. Blocks receive already-resolved strings — the content
 * file decides what language it passes in — except where a block owns its own
 * chrome (image viewer labels, the expandable summary), which it resolves
 * itself. No block contains project-specific logic.
 */

/**
 * A titled section. `id` becomes an anchor target for the side nav.
 * `wide` drops the prose measure cap — use it for sections carrying
 * screenshots or wide visuals rather than long-form text.
 */
export function CaseSection({ id, eyebrow, title, wide = false, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-line py-12 first:border-0 first:pt-0"
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-semibold text-heading sm:text-3xl">{title}</h2>
      <div className={`prose-case mt-5 ${wide ? '' : 'max-w-3xl'}`}>{children}</div>
    </section>
  )
}

/** Headline numbers. Used in the case-study header and inline in sections. */
export function StatRow({ stats, className = '' }) {
  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-4 ${className}`}
    >
      {stats.map((s, i) => (
        <div key={i} className="bg-surface p-5">
          <dt className="text-xs uppercase tracking-wide text-muted">{s.label}</dt>
          <dd className="mt-2 text-xl font-semibold text-heading">{s.value}</dd>
          {s.note && <p className="mt-1 text-xs text-muted">{s.note}</p>}
        </div>
      ))}
    </dl>
  )
}

/** Compact inline figures — smaller than StatRow, for volume strips. */
export function FactStrip({ facts, className = '' }) {
  return (
    <dl className={`my-6 flex flex-wrap gap-x-8 gap-y-4 ${className}`}>
      {facts.map((f, i) => (
        <div key={i}>
          <dd className="text-lg font-semibold text-heading">{f.value}</dd>
          <dt className="text-xs text-muted">{f.label}</dt>
        </div>
      ))}
    </dl>
  )
}

/** Pulled-out insight, caveat, or result. */
export function Callout({ tone = 'accent', title, children }) {
  const tones = {
    accent: 'border-accent bg-accent-soft',
    warn: 'border-amber-500 bg-amber-500/5',
    neutral: 'border-line bg-panel',
  }
  return (
    <div className={`my-6 rounded-xl border-l-2 p-5 ${tones[tone]}`}>
      {title && <p className="font-semibold text-heading">{title}</p>}
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
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** A single-line architecture flow: A -> B -> C. */
export function FlowLine({ steps }) {
  return (
    <div className="my-6 flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className="rounded-lg bg-panel-2 px-3 py-1.5 text-sm font-medium text-heading ring-1 ring-line">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="text-faint">
              &rarr;
            </span>
          )}
        </span>
      ))}
    </div>
  )
}

/** Simple data table. `columns` are strings, `rows` are arrays of cells. */
export function DataTable({ columns, rows, caption }) {
  return (
    <figure className="my-6 overflow-x-auto rounded-xl ring-1 ring-line">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead className="bg-panel-2 text-xs uppercase tracking-wide text-muted">
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, i) => (
            <tr key={i} className="bg-panel">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${j === 0 ? 'text-heading' : 'text-body'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <figcaption className="border-t border-line bg-panel-2 px-4 py-2 text-xs text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** Code / DAX / SQL snippet. */
export function CodeBlock({ language = 'sql', code, caption }) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl ring-1 ring-line">
      <div className="flex items-center justify-between border-b border-line bg-panel-2 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wide text-muted">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto bg-panel p-4 text-[0.8rem] leading-relaxed">
        <code className="font-mono text-body">{code.trim()}</code>
      </pre>
      {caption && (
        <figcaption className="border-t border-line bg-panel-2 px-4 py-2 text-xs text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * Collapsed-by-default detail. Keeps long code out of the main reading flow
 * while leaving it one click away.
 */
export function Expandable({ label, children }) {
  const { t } = useLanguage()
  return (
    <details className="group my-6 overflow-hidden rounded-xl bg-panel ring-1 ring-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-heading transition hover:text-accent">
        {label ?? t('case.technicalDetails')}
        <span aria-hidden="true" className="text-muted transition group-open:rotate-180">
          &#9662;
        </span>
      </summary>
      <div className="border-t border-line px-5 pb-2">{children}</div>
    </details>
  )
}

/**
 * Full-screen viewer for a screenshot. Closes on Escape or a backdrop click,
 * locks background scrolling, and restores focus to the trigger on close.
 */
function Lightbox({ src, alt, caption, onClose }) {
  const { t } = useLanguage()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-surface/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t('case.closeViewer')}
        className="absolute right-4 top-4 rounded-lg bg-panel px-3 py-1.5 text-sm text-body ring-1 ring-line transition hover:text-heading"
      >
        &#10005;
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-line"
      />
      {caption && <p className="max-w-2xl text-center text-xs text-muted">{caption}</p>}
    </div>
  )
}

/**
 * Screenshot / visual placeholder.
 *
 * Pass the image's intrinsic `width`/`height` to size the frame by its own
 * aspect ratio — nothing is cropped and the space is reserved before the image
 * loads. Real screenshots are click-to-enlarge. Without `src` (or if it fails
 * to load) a labelled placeholder keeps the layout intact.
 */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  ratio = 'aspect-[16/9]',
  zoomable = true,
}) {
  const { t } = useLanguage()
  const [failed, setFailed] = useState(false)
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)

  const hasImage = Boolean(src) && !failed
  const natural = width && height
  const canZoom = hasImage && zoomable

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  const frame = (
    <div
      className={`shot-frame relative overflow-hidden rounded-xl bg-panel-2 ring-1 ring-line ${
        natural ? '' : ratio
      }`}
      style={natural ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="text-2xl" aria-hidden="true">
          &#128444;
        </span>
        <span className="text-xs text-muted">
          {alt} <span className="text-faint">{t('case.addScreenshot')}</span>
        </span>
      </div>
      {hasImage && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
      {canZoom && (
        <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-surface/85 px-2 py-1 text-xs text-body opacity-0 ring-1 ring-line transition group-hover:opacity-100">
          {t('case.clickToEnlarge')}
        </span>
      )}
    </div>
  )

  return (
    <figure className="my-6">
      {canZoom ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${t('case.enlargeImage')}: ${alt}`}
          className="group block w-full cursor-zoom-in rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {frame}
        </button>
      ) : (
        frame
      )}
      {caption && (
        <figcaption className="mt-2 text-xs text-muted">
          {caption}
          {canZoom && (
            <span className="text-faint"> &middot; {t('case.clickToEnlarge')}</span>
          )}
        </figcaption>
      )}
      {open && <Lightbox src={src} alt={alt} caption={caption} onClose={close} />}
    </figure>
  )
}

/**
 * Key-findings grid. Each finding is a claim, one line of body, and a piece
 * of evidence.
 */
export function FindingCards({ findings, columns = 2 }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }[columns]
  return (
    <ol className={`my-8 grid grid-cols-1 gap-4 ${cols}`}>
      {findings.map((f, i) => (
        <li key={i} className="flex flex-col rounded-xl bg-panel p-5 ring-1 ring-line">
          <span className="font-mono text-xs text-accent">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 font-semibold text-heading">{f.title}</h3>
          <p className="mt-2 flex-1 text-sm text-body">{f.body}</p>
          {f.evidence && (
            <p className="mt-3 border-t border-line pt-3 font-mono text-xs text-accent">
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
 * Series colours are validated as a categorical pair in both themes.
 */
export function CompareBars({ items, seriesA, seriesB }) {
  const legend = [
    { name: seriesA, color: 'bg-series-1' },
    { name: seriesB, color: 'bg-series-2' },
  ]

  return (
    <figure className="my-6 rounded-xl bg-panel p-5 ring-1 ring-line">
      <figcaption className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-body">
        {legend.map((s) => (
          <span key={s.name} className="inline-flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-sm ${s.color}`} aria-hidden="true" />
            {s.name}
          </span>
        ))}
      </figcaption>

      <div className="space-y-5">
        {items.map((item, idx) => {
          const max = Math.max(item.a, item.b) * 1.18
          const rows = [
            { value: item.a, color: 'bg-series-1', name: seriesA },
            { value: item.b, color: 'bg-series-2', name: seriesB },
          ]
          return (
            <div key={idx}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-heading">{item.label}</span>
                {item.note && (
                  <span className="shrink-0 text-xs text-muted">{item.note}</span>
                )}
              </div>
              <div className="mt-2 space-y-0.5">
                {rows.map((r) => (
                  <div key={r.name} className="flex items-center gap-3">
                    <div className="h-2.5 min-w-0 flex-1 rounded-sm bg-panel-2">
                      <div
                        className={`h-full rounded-sm ${r.color}`}
                        style={{ width: `${Math.max((r.value / max) * 100, 1.5)}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="w-16 shrink-0 text-right font-mono text-xs text-heading">
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
 * and a short caption.
 */
export function DashboardPage({
  number,
  name,
  question,
  src,
  alt,
  caption,
  width,
  height,
  shows,
  takeaway,
}) {
  const { t } = useLanguage()
  return (
    <section className="my-8 overflow-hidden rounded-xl bg-panel ring-1 ring-line">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line px-5 py-4">
        <span className="font-mono text-xs text-muted">
          {t('case.page')} {number}
        </span>
        {name && <span className="text-sm font-medium text-heading">{name}</span>}
        <h3 className="text-base font-semibold text-accent sm:text-lg">{question}</h3>
      </div>

      <div className="px-5 pb-5">
        <Figure src={src} alt={alt} caption={caption} width={width} height={height} />

        {shows?.length > 0 && (
          <div className="mt-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">
              {t('case.whatThisShows')}
            </p>
            <ul className="mt-2 space-y-1.5">
              {shows.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-body">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {takeaway && (
          <div className="mt-4 rounded-lg border-l-2 border-accent bg-accent-soft px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {t('case.keyTakeaway')}
            </p>
            <p className="mt-1 text-sm font-medium text-heading">{takeaway}</p>
          </div>
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
    <div className="my-6 rounded-xl border border-dashed border-line bg-panel p-10 text-center">
      <span className="text-3xl" aria-hidden="true">
        &#128202;
      </span>
      <p className="mt-3 font-semibold text-heading">{title}</p>
      {note && <p className="mx-auto mt-2 max-w-md text-sm text-muted">{note}</p>}
    </div>
  )
}
