import Tape from "./decor/Tape";
import Sparkle from "./decor/Sparkle";
import { scriptFont, serifFont } from "./fonts";

interface AboutProps {
  data: any;
}

export default function About({
  data,
}: AboutProps) {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F3F6FC] px-6 py-28 text-[#33415C] lg:px-8"
    >
      <Sparkle className="pointer-events-none absolute right-[15%] top-16 h-5 w-5 opacity-70" />

      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

        <div className="relative">

          <span className={`${scriptFont.className} text-2xl text-[#7A97D1]`}>
            get to know me
          </span>

          <h2 className={`${serifFont.className} mb-8 mt-1 text-4xl font-semibold italic lg:text-5xl`}>
            About Me
          </h2>

          <div className="relative mt-14">

            <Tape className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" rotate={-6} />

            <div
              className="relative bg-white p-9 shadow-[0_20px_45px_rgba(51,65,92,0.1)] sm:p-12"
              style={{ clipPath: "polygon(0 2%, 100% 0, 99% 98%, 1% 100%)" }}
            >

              <p className={`${serifFont.className} text-xl italic leading-9 text-[#4C5C7D]`}>
                {data.description}
              </p>

            </div>

          </div>

        </div>


      </div>
    </section>
  );
}
