// src/components/landing/LandingPet.tsx
import SectionTitle from "@/components/landing/SectionTitle";
import Reveal from "@/components/landing/Reveal";
import PetCarousel from "@/components/landing/PetCarousel";
import { PET } from "@/components/landing/landingData";

export default function LandingPet() {
  return (
    <section id="pet-health" className="bg-grey-soft pt-10 pb-24 max-[767px]:px-5! max-[767px]:py-10!">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionTitle title={PET.title} text={PET.text} />
        <Reveal>
          <PetCarousel />
        </Reveal>
      </div>
    </section>
  );
}
