import { Folders, Mail, Pause, Settings } from "lucide-react";

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
  { name: "Technology", description: "Latest tech news and innovations." },
  { name: "Business", description: "Business trends and Market updates." },
  { name: "Sports", description: "Sports news and highlights." },
  { name: "Entertainment", description: "Movies, TV, and celebrity news." },
  { name: "Science", description: "Scientific discoveries and research." },
  { name: "Health", description: "Health and wellness updates." },
  { name: "Politics", description: "Political news and current events." },
  { name: "Environment", description: "Climate and environmental news." },
];
