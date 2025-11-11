export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center border border-gold-400/30 glow-gold">
        <span className="text-2xl font-serif font-bold text-noir-100">MN</span>
      </div>
    </div>
  );
}

