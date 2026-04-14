export default function Header({ chapter, shlok }: any) {
    return (
      <header className="p-4 border-b border-gray-200 bg-white/70 backdrop-blur-md flex justify-between items-center sticky top-0">
        
        <div className="text-sm text-gray-600">
          Chapter {chapter} • Shlok {shlok}
        </div>
  
        <button className="text-gray-500 hover:text-black transition">
          ⚙
        </button>
      </header>
    );
  }