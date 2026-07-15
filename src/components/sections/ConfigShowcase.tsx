import { highlightCode } from "@/lib/shiki";

const configJson = `{
  "rakshak.autoScan": true,
  "rakshak.scanDelay": 1000,
  "rakshak.backendUrl": "http://127.0.0.1:3000"
}`;

const commands = [
  "Rakshak: Scan Current File",
  "Rakshak: Apply Fix",
];

export default async function ConfigShowcase() {
  const configHtml = await highlightCode(configJson, "json");

  return (
    <section className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="font-body text-sm uppercase tracking-widest text-black/30">
            Setup
          </p>
          <h2 className="mt-4 font-heading text-5xl font-bold leading-tight text-[#111] md:text-7xl">
            Simple Configuration
          </h2>
        </div>

        <div className="rounded-[20px] border border-dashed border-black/10 bg-white p-6">
          <p className="mb-4 font-mono text-xs text-black/30">
            settings.json
          </p>
          <div
            className="shiki-wrapper"
            dangerouslySetInnerHTML={{ __html: configHtml }}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {commands.map((cmd) => (
            <div
              key={cmd}
              className="flex items-center gap-3 rounded-full border border-dashed border-black/10 px-5 py-3 font-mono text-sm text-black/60 transition-all hover:border-black/30"
            >
              <span className="text-black/20">{">"}</span>
              {cmd}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
