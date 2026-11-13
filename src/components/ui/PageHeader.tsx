export default function PageHeader({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <p className="mx-auto mt-3 max-w-2xl leading-8 text-gray-600">{text}</p>
    </div>
  )
}
