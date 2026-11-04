// src/app/contact-us/page.tsx
// Matches ark-equine.com/contact-us/: grey title bar, teal/horse hero banner, two-column
// (team contacts + send-mail form) section, head-office block, below the form.
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with the ARKequine team.",
};

const TEAM = [
  {
    name: "Kirsty McCann – General Manager, Ireland and United Kingdom.",
    lines: ["Mob: +353 86 791 1032", "Ph:    +353 1 841 7666 / +44 292 800 022"],
    email: "k.mccann@ark-equine.com",
  },
  {
    name: "James King – Territory Manager, Ireland.",
    lines: ["Mob: +353 87 692 9339", "Ph:    +353 1 841 7666 / +44 292 800 022"],
    email: "j.king@ark-equine.com",
  },
  {
    name: "Charmaine O’Neill – Territory Manager, UK.",
    lines: ["Mob: +44 7879 652 908", "Ph:    +44 292 800 022"],
    email: "c.oneill@ark-equine.com",
  },
];

export default function ContactUsPage() {
  return (
    <>
      <PageHeaderBar title="Contact Us" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

      <div
        className="flex h-[220px] items-center justify-center bg-cover bg-center sm:h-[300px]"
        style={{
          backgroundImage:
            "url(https://ark-equine.com/wp-content/uploads/2021/09/ArkEquineTestimonialImage-1030x687.png)",
        }}
      >
        <h1 className="px-4 text-center font-[family-name:var(--f-head)] text-[28px] font-bold tracking-[1px] text-white uppercase sm:text-[34px]">
          Contact Us
        </h1>
      </div>

      <div className="mx-auto max-w-[1210px] px-4 py-10 sm:py-[25px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-[73px] pb-10 sm:pb-[25px]">
          <div className="flex flex-col gap-6 font-[family-name:var(--f-body)] text-[17px] leading-[1.6] text-[color:var(--color-ink)]">
            {TEAM.map((person) => (
              <div key={person.email}>
                <p className="font-bold text-[color:var(--color-primary)]">{person.name}</p>
                {person.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p>
                  e:{" "}
                  <a href={`mailto:${person.email}`} className="text-[color:var(--color-primary)] hover:underline">
                    {person.email}
                  </a>
                </p>
              </div>
            ))}

            <div>
              <p className="font-bold text-[color:var(--color-primary)]">ARKequine</p>
              <p>Newbridge Industrial Estate</p>
              <p>Newbridge</p>
              <p>Co. Kildare</p>
              <p>W12 YF63</p>
              <p>Ireland</p>
            </div>

            <div>
              <p>Ph: +353 45 433203</p>
              <p>Fax: +353 45 433934</p>
              <p>UK Ph +44 1292 800 022</p>
            </div>

            <p>
              E:{" "}
              <a href="mailto:enquiries@ark-equine.com" className="text-[color:var(--color-primary)] hover:underline">
                enquiries@ark-equine.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-[family-name:var(--f-head)] text-[20px] font-normal text-[color:var(--color-secondary)] uppercase">
              Send Us Mail
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
