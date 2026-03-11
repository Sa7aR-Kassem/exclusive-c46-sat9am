import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-15">
      <h2 className="text-red-600 relative ps-9 mb-3 before:content-[''] before:w-5 before:h-10 before:bg-red-600 before:absolute before:top-1/2 before:inset-s-0 before:-translate-y-1/2 before:rounded-sm">
        {title}
      </h2>
      <p className="text-4xl font-semibold capitalize">{subtitle}</p>
    </div>
  );
}
