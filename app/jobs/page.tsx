import { Suspense } from "react"
import JobsContent from "./jobs-content"
import Loading from "./loading"

export default function JobsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <JobsContent />
    </Suspense>
  )
}
