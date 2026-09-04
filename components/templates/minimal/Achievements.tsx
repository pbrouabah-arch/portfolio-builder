import { Trophy } from "lucide-react";
import { scriptFont, serifFont } from "./fonts";
interface AchievementsProps { data: any; }
export default function Achievements({ data }: AchievementsProps) {
 const items = data.achievements ?? [];
 return <section id="achievements" className="bg-[#F6F0E4] px-8 py-32 text-[#46392E]"><div className="mx-auto max-w-7xl"><span className={`${scriptFont.className} text-2xl text-[#7C8264]`}>milestones worth remembering</span><h2 className={`${serifFont.className} mt-2 text-5xl font-semibold`}>Achievements</h2><p className="mt-5 max-w-3xl text-[#8B7B68]">Highlights and accomplishments.</p>{items.length===0?<p className="mt-12 text-[#8B7B68]">No achievements added yet.</p>:<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{items.map((item:any)=><article key={item.id} className="rounded-sm border border-[#DCCBA8] bg-[#FFFDF8] p-8 shadow-[0_14px_30px_rgba(70,57,46,0.08)]"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDE2CE] text-[#7C8264]"><Trophy size={23}/></div><h3 className="mt-6 text-2xl font-bold">{item.title}</h3>{item.achievement_year&&<p className={`${scriptFont.className} mt-2 text-xl text-[#7C8264]`}>{item.achievement_year}</p>}{item.description&&<p className="mt-5 leading-7 text-[#5E5142]">{item.description}</p>}</article>)}</div>}</div></section>;
}
