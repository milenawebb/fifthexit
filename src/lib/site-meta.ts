import bgOgImage from "../assets/fifthexit-eu-og.png.asset.json";
import enOgImage from "../assets/fifthexit-com-og.png.asset.json";
import { languageForHost } from "../i18n";

export interface SiteMeta {
  lang: "en" | "bg";
  origin: string;
  title: string;
  ogTitle: string;
  description: string;
  image: string;
}

export function siteMetaForHost(host?: string | null): SiteMeta {
  const lang = languageForHost(host);

  if (lang === "bg") {
    const origin = "https://fifthexit.eu";
    return {
      lang,
      origin,
      title: "fifthexit — Уеб и приложения, изградени бързо.",
      ogTitle: "Уеб и приложения, изградени бързо.",
      description:
        "fifthexit създава светкавично бързи уебсайтове, мобилни приложения и дигитални продукти, които оставят конкурентите на заден план.",
      image: `${origin}${bgOgImage.url}`,
    };
  }

  const origin = "https://fifthexit.com";
  return {
    lang,
    origin,
    title: "fifthexit — Web & app dev built with speed.",
    ogTitle: "Web & app dev built with speed.",
    description:
      "fifthexit builds vibrant, high-performance web and mobile apps for brands ready to stand out. Book a project consultation today.",
    image: `${origin}${enOgImage.url}`,
  };
}
