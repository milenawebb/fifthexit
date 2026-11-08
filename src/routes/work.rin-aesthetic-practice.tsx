import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CaseStudy, type CaseStudyCopy } from "@/components/work/CaseStudy";
import rinImage from "@/assets/rin-case-study.webp.asset.json";
import shareImage from "@/assets/rin-case-study-share.jpg.asset.json";
import concernsImage from "@/assets/rin-concerns-v2.webp.asset.json";
import treatmentsImage from "@/assets/rin-treatments.webp.asset.json";
import { getHost } from "@/lib/host.functions";
import { siteMetaForHost } from "@/lib/site-meta";
import { hreflangLinks } from "@/lib/seo-hosts";
import { loadMessages } from "@/i18n";

const path = "/work/rin-aesthetic-practice";
const galleryImages = [concernsImage.url, treatmentsImage.url];

export const Route = createFileRoute("/work/rin-aesthetic-practice")({
  loader: async () => {
    const host = typeof window === "undefined" ? await getHost() : window.location.host;
    const site = siteMetaForHost(host);
    const messages = await loadMessages(site.lang);
    const copy = messages.rinCaseStudy as CaseStudyCopy;
    return { origin: site.origin, title: copy.metaTitle, description: copy.metaDescription };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "fifthexit: Case study unavailable" }, { name: "robots", content: "noindex" }] };
    const { origin, title, description } = loaderData;
    const image = `${origin}${shareImage.url}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${origin}${path}` },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: `${origin}${path}` }, ...hreflangLinks(path)],
    };
  },
  component: RinCaseStudy,
  errorComponent: () => <p role="alert" className="px-6 py-24 text-foreground">RIN Aesthetic Practice: page unavailable.</p>,
  notFoundComponent: () => <p className="px-6 py-24 text-foreground">RIN Aesthetic Practice: page not found.</p>,
});

function RinCaseStudy() {
  const { t, i18n } = useTranslation();
  const copy = t("rinCaseStudy", { returnObjects: true }) as CaseStudyCopy;
  const backToAll = i18n.language === "bg" ? undefined : { label: t("work.backToAll"), href: "/portfolio" };
  const gallery = (copy.gallery ?? [])
    .map((item, index) => ({ ...item, image: galleryImages[index] ?? "" }))
    .filter(item => item.image !== "");
  return <CaseStudy copy={copy} image={rinImage.url} gallery={gallery} stack={["React", "Tailwind CSS", "Supabase"]} liveUrl="https://rinaestheticsva.com" previous={{ name: "Rotary Club of Charlottesville", href: "https://charlottesvillerotary.org" }} next={{ name: "Bellhouse Real Estate Group", href: "/work/bellhouse-real-estate" }} backToAll={backToAll} />;
}
