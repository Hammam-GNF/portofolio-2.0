import usePresence from "../hooks";
import {
    getPresenceIcon,
    getPresenceColors,
    getPresenceLabel,
} from "../utils";

export default function PresenceWidget() {

  const { activities } = usePresence();

  if (!activities.length) return null;

  return (
    <div className="">
      <div className="w-full space-y-2">
        {activities.map((act) => {
          const colors = getPresenceColors(act.type);

          let iconContent;
          if (act.image) {
            iconContent = (
              <img
                src={act.image}
                alt={act.title}
                className="w-full h-full object-cover"
              />
            );
          } else if (act.iconImage) {
            iconContent = (
              <div className="w-full h-full flex items-center justify-center p-2">
                <img
                  src={act.iconImage}
                  alt={act.title}
                  className="w-full h-full object-contain"
                />
              </div>
            );
          } else {
            iconContent = (
              <div className="w-full h-full flex items-center justify-center">
                <div className={colors.text}>
                  {getPresenceIcon(act.icon, "w-7 h-7")}
                </div>
              </div>
            );
          }
          
          return (
            <div key={act.key} className="group relative ">
              {/* Glass Card */}
              <div className={`relative backdrop-blur-md bg-gradient-to-br ${colors.bg} rounded-xl border ${colors.border} ${colors.glow} shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}>
                <div className="p-3 flex items-center gap-2.5">
                  
                  {/* Icon/Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
                      {iconContent}
                    </div>
                    
                    {/* Music bars - hanya Spotify */}
                    {act.type === "spotify" && (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded p-0.5 shadow-lg">
                        <div className="flex items-end gap-0.5 h-2">
                          <div className="w-0.5 bg-white rounded-full animate-music-1"></div>
                          <div className="w-0.5 bg-white rounded-full animate-music-2"></div>
                          <div className="w-0.5 bg-white rounded-full animate-music-3"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Info */}
                  <div className="flex-1 min-w-0">
                    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${colors.badge} border backdrop-blur-sm mb-1`}>
                      <div className={`w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')} animate-pulse`}></div>
                      <span className={`text-[9px] pt-[0.5px] font-bold ${colors.text} uppercase tracking-wider`}>
                        {getPresenceLabel(act.type)}
                      </span>
                    </div>
                    
                    <h3 className="text-white font-bold text-sm truncate mb-0.5">
                      {act.title}
                    </h3>
                    <p className="text-white/60 text-xs truncate">
                      {act.subtitle}
                    </p>
                  </div>

                  {/* Spotify Icon - pojok kanan */}
                  {act.type === "spotify" && (
                    <div className="">
                      <img src="Spotify.png" className="w-auto h-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="" />
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes music-1 {
          0%, 100% { height: 30%; }
          50% { height: 90%; }
        }
        @keyframes music-2 {
          0%, 100% { height: 60%; }
          50% { height: 100%; }
        }
        @keyframes music-3 {
          0%, 100% { height: 40%; }
          50% { height: 85%; }
        }
        
        .animate-music-1 { animation: music-1 0.6s ease-in-out infinite; }
        .animate-music-2 { animation: music-2 0.6s ease-in-out 0.15s infinite; }
        .animate-music-3 { animation: music-3 0.6s ease-in-out 0.3s infinite; }
      `}</style>
    </div>
  );
}
