// Central site configuration — edit copy, links, and metadata here.
export const site = {
  name: "9th Street Labs",
  shortName: "9st",
  product: "Whip",
  tagline: "The Whip for your agents",
  description:
    "Whip by 9th Street Labs — the whip for your AI agents. They code on your desktops; you drive them from your phone. Point, type, talk — never babysit a terminal again.",
  url: "https://9thstreetlabs.com",
  domain: "9st.ai",
  nav: [
    { label: "Point", href: "#point" },
    { label: "Modes", href: "#modes" },
    { label: "Mesh", href: "#mesh" },
    { label: "Remote", href: "#remote" },
    { label: "Specs", href: "#specs" },
  ],
  social: {
    github: "https://github.com/9th-Street-Labs",
  },
  // Placeholder hrefs — swap when public builds / store listings ship.
  downloads: {
    desktop: [
      { label: "Windows (.exe)", href: "#" },
      { label: "macOS (.dmg)", href: "#" },
      { label: "Linux (.AppImage / .deb)", href: "#" },
    ],
    stores: [
      { label: "App Store — soon" },
      { label: "Google Play — soon" },
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
      qualifier: "Push-to-talk",
      copy: "Dictate the next prompt from the kitchen. Hold to talk — speech streams to ==white:Deepgram Flux== and types into your agent's terminal.",
      footnote: "11 languages · API key never touches your phone",
    },
    {
      name: "keyboard",
      qualifier: "Layout-free",
      copy: "Your agent asked a question. Reply from your pocket — text ==white:diff-syncs== to the desktop, ==white:no layout problems, ever==.",
      footnote: "esc · tab · arrows · enter included",
    },
    {
      name: "trackpad",
      qualifier: "Touch-relative",
      copy: "Precision when you need it. Touch-relative surface with ==white:click zones== and a scroll strip — scrub the diff, hit the button.",
      footnote: "two-finger scroll · tap-click",
    },
    {
      name: "remote",
      qualifier: "Presenter + media",
      copy: "Slides and media keys too. Advance the deck, blank the screen, skip the track — ==white:same phone, same mesh==.",
      footnote: "prev / next · F5 · play · volume",
    },
  ],
  mesh: {
    features: [
      {
        name: "clipboard",
        qualifier: "Synced",
        copy: "Text and images ==white:follow your cursor== across machines.",
      },
      {
        name: "files",
        qualifier: "Drag-drop",
        copy: "Sling files between desktops over TLS, ==white:hash-verified==.",
      },
      {
        name: "discovery",
        qualifier: "mDNS + QR",
        copy: "Desktops find each other. Phones pair with ==white:one scan==.",
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
      name: "WebRTC DataChannel",
      qualifier: "Primary",
      copy: "Unreliable, unordered, ==white:low-latency== — built for input events.",
    },
    {
      name: "WebSocket",
      qualifier: "Floor",
      copy: "==white:Always-works== fallback on any network that passes TCP.",
    },
    {
      name: "BLE GATT",
      qualifier: "No shared Wi-Fi? Still works",
      copy: "Direct radio lane between phone and desktop. ==white:No router required==.",
    },
  ],
  trust: [
    "mDNS discovery",
    "QR pairing",
    "Fingerprint-pinned TLS",
  ],
  comparison: {
    others: {
      name: "Desktop-only KVMs",
      headline: "The others just move your mouse.",
      rows: [
        { value: "yes", unit: "", label: "keyboard + mouse mesh" },
        { value: "—", unit: "", label: "phone as input" },
        { value: "—", unit: "", label: "air-mouse pointing" },
        { value: "—", unit: "", label: "voice dictation" },
        { value: "—", unit: "", label: "hardware remote" },
        { value: "—", unit: "", label: "latency, measured in-app" },
      ],
    },
    whip: {
      name: "Whip",
      rows: [
        { value: "<3", unit: "ms p95", label: "keyboard + mouse mesh" },
        { value: "first", unit: "class", label: "phone as input" },
        { value: "<25", unit: "ms", label: "air-mouse pointing" },
        { value: "11", unit: "languages", label: "voice dictation" },
        { value: "dual", unit: "mode", label: "hardware remote" },
        { value: "p50", unit: "/ p95 / p99", label: "latency, measured in-app" },
      ],
    },
    links: [
      { label: "Deskflow", href: "https://github.com/deskflow/deskflow" },
      { label: "Input Leap", href: "https://github.com/input-leap/input-leap" },
      { label: "Lan Mouse", href: "https://github.com/feschber/lan-mouse" },
    ],
  },
} as const;

export type Site = typeof site;
