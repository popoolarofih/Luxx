import { Navbar } from '@/components/Navbar'
import { ChatInterface } from '@/components/ChatInterface'

export default function AssistantPage() {
  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  )
}
