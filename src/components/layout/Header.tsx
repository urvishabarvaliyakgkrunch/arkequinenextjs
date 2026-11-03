// src/components/layout/Header.tsx
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import TopBar from "@/components/layout/TopBar";
import MobileMenu from "@/components/layout/MobileMenu";
import CartIcon from "@/components/layout/CartIcon";
import SearchToggle from "@/components/layout/SearchToggle";
import { type NavLink, type SubLink } from "@/components/layout/navLinks";

const REVEAL =
  "invisible opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100";

function SubItem({ item }: { item: SubLink }) {
  return (
    <li className="group/sub relative">
      <Link
        href={item.href}
        className="block px-[15px] py-2 text-[12px] leading-[23px] font-normal text-muted transition-colors hover:bg-topbar hover:text-ink-dark"
      >
        {item.label}
      </Link>
      {item.children && (
        <ul className="invisible absolute top-0 right-full w-[208px] border border-border bg-white opacity-0 shadow-[0_8px_15px_rgba(0,0,0,0.1)] transition-opacity duration-150 group-hover/sub:visible group-hover/sub:opacity-100">
          {item.children.map((c) => (
            <SubItem key={c.label} item={c} />
          ))}
        </ul>
      )}
    </li>
  );
}

function MegaMenu({ mega }: { mega: NonNullable<NavLink["mega"]> }) {
  return (
    <div
      className={`${REVEAL} absolute top-[112px] z-50 border-t border-t-ink-dark bg-white px-[30px] pt-[21px] pb-[30px] shadow-[0_32px_60px_rgba(0,0,0,0.1)]`}
      style={{ width: mega.width, right: "max(50px, calc(50% - 605px))" }}
    >
      <div className="flex">
        {mega.columns.map((c, i) => (
          <div
            key={c.title}
            style={{ width: `${100 / mega.columns.length}%` }}
            className={`shrink-0 pt-[10px] ${
              i < mega.columns.length - 1
                ? "border-r border-dotted border-border pr-[14px]"
                : ""
            } ${i > 0 ? "pl-[15px]" : ""}`}
          >
            <Link
              href={c.href}
              className="block text-[15px] leading-[23px] font-bold text-primary"
            >
              {c.title}
            </Link>
            <ul>
              {c.items.map((it) => (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    {...(it.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="relative block py-[3px] pl-[12px] text-[12px] leading-[23px] text-muted transition-colors hover:text-ink-dark before:absolute before:top-1/2 before:left-[2px] before:-mt-[3px] before:border-y-[3px] before:border-l-[4px] before:border-y-transparent before:border-l-muted before:content-['']"
                  >
                    {it.image ? (

                      // unoptimized on purpose: staging.ark-equine.com answers the image optimizer with a 504, so the browser loads it directly
                      <Image src={it.image} alt="" width={300} height={300} unoptimized className="mt-2 h-auto w-[150px]" />

                    ) : (

                      it.label

                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavItem({ link }: { link: NavLink }) {
  const label = (
    <span
      className={
        link.button
          ? "block rounded-[2px] bg-ink-dark px-[9px] py-[9px] leading-[20px] tracking-[1px] text-white"
          : ""
      }
    >
      {link.label}
    </span>
  );

  return (
    <li className={`group ${link.children ? "relative" : ""}`}>
      <Link
        href={link.href}
        className={`flex h-[113px] items-center px-[13px] text-[13px] leading-[113px] font-bold uppercase transition-colors ${
          link.current
            ? "text-primary"
            : link.button
              ? "text-white"
              : "text-muted hover:text-ink-dark"
        }`}
      >
        {label}
      </Link>
      {link.children && (
        <ul
          className={`${REVEAL} absolute top-[112px] left-0 z-50 w-[208px] border-t-2 border-t-ink-dark bg-white shadow-[0_8px_15px_rgba(0,0,0,0.1)]`}
        >
          {link.children.map((c) => (
            <SubItem key={c.label} item={c} />
          ))}
        </ul>
      )}
      {link.mega && <MegaMenu mega={link.mega} />}
    </li>
  );
}

export default function Header({ navLinks }: { navLinks: NavLink[] }) {
  return (
    <header className="relative z-[200] w-full bg-white">
      <TopBar />
      <div className="relative border-b border-border [overflow-x:clip]">
        <Container>
          <div className="flex h-[90px] items-center md:h-[113px]">
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="https://ark-equine.com/wp-content/uploads/2021/08/ArkEquineHorizontalLogo-copy.jpg"
                alt="ARK Equine"
                width={215}
                height={113}
                priority
                className="h-[90px] w-auto md:h-[113px]"
              />
            </Link>

            <div className="ml-auto flex items-center">
              <nav className="hidden lg:block" aria-label="Main">
                <ul className="flex items-center">
                  {navLinks.map((link) => (
                    <NavItem key={link.label} link={link} />
                  ))}
                  <SearchToggle />
                </ul>
              </nav>

              <Image
                src="https://ark-equine.com/wp-content/uploads/2025/07/gptw-Certified-April-2025-1.png"
                alt="Great Place to Work Certified"
                width={60}
                height={102}
                className="mt-[5px] ml-[21px] hidden h-[102px] w-[60px] self-start lg:block"
              />

              <div className="flex items-center gap-3 lg:ml-0">
                <CartIcon />
                <MobileMenu links={navLinks} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
