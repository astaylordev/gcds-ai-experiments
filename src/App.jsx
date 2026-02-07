import { useState, useEffect } from 'react'
import {
  GcdsHeader,
  GcdsContainer,
  GcdsHeading,
  GcdsText,
  GcdsFooter,
} from '@cdssnc/gcds-components-react'

const content = {
  en: {
    heading: 'Welcome to My App',
    text: 'This is a skeleton React application using the Government of Canada Design System.',
  },
  fr: {
    heading: 'Bienvenue dans mon application',
    text: "Ceci est une application React squelette utilisant le Système de design du gouvernement du Canada.",
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
          <GcdsHeading tag="h1">{content[lang].heading}</GcdsHeading>
          <GcdsText>{content[lang].text}</GcdsText>
        </GcdsContainer>
      </main>

      <GcdsFooter lang={lang} display="compact" />
    </>
  )
}

export default App
