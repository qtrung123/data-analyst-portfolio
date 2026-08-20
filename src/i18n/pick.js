/**
 * Resolves a possibly-bilingual value.
 *
 * Content fields may be either a plain value (same in both languages, e.g. a
 * tool name or a number) or a `{ en, vi }` object. Shared components call this
 * rather than knowing anything about a specific project's content.
 */
export function pick(value, lang) {
  if (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !value.$$typeof && // leave React elements alone
    ('en' in value || 'vi' in value)
  ) {
    return value[lang] ?? value.en ?? ''
  }
  return value
}

export default pick
