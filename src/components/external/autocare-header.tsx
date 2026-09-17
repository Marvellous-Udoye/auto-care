import { Menu, Search } from "lucide-react";
import { navItems } from "@/constants/autocare";
import { Container, Logo } from "@/components/external/autocare-shared";

export function AutocareHeader() {
  return (
    <header className="relative z-10 pt-[42px] max-[700px]:pt-6">
      <Container className="flex items-center justify-between">
        <Logo />
        <nav
          className="flex gap-[45px] text-base font-semibold text-[#e7e7e7] max-[1050px]:hidden"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button className="inline-grid place-items-center border-0 bg-transparent text-white" aria-label="Search">
            <Search size={24} />
          </button>
          <button className="hidden place-items-center border-0 bg-transparent text-white max-[1050px]:inline-grid" aria-label="Open menu">
            <Menu size={26} />
          </button>
        </div>
      </Container>
    </header>
  );
}
