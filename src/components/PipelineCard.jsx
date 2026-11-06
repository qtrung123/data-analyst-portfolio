import site from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * Dark architecture card for the hero. Always dark, in both themes, so it
 * reads as a "window" onto the work. All content comes from site.pipeline.
 */
function Link() {
  // Vertical connector with a glowing node.
  return (
    <div aria-hidden="true" className="relative mx-auto h-5 w-px bg-white/15">
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400 shadow-[0_0_8px_2px_rgba(129,140,248,0.7)]" />
    </div>
  )
}

function Block({ label, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="font-mono text-[0.62rem] uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-100">{children}</p>
    </div>
  )
}

export default function PipelineCard({ className = '' }) {
  const { tr } = useLanguage()
  const p = site.pipeline

  return (
    <figure
      className={`rounded-2xl border border-white/10 bg-[#12141f] p-5 shadow-[0_30px_60px_-24px_rgba(18,20,31,0.7)] ${className}`}
    >
      <figcaption className="flex items-center justify-between gap-3 font-mono text-[0.62rem] uppercase tracking-widest text-slate-400">
        <span>{tr(p.title)}</span>
        <span className="inline-flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          {tr(p.badge)}
        </span>
      </figcaption>

      <div className="mt-4">
        <Block label={tr(p.source.label)}>{tr(p.source.text)}</Block>
        <Link />
        <Block label={tr(p.load.label)}>{tr(p.load.text)}</Block>
        <Link />
        <div className="grid grid-cols-3 gap-2">
          {p.steps.map((step) => (
            <div
              key={step.sub}
              className="rounded-xl border border-indigo-400/30 bg-indigo-400/[0.08] px-2 py-3 text-center"
            >
              <p className="text-xs font-semibold text-slate-100">{tr(step.title)}</p>
              <p className="mt-1 font-mono text-[0.58rem] leading-tight text-slate-400">{step.sub}</p>
            </div>
          ))}
        </div>
        <Link />
        <div className="rounded-xl border border-indigo-400/40 bg-indigo-400/[0.12] px-4 py-3">
          <p className="font-mono text-[0.62rem] uppercase tracking-widest text-indigo-300">
            {tr(p.out.label)}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-50">{tr(p.out.text)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-400">{tr(p.caption)}</p>
    </figure>
  )
}
