import { Folders, Home, Mail, Pause, Settings, Sliders } from "lucide-react";

export const listItems = [
  {
    id: 1,
    content:
      "Your newsletter is automatically generated based on your selected categories.",
    icon: <Folders className="text-primary size-7 md:size-9" />,
  },
  {
    id: 2,
    content:
      "Newsletters are delivered to your email at 9 AM according to chosen frequency.",
    icon: <Mail className="text-primary size-7 md:size-9" />,
  },
  {
    id: 3,
    content: "You can pause or resume your newsletter at any time.",
    icon: <Pause className="text-primary size-7 md:size-9" />,
  },
  {
    id: 4,
    content:
      "Update your preferenced anytime to change categories or frequency.",
    icon: <Settings className="text-primary size-7 md:size-9" />,
  },
];

export const categoriesChecks = [
  {
    id: "technology",
    name: "Technology",
    description: "Latest tech news and innovations.",
  },
  {
    id: "business",
    name: "Business",
    description: "Business trends and Market updates.",
  },
  { id: "sports", name: "Sports", description: "Sports news and highlights." },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, TV, and celebrity news.",
  },
  {
    id: "science",
    name: "Science",
    description: "Scientific discoveries and research.",
  },
  { id: "health", name: "Health", description: "Health and wellness updates." },
  {
    id: "politics",
    name: "Politics",
    description: "Political news and current events.",
  },
  {
    id: "environment",
    name: "Environment",
    description: "Climate and environmental news.",
  },
];

export const frequencyOptions = [
  {
    id: "daily",
    name: "Daily",
    description: "Every day.",
  },
  {
    id: "weekly",
    name: "Weekly",
    description: "Once a week.",
  },
  {
    id: "biweekly",
    name: "Semi-weekly",
    description: "Twice a week.",
  },
];

export const navLinks = [
  {
    href: "/dashboard",
    icon: (
      <Home className="hover:text-primary/50 cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-0.5" />
    ),
  },
  {
    href: "/preferences",
    icon: (
      <Sliders className="hover:text-primary/25 cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-0.5" />
    ),
  },
];
