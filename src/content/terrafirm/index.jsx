import {
  CaseSection,
  Callout,
  Bullets,
  Steps,
  DataTable,
  CodeBlock,
  Figure,
  FindingCards,
  CompareBars,
  DashboardPage,
  EmbedPlaceholder,
} from '../../components/case/CaseBlocks.jsx'

/* ------------------------------------------------------------------
   Card + case-study header metadata.
   Every figure in this file comes from the delivered Power BI model.
   Nothing here is estimated or illustrative.
   ------------------------------------------------------------------ */
export const meta = {
  slug: 'terrafirm-safety-analytics',
  aliases: ['terrafirm'], // /projects/terrafirm redirects to the full slug
  title: 'TerraFirm Safety Analytics',
  subtitle: 'From safety outcomes to preventive risk signals',
  summary:
    'Recordable injuries were down year over year, which made the safety programme look healthy. Consolidating 9 operational datasets across 10 sites into one Power BI model surfaced a second picture underneath: preventive work was running well below plan, on-time training readiness was weaker than completion rates suggested, and more than a third of all recordables sat at a single site.',
  category: 'Business Intelligence',
  year: '2025',
  status: 'flagship',
  featured: true,
  tools: ['Power BI', 'DAX', 'Power Query (M)', 'SQL', 'Star schema', 'Drillthrough'],
  metrics: [
    { label: 'Work hours', value: '9.79M', note: 'exposure denominator' },
    { label: 'Incidents', value: '1,133', note: '106 recordable' },
    { label: 'YTD recordables', value: '29 → 16', note: '~44.8% lower' },
    { label: 'Cadence compliance', value: '29.9%', note: 'company-wide' },
  ],
  cover: {
    from: '#0c4a6e',
    to: '#082f49',
    glyph: '🦺',
    image: '/projects/terrafirm/page1.png',
  },
  links: [
    // Replace with the real repository link before publishing.
    { label: 'Power BI repository', href: 'https://github.com/' },
  ],
  sections: [
    { id: 'problem', label: 'Business problem' },
    { id: 'findings', label: 'Key findings' },
    { id: 'model', label: 'Data & semantic model' },
    { id: 'dashboard', label: 'Dashboard story' },
    { id: 'technical', label: 'Technical implementation' },
    { id: 'explore', label: 'Explore the dashboard' },
    { id: 'reflection', label: 'What I learned' },
  ],
}

const IMG = '/projects/terrafirm'

