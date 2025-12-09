import { ReactNode } from "react";

interface FormSectionProps {
  number: number;
  title: string;
  children: ReactNode;
  delay?: number;
}

export const FormSection = ({ number, title, children, delay = 0 }: FormSectionProps) => {
  return (
    <section 
      className="section-card opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="section-title">
        <span className="section-number">{number}</span>
        {title}
      </h2>
      {children}
    </section>
  );
};
