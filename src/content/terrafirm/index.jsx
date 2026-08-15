import {
  CaseSection,
  Callout,
  Bullets,
  Steps,
  DataTable,
  CodeBlock,
  Figure,
} from '../../components/case/CaseBlocks.jsx'

/* ------------------------------------------------------------------
   Card + case-study header metadata.
   NOTE: the numbers below are placeholders — replace them with the
   real figures from your Power BI project before publishing.
   ------------------------------------------------------------------ */
export const meta = {
  slug: 'terrafirm-safety-analytics',
  title: 'TerraFirm Safety Analytics',
  subtitle: 'A Power BI safety intelligence platform for a multi-site construction operator',
  summary:
    'TerraFirm tracked incidents across sites in spreadsheets that nobody reconciled. I rebuilt the reporting on a proper star schema and shipped a Power BI model that answers one question per page: where are we getting hurt, why, and is it getting worse?',
  category: 'Business Intelligence',
  year: '2025',
  status: 'flagship',
  featured: true,
  tools: ['Power BI', 'DAX', 'Power Query (M)', 'SQL', 'Star schema', 'RLS'],
  metrics: [
    { label: 'Sites covered', value: '12', note: 'consolidated into one model' },
    { label: 'Incident records', value: '18k+', note: 'across 3 years' },
    { label: 'Reporting time', value: '−90%', note: '2 days → ~2 hours monthly' },
    { label: 'Report pages', value: '6', note: 'one question each' },
  ],
  cover: { from: '#0c4a6e', to: '#082f49', glyph: '🦺' },
  links: [
    // Add the real repo / published report links here.
    { label: 'Power BI repository', href: 'https://github.com/' },
  ],
  sections: [
    { id: 'context', label: 'Context' },
    { id: 'problem', label: 'The problem' },
    { id: 'data', label: 'Data & modelling' },
    { id: 'measures', label: 'Measures' },
    { id: 'report', label: 'Report design' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'lessons', label: 'What I would change' },
  ],
}

