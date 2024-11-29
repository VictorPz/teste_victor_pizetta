import { Provider } from "@/components/ui/provider"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

