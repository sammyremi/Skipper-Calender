export interface Memory {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  image?: string;
  video?: string;
  location?: string;
  tag?: "anniversary" | "travel" | "special" | "date" | "moment";
  featured?: boolean;
}

export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "/Skipper-Calender";

export function getAssetPath(path?: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}

export const MEMORIES: Memory[] = [
  {
    id: "mem-1",
    date: "2026-09-15",
    title: "Our Day Today",
    description: "Every single day spent with you is another chapter added to our endless love story.",
    image: "/jpeg/hero1.png",
    location: "Home",
    tag: "special",
    featured: true,
  },
  {
    id: "mem-2",
    date: "2026-09-14",
    title: "Golden Hour Glow",
    description: "The light was soft, but your smile was brighter than the sun.",
    image: "/jpeg/hero2.png",
    location: "Favorite Spot",
    tag: "moment",
    featured: true,
  },
  {
    id: "mem-3",
    date: "2026-08-20",
    title: "Late Night Laughs",
    description: "Lost track of time talking about everything and nothing at all.",
    image: "/jpeg/IMG_0396.jpg",
    location: "Under the stars",
    tag: "date",
  },
  {
    id: "mem-4",
    date: "2026-07-15",
    title: "Summer Breeze Memories",
    description: "Warm weather, soft ice cream, and walking hand in hand.",
    image: "/jpeg/IMG_2717.jpg",
    location: "City Park",
    tag: "travel",
  },
  {
    id: "mem-5",
    date: "2026-06-10",
    title: "Spontaneous Roadtrip",
    description: "No plan, just great music and your hand resting in mine.",
    image: "/jpeg/IMG_2719.jpg",
    video: "/vids/IMG_2694.mov",
    location: "Coastline Highway",
    tag: "travel",
  },
  {
    id: "mem-6",
    date: "2026-05-04",
    title: "Candid Perfection",
    description: "Caught you laughing mid-sentence—my absolute favorite view.",
    image: "/jpeg/IMG_3414.jpg",
    location: "Favorite Café",
    tag: "moment",
  },
  {
    id: "mem-7",
    date: "2026-04-18",
    title: "Spring Blossoms",
    description: "Everything blooming around us, just like our bond.",
    image: "/jpeg/IMG_3996.jpg",
    location: "Botanical Gardens",
    tag: "special",
  },
  {
    id: "mem-8",
    date: "2026-03-22",
    title: "Coffee & Quiet Conversations",
    description: "Rain outside, cozy blanket inside, just the two of us.",
    image: "/jpeg/IMG_4019.jpg",
    video: "/vids/IMG_4010.MOV",
    location: "Cozy Nook",
    tag: "date",
  },
  {
    id: "mem-9",
    date: "2026-02-14",
    title: "Valentine's Magic",
    description: "Celebrating the sweetest connection I have ever known.",
    image: "/jpeg/IMG_4034.jpg",
    location: "Romantic Dinner",
    tag: "anniversary",
    featured: true,
  },
  {
    id: "mem-10",
    date: "2026-01-01",
    title: "New Year, Same Us",
    description: "Ringing in another year together with big dreams ahead.",
    image: "/jpeg/IMG_4599.jpg",
    location: "Downtown Lights",
    tag: "special",
  },
  {
    id: "mem-11",
    date: "2025-12-25",
    title: "Holiday Joy",
    description: "The best gift under the tree was having you by my side.",
    image: "/jpeg/IMG_4600.jpg",
    location: "By the fireplace",
    tag: "special",
  },
  {
    id: "mem-12",
    date: "2025-11-12",
    title: "Autumn Whispers",
    description: "Crisp air, sweater weather, and your warm embrace.",
    image: "/jpeg/IMG_5089.jpg",
    location: "Forest Walk",
    tag: "travel",
  },
  {
    id: "mem-13",
    date: "2025-10-05",
    title: "Golden Hour Sunset",
    description: "Watching the sky change colors with my favorite person.",
    image: "/jpeg/IMG_5091.jpg",
    video: "/vids/IMG_4033.mov",
    location: "Hilltop Lookout",
    tag: "moment",
  },
  {
    id: "mem-14",
    date: "2025-08-30",
    title: "Beach Day Magic",
    description: "Salt in the air, sand on our feet, and endless joy.",
    image: "/jpeg/IMG_5807.jpg",
    video: "/vids/IMG_5112.mov",
    location: "Ocean Shore",
    tag: "travel",
  },
  {
    id: "mem-15",
    date: "2025-07-04",
    title: "Fireworks in Your Eyes",
    description: "The night sky lit up, but I couldn't look away from you.",
    image: "/jpeg/IMG_5809.jpg",
    location: "Pier",
    tag: "date",
  },
  {
    id: "mem-16",
    date: "2025-05-19",
    title: "Unfiltered Smiles",
    description: "Pure, silly, unscripted happiness captured in a frame.",
    image: "/jpeg/IMG_5855.jpg",
    location: "Park Bench",
    tag: "moment",
  },
  {
    id: "mem-17",
    date: "2025-03-10",
    title: "Quiet Afternoon",
    description: "Reading next to each other in peaceful silence.",
    image: "/jpeg/IMG_6359.jpg",
    video: "/vids/IMG_6799.mov",
    location: "Library Corner",
    tag: "date",
  },
  {
    id: "mem-18",
    date: "2025-01-20",
    title: "Winter Wonderland",
    description: "Holding hands in the cold to stay warm.",
    image: "/jpeg/IMG_6395.jpg",
    location: "Snowy Trail",
    tag: "travel",
  },
  {
    id: "mem-19",
    date: "2024-11-15",
    title: "The Beginning of Us",
    description: "Where our journey started—a moment that changed everything forever.",
    image: "/jpeg/IMG_6397.jpg",
    video: "/vids/2BD50192-E677-4A62-8D7C-9755A9DD36AE.MP4",
    location: "First Meeting",
    tag: "anniversary",
    featured: true,
  },
  {
    id: "mem-20",
    date: "2024-10-01",
    title: "First Unforgettable Date",
    description: "Butterflies in my stomach and a feeling I would never forget.",
    image: "/jpeg/IMG_6432.jpg",
    video: "/vids/382632E6-5F17-451A-A86D-7CE79D619BDF.mov",
    location: "Corner Bistro",
    tag: "anniversary",
    featured: true,
  },
];

