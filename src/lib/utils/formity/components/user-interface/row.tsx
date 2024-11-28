interface RowProps {
  items: React.ReactNode[];
}

export default function Row({ items }: RowProps) {
  return <div className="grid grid-cols-[repeat(auto-fit,minmax(theme(spacing.40),1fr))] gap-4">{items}</div>;
}
