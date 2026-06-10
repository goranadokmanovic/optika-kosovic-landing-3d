export type FaqItem = {
  id: string;
  title: string;
  shortTitle: string;
};

export const faqItems: FaqItem[] = [
  { id: "nepravilno-koriscenje-naocara", title: "Nepravilno korišćenje naočara", shortTitle: "Nepravilno korišćenje naočara" },
  { id: "kratkovidost-myopia", title: "Kratkovidost — myopia", shortTitle: "Kratkovidost - myopia" },
  { id: "naocare-za-rad", title: "Naočare za rad", shortTitle: "Naočare za rad" },
  { id: "kvalitetna-stakla", title: "Zašto odabrati kvalitetna plastična stakla", shortTitle: "Zašto odabrati kvalitetna stakla" },
  { id: "katarakta", title: "Katarakta — zamućenje očnog sočiva", shortTitle: "Katarakta - zamućenje očnog sočiva" },
  { id: "osteceni-zastitni-slojevi", title: "Oštećeni zaštitni slojevi na staklima", shortTitle: "Oštećeni zaštitni slojevi na naočarima" },
  { id: "prizme-prizma-folija", title: "Prizme i prizma folija", shortTitle: "Prizme i prizma folija" },
  { id: "plastična-stakla-u-boji", title: "Plastična stakla u boji", shortTitle: "Plastična stakla u boji" },
];

export const faqHref = "/cesta-pitanja";

export function faqSectionHref(id: string) {
  return `${faqHref}#${id}`;
}
