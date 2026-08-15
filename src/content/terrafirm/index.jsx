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
   Every figure below is taken from the delivered Power BI model.
   ------------------------------------------------------------------ */
export const meta = {
  slug: 'terrafirm-safety-analytics',
  title: 'TerraFirm Safety Analytics',
  subtitle: 'From safety outcomes to preventive risk signals',
  summary:
    'Recordable injuries were falling, which made the safety programme look healthy. Consolidating nine operational datasets across ten sites into one Power BI model showed a second story underneath: the preventive activity meant to produce that improvement was running weak and unevenly, and most of the remaining risk sat at a single site.',
  category: 'Business Intelligence',
  year: '2025',
  status: 'flagship',
  featured: true,
  tools: ['Power BI', 'DAX', 'Power Query (M)', 'SQL', 'Star schema', 'Drillthrough'],
  metrics: [
    { label: 'Work hours', value: '9.79M', note: 'exposure denominator' },
    { label: 'Incidents', value: '1,133', note: '106 recordable' },
    { label: 'YTD recordables', value: '29 → 16', note: 'approx. 44.8% lower' },
    { label: 'Cadence compliance', value: '29.9%', note: 'company-wide' },
  ],
  cover: { from: '#0c4a6e', to: '#082f49', glyph: '🦺' },
  links: [
    // Add the real repository / published report link here.
    { label: 'Power BI repository', href: 'https://github.com/' },
  ],
  sections: [
    { id: 'context', label: 'Context' },
    { id: 'data', label: 'Data & modelling' },
    { id: 'outcomes', label: '1. Outcomes improved' },
    { id: 'cadence', label: '2. Cadence stayed weak' },
    { id: 'training', label: '3. Training readiness' },
    { id: 'concentration', label: '4. Concentrated risk' },
    { id: 'site360', label: '5. Site 360 drillthrough' },
    { id: 'interpretation', label: 'Reading the signals' },
  ],
}

