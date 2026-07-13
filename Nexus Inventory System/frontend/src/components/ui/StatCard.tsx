import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  tone: "neutral" | "warning" | "danger" | "success";
  icon: LucideIcon;
};

const tones = {
  neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  danger: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
  success: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200"
};

export function StatCard({ title, value, tone, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-normal">{value}</p>
        </div>
        <span className={`rounded-md p-2 ${tones[tone]}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
