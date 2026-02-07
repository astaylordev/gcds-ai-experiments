import { useState, useEffect } from 'react'
import {
  GcdsHeader,
  GcdsContainer,
  GcdsHeading,
  GcdsFooter,
} from '@cdssnc/gcds-components-react'
import TodoList from './components/TodoList'

const content = {
  en: {
    heading: 'Todo Application',
  },
  fr: {
    heading: 'Application de tâches',
  },
}

function getLangFromHash() {
  return window.location.hash === '#fr' ? 'fr' : 'en'
}

function App() {
  const [lang, setLang] = useState(getLangFromHash)

  useEffect(() => {
    const onHashChange = () => setLang(getLangFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const langHref = lang === 'en' ? '#fr' : '#en'

  return (
    <>
      <GcdsHeader lang={lang} langHref={langHref} skipToHref="#main-content" />

      <main id="main-content">
        <GcdsContainer size="xl" centered padding="400">
          <GcdsHeading tag="h1" marginBottom="400">
            {content[lang].heading}
          </GcdsHeading>
          <TodoList lang={lang} />
        </GcdsContainer>
      </main>

      <GcdsFooter lang={lang} display="compact" />
    </>
  )
}

export default App
