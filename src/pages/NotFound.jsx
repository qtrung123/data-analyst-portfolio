import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <Container className="py-28 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-bold text-heading">{t('notFound.title')}</h1>
      <p className="mt-3 text-body">{t('notFound.body')}</p>
      <Link
        to="/projects"
        className="mt-8 inline-block rounded-lg bg-accent-solid px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:opacity-90"
      >
        {t('notFound.cta')}
      </Link>
    </Container>
  )
}
