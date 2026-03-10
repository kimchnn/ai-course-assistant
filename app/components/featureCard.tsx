import Link from "next/link";

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function FeatureCard({
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}