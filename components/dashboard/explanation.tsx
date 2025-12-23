import { listItems } from "@/lib/consts";
import Image from "next/image";

function Explanation() {
  return (
    <section className="my-24">
      <h3 className="mb-8 text-center text-xl font-semibold sm:text-2xl md:text-4xl">
        How it works?
      </h3>
      <div className="relative">
        <ul className="space-y-8 text-center text-sm md:text-base">
          {listItems.map(({ id, content, icon }) => (
            <li
              key={id}
              className="bg-card/50 flex flex-col items-center gap-3 px-2.5 py-8 backdrop-blur-2xl"
            >
              {icon}
              <span>{content}</span>
            </li>
          ))}
        </ul>

        <Image
          src="/bg.webp"
          alt="Background"
          fill
          className="-z-10 object-contain object-center lg:object-cover lg:object-bottom"
          quality={50}
        />
      </div>
    </section>
  );
}

export default Explanation;
