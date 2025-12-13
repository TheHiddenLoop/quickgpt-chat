import React from "react";

const RightAuthPanel = ({
  image,
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="bg-bgSecondary h-screen flex items-center justify-center">
      <div className="w-[520px] bg-bgPrimary rounded-2xl px-12 py-14 font-poppins
                      shadow-md border border-border">

        <div className="flex justify-center mb-10">
          <img
            src={image}
            alt="auth"
            className="w-56 drop-shadow-sm"
          />
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold text-textPrimary tracking-tight">
            {title}
          </h1>

          <p className="text-secondary font-medium">
            {subtitle}
          </p>

          <p className="text-sm text-textSecondary leading-relaxed max-w-sm mx-auto">
            {description}
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <span className="h-[3px] w-14 rounded-full bg-accent"></span>
        </div>
      </div>
    </div>
  );
};

export default RightAuthPanel;
