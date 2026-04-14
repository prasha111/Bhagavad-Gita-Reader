export default function ShlokCard({ shlok }: any) {
  return (
    <div className="text-center space-y-10 animate-fadeIn px-4">
      
  
      <h1 className="text-3xl md:text-5xl font-serif leading-loose tracking-wide text-[#2c2c2c]">
        {shlok.sanskrit}
      </h1>

  
      <div className="flex items-center justify-center gap-2">
        <div className="w-10 h-[1px] bg-gray-300" />
        <span className="text-gray-400">✽</span>
        <div className="w-10 h-[1px] bg-gray-300" />
      </div>

  
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
        {shlok.meaning.english}
      </p>


      <p className="text-md text-gray-500 italic max-w-xl mx-auto">
        {shlok.meaning.hindi}
      </p>


      {shlok.media?.audio && (
        <div className="pt-4">
          <audio controls className="w-full opacity-80 hover:opacity-100 transition">
            <source src={shlok.media.audio} />
          </audio>
        </div>
      )}
    </div>
  );
}