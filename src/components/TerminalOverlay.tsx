const TerminalOverlay = () => {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-xl">
      <div className="relative bg-gradient-to-tr from-[#0e1116]/80 to-[#1a1f29]/80 backdrop-blur-md border border-[#3d5afe]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(58,123,255,0.4)] overflow-hidden font-mono text-sm text-foreground">
        
        <div className="flex items-center justify-between mb-3 border-b border-[#3d5afe]/30 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3d5afe] animate-pulse shadow-[0_0_10px_#3d5afe]"></div>
            <p className="text-xs text-[#3d5afe] font-semibold uppercase tracking-wide">AI ACTIVE</p>
          </div>
          <p className="text-xs text-[#a1a6b0] tracking-wider">Session ID: 78412.93</p>
        </div>

        <p className="text-sm text-[#e0e4ff] mb-3 tracking-tight">
          <span className="text-[#3d5afe]">/</span> AI WORKOUT ANALYSIS COMPLETE
        </p>

        <div className="space-y-2 text-xs text-[#a1a6b0]">
          {[
            "30 min Strength Training (Upper Body)",
            "20 min Cardio (Moderate Intensity)",
            "10 min Flexibility (Recovery)"
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-[#1a1f29]/50 rounded-lg px-3 py-2 hover:bg-[#1a1f29]/70 transition-colors duration-300"
            >
              <div className="text-[#3d5afe] font-semibold animate-pulse">{`0${idx + 1}`}</div>
              <span>{item}</span>
            </div>
          ))}
        </div>

       
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full rounded-2xl border border-[#3d5afe]/50 animate-[pulse_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default TerminalOverlay;
