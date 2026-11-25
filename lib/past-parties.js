// Catalogue of previous LA Trans Party events, shown at /past-parties and on the homepage.
//
// To add an event:
//   1. Put its photos in /public/past-parties/<slug>/
//   2. Add an entry below. Example:
//
//   {
//     slug: "summer-2025",
//     title: "Summer 2025",
//     date: "August 16, 2025",
//     city: "Los Angeles",
//     theme: "Latex & Lace",
//     summary: "Our first night in West Hollywood: 180 guests, three play rooms and a rope showcase.",
//     cover: "/past-parties/summer-2025/cover.jpg",
//     photos: [
//       { src: "/past-parties/summer-2025/01.jpg", alt: "Guests on the main floor" },
//       { src: "/past-parties/summer-2025/02.jpg", alt: "Rope demo on the stage" },
//     ],
//   },
//
// Only use photos you took or have rights to, of guests who agreed to be shown publicly.

export const PAST_EVENTS = [];

export const PAST_PARTY_PHOTOS = PAST_EVENTS.flatMap((e) =>
  (e.photos || []).map((p) => ({ ...p, caption: p.caption || e.title }))
);
