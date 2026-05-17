const categories = [
  { icon: "🛣️", title: "Roads & Footpaths", sub: "3,241 complaints filed" },
  { icon: "💧", title: "Water Supply", sub: "1,892 complaints filed" },
  { icon: "⚡", title: "Electricity", sub: "2,104 complaints filed" },
  { icon: "🗑️", title: "Sanitation", sub: "1,456 complaints filed" },
  { icon: "💡", title: "Street Lighting", sub: "987 complaints filed" },
  { icon: "🌊", title: "Drainage", sub: "1,123 complaints filed" },
  { icon: "📢", title: "Noise & Pollution", sub: "634 complaints filed" },
  { icon: "🚌", title: "Public Transport", sub: "412 complaints filed" },
];

export default function CivicSection() {
  return (
    <section className="bg-[#F5F3EF] px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">

          {/* LEFT */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-3">
              One Platform
            </p>

            <h2
              className="
                font-['DM_Serif_Display']
                text-[clamp(38px,5vw,60px)]
                font-normal
                text-[#1a1a18]
                leading-[1.05]
                tracking-[-0.025em]
                m-0
              "
            >
              All civic issues,
              <br />

              <span className="italic text-neutral-400">
                one address.
              </span>
            </h2>
          </div>

          {/* RIGHT */}
          <p
            className="
              text-[14px]
              text-[#aaa]
              max-w-[300px]
              leading-[1.7]
              text-right
              md:mb-1
            "
          >
            From pothole to power cut — every public service complaint routed
            automatically to the right department.
          </p>

        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

          {categories.map((c, i) => (
            <div
              key={i}
              className="
                flex items-center gap-4
                bg-white
                rounded-2xl
                px-5 py-4
                border border-black/[0.04]
                transition-all duration-200
                hover:-translate-y-1
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
              "
            >
              <span className="text-2xl w-8 text-center flex-shrink-0">
                {c.icon}
              </span>

              <div>
                <p className="text-sm font-semibold text-[#1a1a18]">
                  {c.title}
                </p>

                <p className="text-xs text-neutral-400 mt-0.5">
                  {c.sub}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}