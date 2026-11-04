// src/app/ambassadors/page.tsx
// Matches ark-equine.com/ambassadors/: grey title bar, then category bands (Eventing,
// Dressage, Racing) each with alternating white/grey ambassador rows.
import PageHeaderBar from "@/components/shop/PageHeaderBar";
import AmbassadorRow, { Ambassador } from "@/components/ambassadors/AmbassadorRow";

export const metadata = {
  title: "Ambassadors",
  description: "Brand Ambassadors for ARKequine",
};

const CATEGORIES: { title: string; ambassadors: Ambassador[] }[] = [
  {
    title: "Eventing",
    ambassadors: [
      {
        name: "Jo Andrews, Eventing Brand Ambassador",
        image: "https://ark-equine.com/wp-content/uploads/2026/03/Jo-A.jpg",
        imageWidth: 150,
        imageHeight: 150,
        alt: false,
        paragraphs: [
          "Jo Andrews is an accomplished rider, coach, and breeder behind Peak Sporthorses, with experience spanning elite eventing and dressage. She has competed up to 4* eventing level and Prix St. Georges dressage, and represented Team GB at the 3* European Championships in 2005 and 2007.",
          "Today, Jo focuses on coaching and producing quality sport horses, combining high-performance expertise with a progressive approach to training and welfare. As an ARKequine brand ambassador, she shares a commitment to performance, horse wellbeing, and helping horses reach their full potential.",
        ],
      },
      {
        name: "Noel Dunne, Eventing Brand Ambassador",
        image: "https://ark-equine.com/wp-content/uploads/2023/09/Noel_Dunne_headshot-300x300.jpg",
        imageWidth: 300,
        imageHeight: 300,
        alt: true,
        paragraphs: [
          "Noel is an international event rider and runs his own eventing yard in Taghmon in County Wexford.  With a string of impressive wins this year including Wexford’s Stepping Stones, the Young Event Class at Balmoral and the 5 Year Old Event Class at the Dublin Horse Show, Noel is looking to compete at Burghley and in more upper-level classes for 2024.",
        ],
      },
    ],
  },
  {
    title: "Dressage",
    ambassadors: [
      {
        name: "Tara Hayes, derbymed Dressage Brand Ambassador",
        image: "https://ark-equine.com/wp-content/uploads/2021/09/Tara-Hayes-300x300.jpg",
        imageWidth: 300,
        imageHeight: 300,
        alt: true,
        paragraphs: [
          "Tara comes from a famous equestrian family and has competed successfully at national and international level. Tara and her horse Fererro K are currently on The Horse Sport Ireland Young Rider Development Team.",
        ],
        more: { label: "For more on Tara click", href: "https://www.instagram.com/tara.hayes.dressage/" },
        videoId: "WZk7wgy3FjI",
      },
    ],
  },
  {
    title: "Racing",
    ambassadors: [
      {
        name: "Ciaran Murphy Charlestown Racing, ARKequine Racing Brand Ambassador",
        image: "https://ark-equine.com/wp-content/uploads/2022/05/ciaran_lowres_square-300x300.jpg",
        imageWidth: 300,
        imageHeight: 300,
        alt: false,
        paragraphs: [
          "Based in Mullingar, County Westmeath, Ciaran took over the training licence at Charlestown Racing from Dot Love in 2021.  Running a dual purpose yard which he and his team are constantly striving to develop, Ciaran has an exciting year ahead with Enjoy D’allen entered to run in the English Grand National as well as a lovely crop of 2 year olds to campaign for the flat season.",
        ],
        more: { label: "For more on Ciaran Murphy Charlestown Racing visit", href: "https://www.cmcracing.ie/" },
      },
      {
        name: "Anthony McCann Racing, ACME Brand Ambassador",
        image: "https://ark-equine.com/wp-content/uploads/2022/09/AnthonyMCann_Low-1-300x300.jpg",
        imageWidth: 300,
        imageHeight: 300,
        alt: true,
        paragraphs: [
          "Having taken over the trainers license from the late Oliver Brady in 2014, Anthony has grown and developed Shabra Stables to become a leading dual purpose yard. He has an exceptional track record at race courses such as Dundalk Stadium.",
        ],
        more: { label: "For more on Anthony McCann click", href: "https://www.facebook.com/anthonymccannracing" },
      },
      {
        name: "Tom Ellis Racing; ARKequine Brand Ambassador",
        image: "https://ark-equine.com/wp-content/uploads/2026/01/Tom-and-Gina.webp",
        imageWidth: 350,
        imageHeight: 219,
        alt: false,
        paragraphs: [
          "Tom Ellis and Gina Andrews form one of the most formidable partnerships in British racing. Tom is the most successful Point-to-Point trainer of recent times, a five-time Trainers’ Champion with nearly 300 winners in the past five seasons and a record 71 winners in a single year. Since moving under Rules, his success has continued, highlighted by Latenightpass’s Aintree Foxhunters Chase victory and Grand National run. Gina, a ten-time National Point-to-Point Champion, is the leading female rider of all time. Her skill, drive and elite-level wins are central to the ongoing success of Tom Ellis Racing.",
        ],
        more: { label: "More information here:", href: "https://tomellisracing.com/" },
      },
    ],
  },
];

export default function AmbassadorsPage() {
  return (
    <>
      <PageHeaderBar title="Ambassadors" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Ambassadors" }]} />

      {CATEGORIES.map((category , i) => (
        <section className="bg-white" key={i+1}>
          <div className="mx-auto max-w-[1210px] px-4 pt-[26px]">
            <h2 className="mb-2 font-[family-name:var(--f-head)] text-[20px] font-normal text-[color:var(--color-secondary)] uppercase">
              {category.title}
            </h2>
          </div>
          {category.ambassadors.map((ambassador) => (
            <AmbassadorRow key={ambassador.name} {...ambassador} />
          ))}
        </section>
      ))}
    </>
  );
}
