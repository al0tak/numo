import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="font-display text-5xl font-bold text-cyan">numo</h1>
      <p className="text-lg text-muted">Invoice creation tool — coming soon.</p>
    </main>
  )
}
