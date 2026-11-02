// src/components/home/ExpertBlog.tsx
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageOverlay from "@/components/ui/ImageOverlay";
import { BLOG_POSTS } from "./homeData";

export default function ExpertBlog() {
  return (
    <section className="bg-white">
      <Container>
        <div className="py-[25px]">
          <SectionHeading>Expert Blog</SectionHeading>
          <div className="mb-[40px] grid grid-cols-1 items-start gap-x-[6%] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {BLOG_POSTS.map((post) => (
              <article key={post.href}>
                <Link
                  href={post.href}
                  title={post.title}
                  className="group relative mb-[6px] block overflow-hidden rounded-[3px] bg-white"
                >
                  <Image src={post.img} alt={post.title} width={260} height={185} className="block h-auto w-full" />
                  <ImageOverlay />
                </Link>
                <h3 className="font-heading text-[20px] leading-[28px] font-normal text-secondary uppercase">
                  <Link href={post.href} title={post.title}>
                    {post.title}
                  </Link>
                </h3>
                <div className="pb-[10px] text-[17px] leading-[28.05px] text-meta">
                  <time dateTime={post.dateTime} className="text-[15.3px]">
                    {post.date}
                  </time>
                </div>
                <Link
                  href={post.href}
                  className="inline-block h-[30px] text-[17px] leading-[28.05px] text-primary transition-colors hover:text-secondary"
                >
                  Read more
                  <svg viewBox="0 0 15 32" width="10" height="10" fill="currentColor" aria-hidden="true" className="ml-[3px] inline-block align-baseline">
                    <path d="M0.416 27.84l11.456-11.84-11.456-11.904q-0.832-0.832 0-1.536 0.832-0.832 1.536 0l12.544 12.608q0.768 0.832 0 1.6l-12.544 12.608q-0.704 0.832-1.536 0-0.832-0.704 0-1.536z" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
