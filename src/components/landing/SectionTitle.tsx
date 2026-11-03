// src/components/landing/SectionTitle.tsx
import Reveal from "@/components/landing/Reveal";

// Centered serif title with the teal rule underneath, plus the grey sub line
export default function SectionTitle({ title, text }: { title: string; text: string }) {
  return (
    <>
      <Reveal>
        <h2 className="relative mb-[6px] text-center font-serif-lt text-[clamp(26px,3.4vw,34px)] font-normal text-graphite">
          {title}
          <span className="mx-auto mt-3 block h-[3px] w-16 rounded-[1px] bg-teal" />
        </h2>
      </Reveal>
      <Reveal>
        <p className="mb-10 text-center text-[14px] text-[#9a9b9d]">{text}</p>
      </Reveal>
    </>
  );
}