export default function TerraFirmCaseStudy() {
  return (
    <>
      <CaseSection
        id="context"
        eyebrow="Context"
        title="A falling injury count is not the same as a working safety programme"
      >
        <p>
          TerraFirm runs work across ten sites. Safety data existed in volume —
          incidents, inspections, observations, training records, hours worked —
          but it lived in separate operational systems, each answering its own
          narrow question. Nothing put outcomes and preventive activity in the
          same frame.
        </p>
        <p>
          Year-to-date recordable injuries were down, and that was the headline
          everyone repeated. The question the reporting could not answer was
          whether the preventive programme underneath — inspection cadence,
          observation quality, training readiness — was actually strong enough to
          sustain it, or whether the improvement was sitting on thin foundations.
        </p>
        <Callout tone="neutral" title="What this project is">
          A Power BI model over <strong>9 operational datasets</strong>, covering{' '}
          <strong>10 sites</strong> and <strong>9.79M work hours</strong>,
          delivered as <strong>6 report pages</strong> that read lagging outcomes
          and leading indicators side by side.
        </Callout>
      </CaseSection>

      <CaseSection id="data" eyebrow="Data & modelling" title="Nine datasets, one conformed model">
        <p>
          The datasets arrive at four different grains — events, inspections,
          observations, assignments — plus hours worked as the exposure
          denominator. Flattening them together would double-count hours on every
          incident row, so each stays as its own fact table and the shared
          dimensions do the filtering.
        </p>

        <DataTable
          caption="Volumes are the totals carried in the delivered model."
          columns={['Fact area', 'Grain', 'Volume']}
          rows={[
            ['Incidents', 'One row per reported event', '1,133 (106 recordable)'],
            ['Inspections', 'One row per completed inspection', '9,195'],
            ['Safety observations', 'One row per observation', '15,846'],
            ['Training assignments', 'One row per person per course', '7,750'],
            ['Work hours (exposure)', 'One row per site per period', '9.79M hours'],
          ]}
        />

        <Steps
          steps={[
            {
              title: 'Land each source unchanged',
              body: 'Every dataset is staged as-is before any cleaning, so any figure on the report can be traced back to the row the source system actually holds.',
            },
            {
              title: 'Conform site and date',
              body: 'Site identifiers differed between systems. A central site dimension and a marked date table give all nine datasets one shared filter context — the prerequisite for comparing outcomes against preventive activity on the same page.',
            },
            {
              title: 'Carry exposure as its own fact',
              body: 'Work hours sit at their own grain and drive every rate measure. Without them, cross-site comparison reduces to raw counts, which reward small sites and punish busy ones.',
            },
            {
              title: 'Separate lagging from leading measures',
              body: 'Recordable rate is the outcome. Cadence compliance, at-risk observation rate, and on-time training are the preventive signals. Keeping the two families explicit is what lets the report show them diverging.',
            },
          ]}
        />

        <CodeBlock
          language="dax"
          caption="Recordable rate, normalised to 200,000 hours worked so sites of different sizes compare honestly. The rolling-12-month variant is what the report displays."
          code={`Recordable Rate =
VAR Recordables =
    CALCULATE ( COUNTROWS ( Fact_Incident ), Fact_Incident[IsRecordable] = TRUE () )
VAR HoursWorked = SUM ( Fact_Exposure[HoursWorked] )
RETURN
    DIVIDE ( Recordables * 200000, HoursWorked )`}
        />
      </CaseSection>

      <CaseSection id="outcomes" eyebrow="Finding 01" title="Lagging outcomes improved">
        <p>
          The outcome measures moved in the right direction. Year-to-date
          recordable incidents fell from <strong>29 in the prior year to 16 in the
          current year</strong> — approximately <strong>44.8% lower</strong>.
        </p>
        <p>
          This is the number the organisation already knew, and the report does
          not argue with it. What the report adds is context: it places that
          improvement next to the preventive indicators rather than presenting it
          alone, which is where the rest of the story comes from.
        </p>
        <Figure
          alt="Overview page showing year-to-date recordable incident trend"
          caption="Add report screenshots to public/projects/terrafirm/ and pass the path via the src prop."
        />
      </CaseSection>

      <CaseSection id="cadence" eyebrow="Finding 02" title="Preventive cadence remained weak">
        <p>
          Against that improving outcome, company-wide{' '}
          <strong>Cadence Compliance sits at 29.9%</strong> — the share of
          scheduled preventive activity completed on its intended rhythm. The
          programme designed to prevent incidents is running well below its own
          plan.
        </p>
        <p>
          Two signals moving in opposite directions is the central tension of the
          report. An improving injury count alongside weak preventive cadence
          does not tell you the improvement is unearned — but it does mean the
          improvement is not clearly explained by the preventive programme's
          execution, and that is worth knowing before treating the trend as
          secure.
        </p>
      </CaseSection>

      <CaseSection id="training" eyebrow="Finding 03" title="Training completion masked weaker on-time readiness">
        <p>
          Training reporting had been run on completion alone, where the picture
          looks reasonable: <strong>Training Completion is approximately 86.2%</strong>.
        </p>
        <p>
          Splitting completion from timeliness changes what the number means.{' '}
          <strong>On-Time Training is approximately 76.2%</strong> — roughly ten
          points lower. Courses are being finished, but a meaningful share are
          finished after the date they were required, which is a readiness gap
          that a single completion percentage hides entirely.
        </p>
        <DataTable
          columns={['Measure', 'Company-wide', 'What it tells you']}
          rows={[
            ['Training Completion', '~86.2%', 'Whether assigned training eventually gets done'],
            ['On-Time Training', '~76.2%', 'Whether it was done by the date it was needed'],
          ]}
        />
        <Callout title="Why the split matters">
          Completion and timeliness answer different questions. Reporting only
          the higher of the two makes readiness look stronger than the underlying
          data supports.
        </Callout>
      </CaseSection>

      <CaseSection id="concentration" eyebrow="Finding 04" title="Risk was concentrated, not evenly distributed">
        <p>
          Company averages hid how unevenly risk sat across the ten sites.{' '}
          <strong>Ironwood accounts for 40 of the 106 recordable incidents —
          approximately 37.7%</strong> of the company total from a single site.
        </p>
        <p>
          Ironwood also sits on the weaker side of every preventive indicator the
          model carries:
        </p>

        <DataTable
          caption="Ironwood against company-wide values. R12 = rolling twelve months."
          columns={['Measure', 'Ironwood', 'Company', 'Direction']}
          rows={[
            ['R12 Recordable Rate', '3.04', '1.61', 'Higher'],
            ['Cadence Compliance', '3.8%', '29.9%', 'Lower'],
            ['At-Risk Observation Rate', '28.4%', '18.9%', 'Higher'],
            ['On-Time Training', '64.3%', '76.2%', 'Lower'],
          ]}
        />

        <Callout tone="warn" title="Coexistence, not causation">
          These four signals move together at Ironwood: weaker cadence, weaker
          on-time training, and a higher at-risk observation rate coexist with a
          recordable rate roughly double the company figure. The report presents
          this as a pattern worth investigating, not as proof that the weak
          preventive signals caused the higher incident rate. The data supports
          the association; it does not establish the mechanism.
        </Callout>

        <p>
          The practical value is prioritisation. A company average of 29.9%
          cadence compliance invites a company-wide programme; the site view says
          the first conversation belongs at one specific location.
        </p>
      </CaseSection>

      <CaseSection id="site360" eyebrow="Finding 05" title="Site 360 turns a flag into a diagnosis">
        <p>
          Identifying Ironwood as an outlier is only useful if someone can then
          ask <em>why</em> without opening five systems. The Site 360 page is a
          drillthrough target: select a site anywhere in the report and land on a
          single page holding that site's outcome and preventive measures
          together.
        </p>
        <Bullets
          items={[
            'Outcome and leading indicators for the selected site appear side by side, so the comparison against the company figure is immediate rather than remembered.',
            'Drillthrough carries the existing filter context, which means the site view always reconciles with the page the reader came from.',
            'From the site view, incident and observation detail is one further step away — the narrative behind the number, not just the number.',
            'The same page serves every site, so the diagnostic route is identical whichever outlier surfaces next.',
          ]}
        />
        <Figure
          alt="Site 360 drillthrough page for a selected site"
          caption="Site 360: outcome measures and preventive indicators for one site in a single view."
        />
      </CaseSection>

      <CaseSection id="interpretation" eyebrow="Reading the signals" title="What the model does and does not claim">
        <Bullets
          items={[
            'Recordable outcomes improved year over year. That is a measured result, taken directly from the incident data.',
            'Cadence compliance, on-time training, and at-risk observation rates are weaker than the outcome trend alone would suggest. That is also measured.',
            'Where those weaker preventive signals cluster, incident rates are higher — clearly so at Ironwood. This is an association observed in the data, not a demonstrated cause.',
            'The report is built to prompt the next question rather than to close it: it shows where to look, and Site 360 is how the reader looks there.',
          ]}
        />
        <p>
          Framing it this way is deliberate. Safety analytics is an area where
          overstating a causal link produces confident, wrong interventions. The
          model is more useful to a safety lead as a well-evidenced set of
          questions than as a set of conclusions the data cannot carry.
        </p>
      </CaseSection>
    </>
  )
}
