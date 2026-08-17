import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-content mx-auto container-px ${className}`}>
      {children}
    </div>
  );
}
