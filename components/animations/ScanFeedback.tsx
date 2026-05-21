type Props = {
  success: boolean
  message: string
}

export default function ScanFeedback({ success, message }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">

      <div className={success ? "text-green-400" : "text-red-400"}>
        {success ? "✅" : "❌"}
      </div>

      <p className="text-white">
        {message}
      </p>

    </div>
  )
}