import Section from '@/app/components/Section'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section background="white" padding="md" maxWidth="7xl">
      {children} 
    </Section>
  )
}