interface FormLayoutProps {
  heading: string;
  description: string;
  fields: React.ReactNode[];
  button: React.ReactNode;
  back?: React.ReactNode;
}

export default function FormLayout({
  heading,
  description,
  fields,
  button,
  back,
}: FormLayoutProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-0">
      <div className="w-full shrink-0">
        <h1 className="mb-3 text-center text-3xl font-medium text-default-900">
          {heading}
        </h1>
        <p className="mb-6 text-center text-base text-neutral-500">
          {description}
        </p>
        <div className="scrollbar-hide mb-4 h-full overflow-auto">
          <div className="space-y-4 pt-2">{fields}</div>
        </div>
        {button}
      </div>
      {back && (
        <div className="absolute left-4 top-5 origin-top-left">{back}</div>
      )}
    </div>
  );
}
