import type { TFunction } from "i18next";
import openSkedPreview from "@/assets/opensked-preview.png";
import notaryPreview from "@/assets/notary-preview.png";
import rinPreviewAsset from "@/assets/portfolio_rin_aesthetic.png.asset.json";
import bellhousePreviewAsset from "@/assets/portfolio_bellhouse_real_estate.png.asset.json";
import eliteRidePreview from "@/assets/elite-ride-preview.png";
import clubtreePreview from "@/assets/clubtree-preview.png";
import rotaryCvillePreview from "@/assets/rotary-cville-preview.png";
import webbConsultingPreview from "@/assets/webb-consulting-preview.png";
import m5ConsultPreview from "@/assets/m5-consult-preview.png";
import twillsyPreview from "@/assets/twillsy-preview.png";
import revsiPreviewAsset from "@/assets/portfolio_revsi.png.asset.json";
import yayLogoPreviewAsset from "@/assets/portfolio_yaylogo.png.asset.json";

export type PortfolioFilter = "websites" | "web-apps" | "e-commerce" | "our-products";

export interface PortfolioProject {
  name: string;
  tag: string;
  desc: string;
  href: string;
  image: string;
  filter: PortfolioFilter;
  /** Internal case-study route; when set, the card links here instead of the live site. */
  to?: string;
}

export function getPortfolioProjects(t: TFunction, lang: string): PortfolioProject[] {
  const isBg = lang.startsWith("bg");
  return [
    {
      name: t("work.project1Name"),
      tag: t("work.project1Category"),
      desc: t("work.project1Desc"),
      href: "https://opensked.com/",
      image: openSkedPreview,
      filter: "web-apps",
    },
    {
      name: t("work.project_yaylogo_name"),
      tag: t("work.project_yaylogo_category"),
      desc: t("work.project_yaylogo_desc"),
      href: "https://yaylogo.com",
      image: yayLogoPreviewAsset.url,
      filter: "our-products",
    },
    {
      name: t("work.project_revsi_name"),
      tag: t("work.project_revsi_category"),
      desc: t("work.project_revsi_desc"),
      href: "https://revsi.app",
      image: revsiPreviewAsset.url,
      filter: "our-products",
    },
    {
      name: t("work.project_ct_name"),
      tag: t("work.project_ct_category"),
      desc: t("work.project_ct_desc"),
      href: "https://clubtree.app",
      image: clubtreePreview,
      filter: "web-apps",
    },
    {
      name: t("work.project2Name"),
      tag: t("work.project2Category"),
      desc: t("work.project2Desc"),
      href: "https://notaryclosingnetwork.com/",
      image: notaryPreview,
      filter: "websites",
    },
    {
      name: t("work.project_rc_name"),
      tag: t("work.project_rc_category"),
      desc: t("work.project_rc_desc"),
      href: "https://charlottesvillerotary.org",
      image: rotaryCvillePreview,
      filter: "websites",
    },
    isBg
      ? {
          name: t("work.project_m5_name"),
          tag: t("work.project_m5_category"),
          desc: t("work.project_m5_desc"),
          href: "https://mfiveconsult.com",
          image: m5ConsultPreview,
          filter: "websites",
        }
      : {
          name: t("work.project_wc_name"),
          tag: t("work.project_wc_category"),
          desc: t("work.project_wc_desc"),
          href: "https://webb-consulting.net",
          image: webbConsultingPreview,
          filter: "websites",
        },
    {
      name: t("work.project3Name"),
      tag: t("work.project3Category"),
      desc: t("work.project3Desc"),
      href: "https://rinaestheticsva.com/",
      image: rinPreviewAsset.url,
      filter: "websites",
      to: "/work/rin-aesthetic-practice",
    },
    {
      name: t("work.project4Name"),
      tag: t("work.project4Category"),
      desc: t("work.project4Desc"),
      href: "https://bellhouserealestate.com",
      image: bellhousePreviewAsset.url,
      filter: "websites",
      to: "/work/bellhouse-real-estate",
    },
    {
      name: "Elite Ride Solutions",
      tag: "Luxury Transportation",
      desc: "Premium ride booking site for a custom transportation brand.",
      href: "https://eliteridesolutions.com/",
      image: eliteRidePreview,
      filter: "websites",
    },
    {
      name: t("work.project_tw_name"),
      tag: t("work.project_tw_category"),
      desc: t("work.project_tw_desc"),
      href: "https://twillsy.com",
      image: twillsyPreview,
      filter: "e-commerce",
    },
  ];
}
