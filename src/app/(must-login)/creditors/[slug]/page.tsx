
type CreditorDetailPageProps = { params: { slug: string } }

function CreditorDetailPage({ params: {slug} }: CreditorDetailPageProps) {
    
  return (
    <div>{JSON.stringify(slug)}</div>
  )
}

export default CreditorDetailPage