export const GALLERY_IMAGES = [
  { src: "/jpeg/hero1.png", aspect: "aspect-[3/4]", title: "Editorial Pose", caption: "Our signature moment" },
  { src: "/jpeg/hero2.png", aspect: "aspect-[4/5]", title: "Intimate Glance", caption: "Forever glowing" },
  { src: "/jpeg/IMG_0396.jpg", aspect: "aspect-[3/2]", title: "Evening Lights", caption: "Under the stars" },
  { src: "/jpeg/IMG_2717.jpg", aspect: "aspect-[4/3]", title: "Summer Stroll", caption: "Hand in hand" },
  { src: "/jpeg/IMG_3414.jpg", aspect: "aspect-[3/4]", title: "Café Laughter", caption: "Pure joy" },
  { src: "/jpeg/IMG_4019.jpg", aspect: "aspect-[1/1]", title: "Cozy Nook", caption: "Quiet warmth" },
  { src: "/jpeg/IMG_4034.jpg", aspect: "aspect-[3/4]", title: "Valentine Dinner", caption: "Celebrating our sweetest connection" },
  { src: "/jpeg/IMG_4599.jpg", aspect: "aspect-[4/3]", title: "New Year Together", caption: "Big dreams and brighter days" },
  { src: "/jpeg/IMG_4600.jpg", aspect: "aspect-[3/4]", title: "Holiday Warmth", caption: "The best gift was having you" },
  { src: "/jpeg/IMG_5807.jpg", aspect: "aspect-[16/9]", title: "Ocean Horizon", caption: "Endless waves" },
  { src: "/jpeg/IMG_5809.jpg", aspect: "aspect-[3/4]", title: "Twilight Glow", caption: "Unforgettable evening" },
  { src: "/jpeg/IMG_6359.jpg", aspect: "aspect-[4/5]", title: "Serene Moments", caption: "In our peaceful world" },
  { src: "/jpeg/IMG_6397.jpg", aspect: "aspect-[3/2]", title: "The Spark", caption: "Where it all began" },
  { src: "/jpeg/IMG_6432.jpg", aspect: "aspect-[4/3]", title: "First Sparkle", caption: "Unspoken magic" },
];

export const VIDEO_ITEMS = [
  {
    src: "/vids/IMG_2694.mov",
    title: "Coastline Highway",
    subtitle: "Wind in our hair, endless road ahead",
    date: "Summer Drive",
  },
  {
    src: "/vids/IMG_4010.MOV",
    title: "Rainy Afternoon",
    subtitle: "The sound of rain and cozy warmth",
    date: "Cozy Moments",
  },
  {
    src: "/vids/IMG_4033.mov",
    title: "Hilltop Sunset",
    subtitle: "Colors painting the sky above us",
    date: "Golden Sunset",
  },
  {
    src: "/vids/IMG_5112.mov",
    title: "Ocean Waves",
    subtitle: "Watching the tide roll in together",
    date: "Beach Day",
  },
  {
    src: "/vids/2BD50192-E677-4A62-8D7C-9755A9DD36AE.MP4",
    title: "First Chapters",
    subtitle: "The unforgettable early memories",
    date: "Our Beginning",
  },
];

export const LITTLE_THINGS = [
  { quote: "How your eyes crinkle whenever you laugh out loud", category: "Habit" },
  { quote: "Our secret hand squeeze that means 'I love you'", category: "Inside Joke" },
  { quote: "Late night ice cream runs in oversized hoodies", category: "Tradition" },
  { quote: "The way you always steal my hoodies and look 10x better in them", category: "Love Note" },
  { quote: "Our favourite coffee order: Iced Vanilla Latte + Extra Shot", category: "Daily Routine" },
  { quote: "Your voice being the sweetest sound I hear every morning", category: "Favorite Thing" },
];

export const THINGS_I_LOVE = [
  "Your smile that brightens up even the darkest room.",
  "The quiet kindness you show to everyone around you.",
  "How safe and completely at home I feel whenever I hold your hand.",
  "The way you listen with your whole heart.",
  "Your beautiful laughter that makes my soul dance.",
  "How we can sit in total silence and it feels like the richest conversation.",
  "The future we are building together, step by beautiful step.",
];
