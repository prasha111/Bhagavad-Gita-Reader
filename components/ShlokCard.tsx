type Props = {
    shlok: any;
  };
  
  export default function ShlokCard({ shlok }: Props) {
    return (
      <div className="max-w-2xl text-center space-y-6">
        
        {/* Sanskrit */}
        <h1 className="text-2xl font-serif leading-relaxed">
          {shlok.sanskrit}
        </h1>
  
        {/* Meaning */}
        <p className="text-lg text-gray-700">
          {shlok.meaning.english}
        </p>
  
        {/* Media */}
        {shlok.media?.audio && (
          <audio controls className="w-full">
            <source src={shlok.media.audio} />
          </audio>
        )}
      </div>
    );
  }