import React from 'react';

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);
  
  return (
    <div className="flex-1 overflow-y-auto p-6 z-[1000]">
      {skeletonMessages.map((_, index) => {
        const isUser = index % 2 !== 0;
        
        return (
          <div
            key={index}
            className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}
          >
            {!isUser && (
              <div className="p-2 rounded-full bg-slate-700 animate-pulse">
                <div className="w-[18px] h-[18px]" />
              </div>
            )}

            <div
              className={`max-w-full md:max-w-[70%] px-4 py-2 rounded-xl mb-3 space-y-2
                ${isUser
                  ? "bg-slate-600 rounded-br-none"
                  : "bg-slate-800 rounded-tl-none"
                }`}
            >
              <div className={`h-3 ${isUser ? "bg-slate-500" : "bg-slate-700"} rounded w-48 animate-pulse`} />
              {index % 3 === 0 && (
                <>
                  <div className={`h-3 ${isUser ? "bg-slate-500" : "bg-slate-700"} rounded w-40 animate-pulse`} />
                  <div className={`h-3 ${isUser ? "bg-slate-500" : "bg-slate-700"} rounded w-36 animate-pulse`} />
                </>
              )}
            </div>

            {isUser && (
              <div className="p-2 rounded-full bg-slate-600 animate-pulse">
                <div className="w-[18px] h-[18px]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;