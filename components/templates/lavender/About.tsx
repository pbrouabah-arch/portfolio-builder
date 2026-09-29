import { Quote } from "lucide-react";
import WallMount from "./decor/WallMount";
import { scriptFont, serifFont } from "./fonts";

interface AboutProps { data: any; }

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="relative px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <WallMount rotate={-0.8} nailPosition="corners" className="p-7 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[.35fr_1fr] lg:items-start">
            <div>
              <p className={`${scriptFont.className} text-3xl text-[#835B8D]`}>a little context</p>
              <h2 className={`${serifFont.className} mt-2 text-4xl font-semibold sm:text-5xl`}>About Me</h2>
              <div className="mt-6 h-px w-16 bg-[#9D719F]" />
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A7885]">01 / introduction</p>
            </div>
            <div className="relative border-l-2 border-[#D8C7D5] pl-7 sm:pl-10">
              <Quote className="absolute -left-4 -top-2 h-8 w-8 bg-[#F7F0E5] p-1 text-[#9D719F]" />
              <p className={`${serifFont.className} text-xl leading-9 text-[#4B3A4B] sm:text-2xl sm:leading-10`}>
                {data.description || "A story still being written."}
              </p>
              <p className={`${scriptFont.className} mt-8 text-2xl text-[#835B8D]`}>keep looking, keep building.</p>
            </div>
          </div>
        </WallMount>
      </div>
    </section>
  );
}
