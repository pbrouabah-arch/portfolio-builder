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
      className="bg-[#F6F0E4] px-8 py-32 text-[#46392E]"
    >
      <div className="mx-auto max-w-7xl">

        <span className={`${scriptFont.className} text-2xl text-[#7C8264]`}>
          get to know me
        </span>

        <h2 className={`${serifFont.className} mb-10 mt-2 text-5xl font-semibold`}>
          About Me
        </h2>

        <div className="relative max-w-3xl rounded-sm border border-[#DCCBA8] bg-[#FFFDF8] p-10 shadow-[0_18px_40px_rgba(70,57,46,0.08)]">

          <p className="text-lg leading-9 text-[#5E5142]">
            {data.description}
          </p>

        </div>


      </div>
    </section>
  );
}
