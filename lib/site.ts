// Central site configuration — edit copy, links, and metadata here.
export const site = {
  name: "9th Street Labs",
  shortName: "9st",
  product: "whip",
  tagline: "the whip for your agents",
  description:
    "whip by 9th Street Labs — the whip for your AI agents. They code on your desktops; you drive them from your phone. Point, type, talk — never babysit a terminal again.",
  url: "https://9thstreetlabs.com",
  nav: [
    { label: "point", href: "#point" },
    { label: "modes", href: "#modes" },
    { label: "mesh", href: "#mesh" },
    { label: "remote", href: "#remote" },
    { label: "specs", href: "#specs" },
  ],
  social: {
    github: "https://github.com/9th-Street-Labs",
  },
  // Placeholder hrefs — swap when public builds / store listings ship.
  downloads: {
    desktop: [
      { label: "windows (.exe)", href: "#" },
      { label: "macos (.dmg)", href: "#" },
      { label: "linux (.AppImage / .deb)", href: "#" },
    ],
    stores: [
      { label: "app store — soon" },
      { label: "google play — soon" },
    ],
  },
  ticker: [
    "<25ms sensor-to-cursor",
    "<3ms p95 mesh latency",
    "200Hz IMU",
    "11 languages",
    "0 cloud relays",
  ],
  modes: [
    {
      name: "voice",
      qualifier: "push-to-talk",
      copy: "Dictate the next prompt from the kitchen. Hold to talk — speech streams to Deepgram Flux and types into your agent's terminal.",
      footnote: "11 languages · API key never touches your phone",
    },
    {
      name: "keyboard",
      qualifier: "layout-free",
      copy: "Your agent asked a question. Reply from your pocket — text diff-syncs to the desktop, no layout problems, ever.",
      footnote: "esc · tab · arrows · enter included",
    },
    {
      name: "trackpad",
      qualifier: "touch-relative",
      copy: "Precision when you need it. Touch-relative surface with click zones and a scroll strip — scrub the diff, hit the button.",
      footnote: "two-finger scroll · tap-click",
    },
    {
      name: "remote",
      qualifier: "presenter + media",
      copy: "Slides and media keys too. Advance the deck, blank the screen, skip the track — same phone, same mesh.",
      footnote: "prev / next · F5 · play · volume",
    },
  ],
  mesh: {
    features: [
      {
        name: "clipboard",
        qualifier: "synced",
        copy: "Text and images follow your cursor across machines.",
      },
      {
        name: "files",
        qualifier: "drag-drop",
        copy: "Sling files between desktops over TLS, hash-verified.",
      },
      {
        name: "discovery",
        qualifier: "mDNS + QR",
        copy: "Desktops find each other. Phones pair with one scan.",
      },
    ],
  },
  remoteSpecs: [
    "esp32-c3",
    "200Hz IMU",
    "ble hid / companion dual personality",
    "scroll wheel",
    "haptics",
    "rgb",
  ],
  stats: [
    { value: 25, prefix: "<", suffix: "ms", label: "sensor-to-cursor, phone air-mouse" },
    { value: 3, prefix: "<", suffix: "ms", label: "p95 added latency, desktop mesh" },
    { value: 200, prefix: "", suffix: "Hz", label: "IMU sampling, whip (remote)" },
    { value: 99, prefix: "p", suffix: "", label: "latency percentiles, live in-app" },
  ],
  connectivity: [
    {
      name: "webrtc datachannel",
      qualifier: "primary",
      copy: "Unreliable, unordered, low-latency — built for input events.",
    },
    {
      name: "websocket",
      qualifier: "floor",
      copy: "Always-works fallback on any network that passes TCP.",
    },
    {
      name: "ble gatt",
      qualifier: "no shared wi-fi? still works",
      copy: "Direct radio lane between phone and desktop. No router required.",
    },
  ],
  trust: [
    "mDNS discovery",
    "QR pairing",
    "fingerprint-pinned TLS",
  ],
  comparison: {
    competitors: ["Deskflow", "Input Leap", "Lan Mouse"],
    rows: [
      { feature: "phone as input peer", whip: true, others: [false, false, false] },
      { feature: "air-mouse pointing", whip: true, others: [false, false, false] },
      { feature: "voice dictation", whip: true, others: [false, false, false] },
      { feature: "hardware remote", whip: true, others: [false, false, false] },
      { feature: "measured latency, in-app", whip: true, others: [false, false, false] },
      { feature: "desktop KVM mesh", whip: true, others: [true, true, true] },
      { feature: "clipboard + files", whip: true, others: [true, true, false] },
    ],
    links: [
      { label: "Deskflow", href: "https://github.com/deskflow/deskflow" },
      { label: "Input Leap", href: "https://github.com/input-leap/input-leap" },
      { label: "Lan Mouse", href: "https://github.com/feschber/lan-mouse" },
    ],
  },
} as const;

export type Site = typeof site;
