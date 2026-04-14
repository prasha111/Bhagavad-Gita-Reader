import Link from "next/link";

const chapters = [
  { id: 1, name: "Arjuna Vishada Yoga" },
  { id: 2, name: "Sankhya Yoga" }
];

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Bhagavad Gita</h1>

      {chapters.map((ch) => (
        <Link key={ch.id} href={`/reader/${ch.id}/1`}>
          <div className="p-4 border mb-2 cursor-pointer">
            Chapter {ch.id}: {ch.name}
          </div>
        </Link>
      ))}
    </div>
  );
}