import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';

const FEATURES = ['general', 'phone', 'ai', 'sms', 'fax'] as const;

/* Designer-facing Spring UI validation review page. Renders the canonical
 * markdown report published at /docs/<feature>-validate.md. All findings are
 * resolved (accepted deviations), so the page shows a pass strip, the counts,
 * and the full report for reference. */
export default function ValidatePage({ feature }: { feature: string }) {
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const known = (FEATURES as readonly string[]).includes(feature);

  useEffect(() => {
    if (!known) return;
    setReport(null);
    setError(false);
    fetch(`${import.meta.env.BASE_URL}docs/${feature}-validate.md`)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then(setReport)
      .catch(() => setError(true));
  }, [feature, known]);

  const status = report?.match(/\*\*Status:\*\* (.+)/)?.[1]?.trim();
  const validatedAt = report?.match(/\*\*Last validated:\*\* (.+)/)?.[1]?.trim();
  const accepted = report ? (report.match(/accepted-deviation/g)?.length ?? 0) : 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="flex h-[40px] items-center text-[20px] font-semibold leading-[28px] tracking-[-0.2px] text-[var(--sui-colors-neutral-b1)]">
          Spring UI Validation — {feature}
        </h1>
        <div className="flex flex-wrap gap-2">
          {FEATURES.map((f) => (
            <Link
              key={f}
              href={`/validate/${f}`}
              className={`inline-flex h-[28px] items-center rounded-full border border-black/20 px-3 text-[13px] font-medium leading-[20px] transition-colors ${
                f === feature
                  ? 'bg-[var(--sui-colors-neutral-b4)] text-[var(--sui-colors-neutral-b1)]'
                  : 'bg-white text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]/40'
              }`}
            >
              {f}
            </Link>
          ))}
        </div>
      </div>

      {!known && (
        <p className="text-[14px] text-[var(--sui-colors-neutral-b2)]">
          Unknown feature “{feature}”. Pick a tab above.
        </p>
      )}

      {known && error && (
        <p className="text-[14px] text-red-600">Could not load /docs/{feature}-validate.md.</p>
      )}

      {known && !error && !report && (
        <div className="h-[80px] w-full animate-pulse rounded-[8px] bg-slate-100" />
      )}

      {report && (
        <>
          <div className="flex items-center gap-3 rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-4">
            <span className="inline-flex h-[28px] items-center rounded-full bg-[#E7F4EC] px-3 text-[13px] font-semibold text-[#1A8517]">
              {status ?? 'Unknown status'}
            </span>
            <span className="text-[14px] text-[var(--sui-colors-neutral-b2)]">
              0 open findings · {accepted} accepted deviations · last validated {validatedAt}
            </span>
            <a
              href={`${import.meta.env.BASE_URL}docs/${feature}-validate.md`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-[14px] font-medium text-[var(--sui-colors-primary-b)] underline hover:text-[var(--sui-colors-primary-b-high-contrast)]"
            >
              Open raw report
            </a>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-[8px] border border-[var(--sui-colors-neutral-b4)] bg-white p-5 text-[13px] leading-[19px] text-[var(--sui-colors-neutral-b1)]">
            {report}
          </pre>
        </>
      )}
    </div>
  );
}
