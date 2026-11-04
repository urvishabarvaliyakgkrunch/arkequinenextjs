// src/components/ambassadors/AmbassadorRow.tsx
import Image from "next/image";

export type Ambassador = {
  name: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  paragraphs: string[];
  more?: { label: string; href: string };
  videoId?: string;
  alt: boolean;
};

// Matches ark-equine.com/ambassadors/: circular headshot + copy, alternating white/grey rows.
// Each ambassador's photo keeps its own live-measured size (not a uniform thumbnail).
export default function AmbassadorRow({ name, image, imageWidth, imageHeight, paragraphs, more, videoId, alt }: Ambassador) {
  return (
    <div className={alt ? "bg-[#e1e1e1]" : "bg-white"}>
      <div className="mx-auto grid max-w-[1210px] grid-cols-1 items-center px-4 py-10 sm:px-0 lg:grid-cols-2 lg:pt-[25px] lg:pb-[40px]">
        <div className="flex justify-center py-8 lg:py-10">
          <Image
            src={image}
            alt={name}
            width={imageWidth}
            height={imageHeight}
            style={{ width: imageWidth, height: imageHeight }}
            className="rounded-full object-cover"
            unoptimized
          />
        </div>

        <div className="font-[family-name:var(--f-body)] text-[17px] leading-[1.65] text-[#57585a]">
          <p className="mb-3 font-bold text-[color:var(--color-primary)]">{name}</p>
          {paragraphs.map((p) => (
            <p key={p} className="mb-4 last:mb-0">
              {p}
            </p>
          ))}
          {more && (
            <p className="mt-4">
              {more.label}{" "}
              <a
                href={more.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-primary)] hover:underline"
              >
                {more.href.includes("tomellisracing") ? "Tom Ellis Racing – Dream Big" : "here"}
              </a>
            </p>
          )}
          {videoId && (
            <div className="mt-5 aspect-video w-full max-w-[520px] overflow-hidden">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${name} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
