"use client"

const stats = [
  { value: "20+", label: "Languages" },
  { value: "65+", label: "AI Models" },
  { value: "9+", label: "Providers" },
  { value: "<1s", label: "Detection" },
]

export default function StatsBanner() {
  return (
    <section className="border-y border-black/5 bg-white px-4 py-20 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i < stats.length - 1 ? "md:border-r md:border-black/5" : ""
              }`}
            >
              <span className="bg-gradient-to-b from-[#00e5ff] to-purple-500 bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
                {stat.value}
              </span>
              <span className="mt-2 text-sm text-black/40">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
