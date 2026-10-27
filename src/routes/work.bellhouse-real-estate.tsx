import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CaseStudy, type CaseStudyCopy } from "@/components/work/CaseStudy";
import heroImage from "@/assets/bellhouse-case-study.webp.asset.json";
import shareImage from "@/assets/bellhouse-case-study-share.jpg.asset.json";
import mapImage from "@/assets/bellhouse-areas-map.webp.asset.json";
import listingImage from "@/assets/bellhouse-listing.webp.asset.json";
import { getHost } from "@/lib/host.functions";
import { siteMetaForHost } from "@/lib/site-meta";
import { hreflangLinks } from "@/lib/seo-hosts";
import { loadMessages } from "@/i18n";

const path = "/work/bellhouse-real-estate";
const galleryImages = [mapImage.url, listingImage.url];

export const Route = createFileRoute("/work/bellhouse-real-estate")({
  loader: async () => {
    const host = typeof window === "undefined" ? await getHost() : window.location.host;
    const site = siteMetaForHost(host);
    const messages = await loadMessages(site.lang);
    const copy = messages.bellhouseCaseStudy as CaseStudyCopy;
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
  component: BellhouseCaseStudy,
  errorComponent: () => <p role="alert" className="px-6 py-24 text-foreground">Bellhouse Real Estate Group: page unavailable.</p>,
  notFoundComponent: () => <p className="px-6 py-24 text-foreground">Bellhouse Real Estate Group: page not found.</p>,
});

function BellhouseCaseStudy() {
  const { t } = useTranslation();
  const copy = t("bellhouseCaseStudy", { returnObjects: true }) as CaseStudyCopy;
  const gallery = (copy.gallery ?? [])
    .map((item, index) => ({ ...item, image: galleryImages[index] ?? "" }))
    .filter(item => item.image !== "");
  return <CaseStudy copy={copy} image={heroImage.url} imageSize={{ width: 1200, height: 750 }} gallery={gallery} stack={["React", "Tailwind CSS", "Supabase"]} liveUrl="https://bellhouserealestate.com" previous={{ name: "RIN Aesthetic Practice", href: "/work/rin-aesthetic-practice" }} next={{ name: "Elite Ride Solutions", href: "https://eliteridesolutions.com" }} />;
}
