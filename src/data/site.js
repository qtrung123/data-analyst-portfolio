// Single source of truth for personal / site-wide details.
// Edit here rather than hunting through components.

export const site = {
  name: 'Quoc Trung',
  role: 'Data Analyst / BI Developer',
  tagline:
    'I turn messy operational data into decisions people actually act on — Power BI, SQL, and analytics engineering.',
  intro:
    'I build end-to-end analytics: modelling the data, writing the measures, designing the report, and making sure the people who read it change something as a result. Below are the case studies behind that work.',
  location: 'Vietnam · Open to remote',
  email: 'quoctrung121212@gmail.com',
  links: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
  },
  // Shown on the About page.
  skills: [
    {
      group: 'BI & Visualisation',
      items: ['Power BI', 'DAX', 'Power Query (M)', 'Report design', 'RLS'],
    },
    {
      group: 'Data & Modelling',
      items: ['SQL', 'Star schema', 'dbt-style transforms', 'Data quality checks'],
    },
    {
      group: 'Engineering',
      items: ['Python', 'pandas', 'Git', 'REST APIs', 'Microsoft Fabric'],
    },
  ],
}

export default site
