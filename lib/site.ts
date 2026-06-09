// Central site configuration — edit copy, links, and metadata here.
export const site = {
  name: "9th Street Labs",
  shortName: "9St",
  description: "9th Street Labs — building the future, one product at a time.",
  url: "https://9thstreetlabs.com",
  nav: [
    { label: "Product", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  social: {
    github: "https://github.com/9th-Street-Labs",
  },
} as const;

export type Site = typeof site;
