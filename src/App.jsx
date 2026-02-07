import {
  GcdsHeader,
  GcdsContainer,
  GcdsHeading,
  GcdsText,
  GcdsFooter,
} from '@cdssnc/gcds-components-react'

function App() {
  return (
    <>
      <GcdsHeader langHref="#" skipToHref="#main-content" />

      <main id="main-content">
        <GcdsContainer size="xl" centered padding="400">
          <GcdsHeading tag="h1">Welcome to My App</GcdsHeading>
          <GcdsText>
            This is a skeleton React application using the Government of Canada
            Design System.
          </GcdsText>
        </GcdsContainer>
      </main>

      <GcdsFooter display="compact" />
    </>
  )
}

export default App
