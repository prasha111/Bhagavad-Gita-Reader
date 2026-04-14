import { useRouter } from "next/navigation";

export default function NavigationControls() {
  const router = useRouter();

  return (
    <div className="flex gap-4 mt-8">
      <button
        onClick={() => router.push("/reader/1/1")}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Previous
      </button>

      <button
        onClick={() => router.push("/reader/1/2")}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Next
      </button>
    </div>
  );
}