export default function TerraFirmCaseStudy() {
  return (
    <>
      {/* ---------------- Business problem ---------------- */}
      <CaseSection
        id="problem"
        eyebrow="Business problem"
        title="A falling injury count is not the same as a working safety programme"
      >
        <p>
          TerraFirm runs work across <strong>10 sites</strong>. Safety data
          existed in volume — incidents, inspections, observations, training
          records, hours worked — but each dataset lived in its own system and
          answered its own narrow question. Nothing put outcomes and preventive
          activity in the same frame.
        </p>
        <p>
          Year-to-date recordable injuries were down, and that was the number
          everyone repeated. What the reporting could not answer was whether the
          preventive programme underneath — inspection cadence, field
          observation, training readiness — was strong enough to sustain the
          improvement, or where the remaining risk actually sat.
        </p>
        <Callout tone="neutral" title="Scope">
          <strong>9 operational datasets</strong> · <strong>10 sites</strong> ·{' '}
          <strong>9.79M work hours</strong> · delivered as{' '}
          <strong>6 report pages</strong>, from a company-level trend view down
          to a single-site diagnostic.
        </Callout>
      </CaseSection>

      {/* ---------------- Key findings ---------------- */}
      <CaseSection
        id="findings"
        eyebrow="Key findings"
        title="Five things the consolidated model showed"
      >
        <FindingCards
          findings={[
            {
              title: 'Lagging outcomes improved',
              body: 'Year-to-date recordable incidents fell against the prior year — a real, measured improvement in the outcome the business tracks.',
              evidence: '29 → 16 YTD · ~44.8% lower',
            },
            {
              title: 'Preventive cadence remained weak',
              body: 'The scheduled preventive work meant to underpin that improvement was completing well below plan across the company.',
              evidence: 'Cadence Compliance 29.9%',
            },
            {
              title: 'Completion masked readiness',
              body: 'Training completion looked healthy on its own. Splitting timeliness out of it showed a materially weaker on-time picture.',
              evidence: '~86.2% complete vs ~76.2% on time',
            },
            {
              title: 'Risk was concentrated',
              body: 'Recordables were not spread evenly across the ten sites. One site carried well over a third of the company total.',
              evidence: 'Ironwood 40 of 106 · ~37.7%',
            },
            {
              title: 'Weak signals co-occur',
              body: 'At Ironwood, a higher recordable rate co-occurs with weaker cadence, weaker on-time training and a higher at-risk observation rate. Association, not proven cause.',
              evidence: 'R12 rate 3.04 vs 1.61 company',
            },
            {
              title: 'Site 360 makes it diagnosable',
              body: 'A drillthrough page carries filter context to one site, so an outlier flagged anywhere in the report can be examined without leaving Power BI.',
              evidence: 'Page 6 — Why is this site different?',
            },
          ]}
        />

        <Callout tone="warn" title="On causation">
          These signals <strong>co-occur</strong>. Weak cadence, weaker on-time
          training and a higher at-risk observation rate sit alongside a higher
          recordable rate at the same site — a pattern that{' '}
          <strong>warrants investigation</strong> and provides{' '}
          <strong>diagnostic context</strong>. The model does not demonstrate
          that any of these caused the incidents, and it is not presented as if
          it does.
        </Callout>
      </CaseSection>

      {/* ---------------- Data & semantic model ---------------- */}
      <CaseSection
        id="model"
        eyebrow="Data & semantic model"
        title="Nine datasets, one conformed model"
      >
        <p>
          The sources arrive at different grains — events, inspections,
          observations, assignments, hours. Flattening them into one table would
          double-count hours on every incident row, so each stays a fact table in
          its own right and shared dimensions do the filtering.
        </p>

        <DataTable
          caption="Volumes carried in the delivered model."
          columns={['Fact area', 'Grain', 'Volume']}
          rows={[
            ['Incidents', 'One row per reported event', '1,133 (106 recordable)'],
            ['Inspections', 'One row per completed inspection', '9,195'],
            ['Safety observations', 'One row per observation', '15,846'],
            ['Training assignments', 'One row per person per course', '7,750'],
            ['Work hours (exposure)', 'One row per site per period', '9.79M hours'],
          ]}
        />

        <Figure
          src={`${IMG}/semantic-model.png`}
          alt="Semantic model relationship diagram"
          caption="Conformed Site and Date dimensions let all nine datasets share one filter context."
        />

        <Bullets
          items={[
            'A central Site dimension reconciles identifiers that differed between source systems — the prerequisite for comparing any two datasets on the same page.',
            'A marked Date table drives every time intelligence measure, including the rolling twelve-month view.',
            'Work hours are carried as their own fact so rate measures are exposure-adjusted; without them, cross-site comparison collapses into raw counts that reward small sites.',
            'Lagging and leading measures are kept as explicit, separate families — that separation is what lets the report show them diverging.',
          ]}
        />
      </CaseSection>

      {/* ---------------- Dashboard story ---------------- */}
      <CaseSection
        id="dashboard"
        eyebrow="Dashboard story"
        title="Six pages, each answering one question"
        wide
      >
        <p>
          The report is sequenced as an argument: start with the outcome, test
          whether the preventive work supports it, then narrow to where the risk
          actually sits.
        </p>

        <DashboardPage
          number={1}
          question="Are we getting safer?"
          title="Company-level outcome trend"
          src={`${IMG}/page1.png`}
          alt="Page 1 — company safety outcome trend"
          caption="Company-level outcome trend: year-to-date recordables against the prior year, with the rolling twelve-month rate as the exposure-adjusted baseline."
          width={1696}
          height={961}
          points={[
            'Year-to-date recordables of 16 against 29 in the prior year, approximately 44.8% lower.',
            'Rolling twelve-month recordable rate of 1.61 company-wide gives the trend an exposure-adjusted baseline.',
            'Sets up the question the next page tests: is the preventive programme behind this improvement running as designed?',
          ]}
        />

        <DashboardPage
          number={2}
          question="Are sites doing the preventive work?"
          title="Inspection cadence compliance"
          src={`${IMG}/page2.png`}
          alt="Page 2 — preventive inspection cadence by site"
          caption="Inspection cadence compliance broken out by site, where the spread between sites is visible rather than averaged away."
          width={1693}
          height={868}
          points={[
            'Cadence Compliance of 29.9% company-wide, across 9,195 completed inspections.',
            'Compliance is broken out by site, which is where the spread becomes visible rather than averaged away.',
            'The contrast with Page 1 is the report’s central tension: an improving outcome alongside preventive work running well below plan.',
          ]}
        />

        <DashboardPage
          number={3}
          question="What are we seeing in the field?"
          title="Safety observation volume and quality"
          src={`${IMG}/page3.png`}
          alt="Page 3 — field safety observations"
          caption="Field observation volume and quality, split by at-risk versus safe conditions against the company benchmark."
          width={1702}
          height={931}
          points={[
            '15,846 observations recorded, split by at-risk versus safe conditions.',
            'Company at-risk observation rate of 18.9% is the benchmark each site is read against.',
            'Observation quality is treated as a leading signal — what the field is reporting before an incident occurs.',
          ]}
        />

        <DashboardPage
          number={4}
          question="What actually happened?"
          title="Incident detail and classification"
          src={`${IMG}/page4.png`}
          alt="Page 4 — incident detail and classification"
          caption="Incident detail and classification — the page that answers a question about a specific event rather than a trend."
          width={1693}
          height={921}
          points={[
            '1,133 incidents in total, of which 106 are recordable.',
            'Classification and detail sit here so the summary pages stay readable and the specifics remain one click away.',
            'This is the page that answers a follow-up question about a specific event rather than a trend.',
          ]}
        />

        <DashboardPage
          number={5}
          question="Are people ready for the work?"
          title="Training completion against on-time readiness"
          src={`${IMG}/page5.png`}
          alt="Page 5 — training completion and on-time readiness"
          caption="Training completion shown against on-time readiness, the split that separates work finished from work finished on time."
          width={1702}
          height={925}
          points={[
            '7,750 training assignments, with completion at approximately 86.2%.',
            'On-Time Training of approximately 76.2% is the same population measured against the date the training was required.',
            'Reporting completion alone presents readiness as roughly ten points stronger than the timeliness view supports.',
          ]}
        />

        <DashboardPage
          number={6}
          question="Why is this site different?"
          title="Site 360 — drillthrough diagnosis"
          src={`${IMG}/page6.png`}
          alt="Page 6 — Site 360 drillthrough diagnostic"
          caption="Site 360: outcome and preventive measures for one site against the company benchmark, reached by drillthrough from any page."
          width={1705}
          height={948}
          points={[
            'Drillthrough from any page carries filter context to a single site, so the site view always reconciles with the page it was opened from.',
            'Outcome and preventive measures appear together for that site against the company benchmark.',
            'Ironwood accounts for 40 of 106 recordables — approximately 37.7% — which is what the page was built to interrogate.',
          ]}
        />

        <h3 className="mt-10 text-lg font-semibold text-ink-50">
          Ironwood against the company benchmark
        </h3>
        <p className="mt-2">
          The four measures Site 360 puts side by side for the site carrying the
          largest share of recordables:
        </p>

        <CompareBars
          seriesA="Ironwood"
          seriesB="Company"
          items={[
            { label: 'R12 Recordable Rate', a: 3.04, b: 1.61, note: 'higher' },
            { label: 'Cadence Compliance', a: 3.8, b: 29.9, unit: '%', note: 'lower' },
            { label: 'At-Risk Observation Rate', a: 28.4, b: 18.9, unit: '%', note: 'higher' },
            { label: 'On-Time Training', a: 64.3, b: 76.2, unit: '%', note: 'lower' },
          ]}
        />

        <p>
          Four signals point the same way at one site. That co-occurrence is
          strong enough to justify where the safety team looks first, and not
          strong enough to conclude why. The page is built to start that
          investigation, not to end it.
        </p>
      </CaseSection>

      {/* ---------------- Technical implementation ---------------- */}
      <CaseSection
        id="technical"
        eyebrow="Technical implementation"
        title="How it was built"
      >
        <Steps
          steps={[
            {
              title: 'Stage each source unchanged',
              body: 'Every dataset lands as-is before any cleaning, so any figure on the report traces back to the row the source system holds.',
            },
            {
              title: 'Conform site and date in Power Query',
              body: 'Site identifiers are reconciled against the central Site dimension; unmatched rows surface rather than silently dropping out of the totals.',
            },
            {
              title: 'Model as a star with a separate exposure fact',
              body: 'Work hours stay at their own grain and drive every rate measure, keeping cross-site comparison exposure-adjusted.',
            },
            {
              title: 'Wire drillthrough to Site 360',
              body: 'Filter context follows the reader from any summary visual to the single-site page, so the two views never disagree.',
            },
          ]}
        />

        <p className="mt-8">
          The measure layer is deliberately small — a handful of base measures,
          with everything on the report a variation on them.
        </p>

        <CodeBlock
          language="dax"
          caption="Recordable rate, normalised to 200,000 hours worked so sites of different sizes compare honestly. The rolling twelve-month variant is what the report displays."
          code={`Recordable Rate =
VAR Recordables =
    CALCULATE ( COUNTROWS ( Fact_Incident ), Fact_Incident[IsRecordable] = TRUE () )
VAR HoursWorked = SUM ( Fact_Exposure[HoursWorked] )
RETURN
    DIVIDE ( Recordables * 200000, HoursWorked )`}
        />

        <CodeBlock
          language="dax"
          caption="On-time training separates timeliness from completion — the split behind finding 03."
          code={`On-Time Training % =
DIVIDE (
    CALCULATE (
        COUNTROWS ( Fact_Training ),
        Fact_Training[CompletedDate] <= Fact_Training[DueDate]
    ),
    CALCULATE (
        COUNTROWS ( Fact_Training ),
        NOT ISBLANK ( Fact_Training[CompletedDate] )
    )
)`}
        />

        <Callout tone="neutral" title="Adapt before reuse">
          These follow the conventional 200,000-hour normalisation and a
          due-date comparison. Both should be reconciled against your own
          model's column names and business rules before being lifted.
        </Callout>
      </CaseSection>

      {/* ---------------- Interactive ---------------- */}
      <CaseSection
        id="explore"
        eyebrow="Explore"
        title="Interactive dashboard"
      >
        <EmbedPlaceholder
          title="Live report embed not yet published"
          note="The Power BI report has not been published to a public workspace, so no embed URL exists. The six page walkthroughs above cover the same content; the embed will replace this panel once a publish-to-web link is available."
        />
      </CaseSection>

      {/* ---------------- Reflection ---------------- */}
      <CaseSection
        id="reflection"
        eyebrow="Reflection"
        title="What I learned"
      >
        <Bullets
          items={[
            'An improving headline number is a starting point, not a conclusion. The most useful thing this model does is refuse to let the outcome trend be read on its own.',
            'The exposure denominator does more analytical work than any visual. Without hours worked, every cross-site comparison silently rewards the smallest site.',
            'Splitting one metric into two — completion versus on-time — changed the story more than any additional dataset did. It is worth asking what a single percentage is averaging over.',
            'Writing findings as co-occurrence rather than cause is harder and slower, and it is what makes the report defensible when someone senior pushes back on it.',
            'Building the drillthrough early shaped the summary pages for the better: knowing a diagnostic route existed meant the top-level pages did not have to try to explain everything.',
          ]}
        />
      </CaseSection>
    </>
  )
}
