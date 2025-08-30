export default function FormErrorMessage({ message }: { message: string }) {
  return (
    <p className="text-red-500 text-sm margin-0">{ message }</p>
  )
}