export default function TerraFirmCaseStudy() {
  return (
    <>
      <CaseSection id="context" eyebrow="Context" title="A safety team reporting from twelve spreadsheets">
        <p>
          TerraFirm is a construction operator running work across a dozen active
          sites. Every site logged safety events — near misses, first aid cases,
          lost-time injuries, toolbox talks — but each logged them into its own
          workbook, with its own column names and its own idea of what counted as
          an "incident".
        </p>
        <p>
          Head office produced a monthly safety pack by copying those workbooks
          into a master sheet by hand. By the time the pack landed, the numbers
          were three weeks old and the safety manager could not answer the one
          question the board kept asking: <strong>is this getting better or worse,
          and where?</strong>
        </p>
      </CaseSection>

      <CaseSection id="problem" eyebrow="Problem" title="What was actually broken">
        <Bullets
          items={[
            'No shared definitions — "near miss" meant different things at different sites, so totals were not comparable.',
            'No exposure denominator. Raw incident counts made the biggest site look like the most dangerous one, when per-hours-worked it was among the safest.',
            'Manual consolidation ate roughly two working days a month and introduced copy-paste errors nobody could audit.',
            'Lagging indicators only. The pack counted injuries after they happened and said nothing about the leading signals that precede them.',
          ]}
        />
        <Callout tone="warn" title="The framing that changed the build">
          The ask was "make a dashboard of our incident numbers". The useful
          version was "tell a site manager which of their hazards to fix next".
          That reframing is why the model carries hours worked and hazard
          categories, not just an incident count.
        </Callout>
      </CaseSection>

      <CaseSection id="data" eyebrow="Data & modelling" title="From flat sheets to a star schema">
        <p>
          Everything funnels through Power Query into a conventional star: one
          incident fact table at the grain of <code>one row per reported event</code>,
          one site-month fact table carrying hours worked as the exposure
          denominator, and conformed dimensions shared between them.
        </p>

        <DataTable
          caption="Core model. Both fact tables filter through the same Date and Site dimensions, so a single slicer drives the whole report."
          columns={['Table', 'Type', 'Grain', 'Notes']}
          rows={[
            ['Fact_Incident', 'Fact', 'One row per reported event', 'Severity, hazard type, body part, cost, lost days'],
            ['Fact_Exposure', 'Fact', 'One row per site per month', 'Hours worked, headcount — the TRIR denominator'],
            ['Dim_Date', 'Dimension', 'One row per day', 'Marked as date table; fiscal year columns'],
            ['Dim_Site', 'Dimension', 'One row per site', 'Region, project type, site manager'],
            ['Dim_Hazard', 'Dimension', 'One row per hazard category', 'Mapped from free-text via a lookup table'],
            ['Dim_Severity', 'Dimension', 'One row per severity level', 'Sort order column for correct axis ordering'],
          ]}
        />

        <Steps
          steps={[
            {
              title: 'Land the raw sheets unchanged',
              body: 'Each site workbook is ingested as-is into a staging query. Nothing is cleaned at this stage, so I can always trace a number back to the row the site actually typed.',
            },
            {
              title: 'Normalise the vocabulary',
              body: 'A hand-maintained mapping table translates each site’s free-text hazard and severity labels into the shared taxonomy. Unmapped values fail loudly into an "Unclassified" bucket rather than silently disappearing.',
            },
            {
              title: 'Conform the dimensions',
              body: 'Site codes were inconsistent across workbooks, so Dim_Site is authored centrally and the fact tables join to it by surrogate key. Rows that fail to match are surfaced on a data-quality page.',
            },
            {
              title: 'Add the exposure fact',
              body: 'Hours worked comes from the payroll extract at site-month grain. This is the single change that made cross-site comparison honest.',
            },
          ]}
        />

        <Callout tone="neutral" title="Why two fact tables instead of one wide table">
          Incidents and hours worked live at different grains — events versus
          site-months. Flattening them into one table would have double-counted
          hours on every incident row. Keeping them separate and letting the
          shared dimensions do the filtering is what makes the rate measures
          correct at every level of the hierarchy.
        </Callout>
      </CaseSection>

      <CaseSection id="measures" eyebrow="Measures" title="The DAX that carries the report">
        <p>
          Almost all of the analytical weight sits in a small set of base
          measures; everything on the report is a variation on these.
        </p>

        <CodeBlock
          language="dax"
          caption="TRIR — the industry-standard recordable incident rate, normalised to 200,000 hours worked."
          code={`TRIR =
VAR Recordables =
    CALCULATE (
        COUNTROWS ( Fact_Incident ),
        Dim_Severity[IsRecordable] = TRUE ()
    )
VAR HoursWorked = SUM ( Fact_Exposure[HoursWorked] )
RETURN
    DIVIDE ( Recordables * 200000, HoursWorked )`}
        />

        <CodeBlock
          language="dax"
          caption="A 12-month rolling view smooths the month-to-month noise that made small sites look volatile."
          code={`TRIR Rolling 12M =
CALCULATE (
    [TRIR],
    DATESINPERIOD (
        Dim_Date[Date],
        MAX ( Dim_Date[Date] ),
        -12,
        MONTH
    )
)`}
        />

        <CodeBlock
          language="dax"
          caption="Leading-indicator ratio. A healthy site reports many near misses per recordable — a falling ratio usually means under-reporting, not improving safety."
          code={`Near Miss Ratio =
DIVIDE (
    CALCULATE ( COUNTROWS ( Fact_Incident ), Dim_Severity[Level] = "Near Miss" ),
    CALCULATE ( COUNTROWS ( Fact_Incident ), Dim_Severity[IsRecordable] = TRUE () )
)`}
        />

        <p>
          Row-level security restricts site managers to their own sites via a
          bridging table on <code>Dim_Site</code>, while regional managers and the
          HSE lead see everything. The same report file serves all three
          audiences.
        </p>
      </CaseSection>

      <CaseSection id="report" eyebrow="Report design" title="Six pages, one question each">
        <DataTable
          columns={['Page', 'Question it answers', 'Primary visual']}
          rows={[
            ['Overview', 'Are we trending better or worse overall?', 'Rolling 12M TRIR line with target band'],
            ['Site comparison', 'Which sites are outliers once exposure is accounted for?', 'Ranked bar of TRIR with volume context'],
            ['Hazard analysis', 'What is actually hurting people?', 'Hazard category by severity matrix'],
            ['Leading indicators', 'Are we spotting problems before they become injuries?', 'Near miss ratio and toolbox-talk coverage'],
            ['Incident detail', 'What happened in this specific case?', 'Drill-through table with narrative field'],
            ['Data quality', 'Can we trust the numbers on the other five pages?', 'Unmapped and late-reported record counts'],
          ]}
        />

        <Figure
          alt="Overview page of the TerraFirm safety report"
          caption="Add your exported report screenshots to public/projects/terrafirm/ and pass the path via the src prop."
        />

        <Bullets
          items={[
            'Every page opens with the answer as a headline number, then the supporting chart underneath — a reader who only looks for five seconds still leaves with the finding.',
            'One shared slicer panel (date, region, site) syncs across all pages so filter state survives navigation.',
            'The data-quality page is deliberately visible, not hidden. Publishing the known gaps was what earned the numbers their credibility with site managers.',
            'Colour is used only for severity and for on/off-target status; everything else is neutral, so the one coloured thing on screen is the thing that matters.',
          ]}
        />
      </CaseSection>

      <CaseSection id="outcome" eyebrow="Outcome" title="What changed">
        <Bullets
          items={[
            'The monthly safety pack went from roughly two days of manual consolidation to a refresh and a review — around two hours.',
            'Cross-site comparison became defensible for the first time, because rates replaced raw counts. Two sites that "looked fine" on volume turned out to be the highest-rate sites in the business.',
            'Hazard analysis concentrated attention: a small number of categories accounted for the bulk of recordable incidents, which redirected toolbox-talk topics for the following quarter.',
            'The near-miss ratio surfaced an under-reporting problem at one site that raw incident counts had made look like the safest location in the company.',
          ]}
        />
        <Callout title="The finding that justified the project">
          The site with the fewest incidents was not the safest site — it was the
          site that had stopped reporting. No amount of chart polish would have
          shown that; it took the exposure denominator and the leading-indicator
          ratio sitting side by side on the same page.
        </Callout>
      </CaseSection>

      <CaseSection id="lessons" eyebrow="Reflection" title="What I'd change next time">
        <Bullets
          items={[
            'Agree the taxonomy before building anything. The mapping table was the single largest time sink and it existed only because definitions were never settled up front.',
            'Push the transformations upstream. Power Query was the right call for a fast first version, but the cleaning logic belongs in SQL views where it can be tested and reused outside Power BI.',
            'Automate the data-quality checks into alerts rather than a report page. A page only helps the people who open it.',
            'Instrument adoption from day one. I added usage tracking after launch; having a baseline would have made the iteration argument much easier.',
          ]}
        />
      </CaseSection>
    </>
  )
}
