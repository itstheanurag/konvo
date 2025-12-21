export type PlatformType =
  | "x"
  | "instagram"
  | "messages"
  | "reddit"
  | "hinge"
  | "whatsapp"
  | "discord"
  | "tumblr"
  | "peerlist"
  | "slack"
  | "telegram";

export interface Participant {
  id: string;
  name: string;
  username?: string;
  avatar?: string;
  isMe: boolean;
  color?: string; // For platforms like Discord or Slack
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: "text" | "image" | "video";
  attachmentUrl?: string;
  isRead?: boolean;
}

export interface PlatformConfig {
  id: PlatformType;
  name: string;
  bgColor: string;
  headerColor: string;
  bubbleColorRecipient: string;
  bubbleColorSender: string;
  textColorRecipient: string;
  textColorSender: string;
  fontFamily: string;
  showAvatars: boolean;
  showUsernames: boolean;
}

export const PLATFORMS: Record<PlatformType, PlatformConfig> = {
  messages: {
    id: "messages",
    name: "Messages",
    bgColor: "#ffffff",
    headerColor: "#f9f9f9",
    bubbleColorRecipient: "#e9e9eb",
    bubbleColorSender: "#007aff",
    textColorRecipient: "#000000",
    textColorSender: "#ffffff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    showAvatars: false,
    showUsernames: false,
  },
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp",
    bgColor: "#e5ddd5",
    headerColor: "#075e54",
    bubbleColorRecipient: "#ffffff",
    bubbleColorSender: "#dcf8c6",
    textColorRecipient: "#000000",
    textColorSender: "#000000",
    fontFamily: "Helvetica, Arial, sans-serif",
    showAvatars: false,
    showUsernames: false,
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    bgColor: "#ffffff",
    headerColor: "#ffffff",
    bubbleColorRecipient: "#efefef",
    bubbleColorSender: "#3797f0",
    textColorRecipient: "#000000",
    textColorSender: "#ffffff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    showAvatars: true,
    showUsernames: true,
  },
  x: {
    id: "x",
    name: "X (Twitter)",
    bgColor: "#000000",
    headerColor: "#000000",
    bubbleColorRecipient: "#2f3336",
    bubbleColorSender: "#1d9bf0",
    textColorRecipient: "#ffffff",
    textColorSender: "#ffffff",
    fontFamily:
      'TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    showAvatars: true,
    showUsernames: true,
  },
  reddit: {
    id: "reddit",
    name: "Reddit",
    bgColor: "#ffffff",
    headerColor: "#ffffff",
    bubbleColorRecipient: "#f6f7f8",
    bubbleColorSender: "#0079d3",
    textColorRecipient: "#1c1c1c",
    textColorSender: "#ffffff",
    fontFamily: '"IBMPlexSans", Arial, sans-serif',
    showAvatars: true,
    showUsernames: true,
  },
  hinge: {
    id: "hinge",
    name: "Hinge",
    bgColor: "#ffffff",
    headerColor: "#ffffff",
    bubbleColorRecipient: "#f3f3f3",
    bubbleColorSender: "#111111",
    textColorRecipient: "#111111",
    textColorSender: "#ffffff",
    fontFamily: "Georgia, serif",
    showAvatars: false,
    showUsernames: false,
  },
  discord: {
    id: "discord",
    name: "Discord",
    bgColor: "#313338",
    headerColor: "#313338",
    bubbleColorRecipient: "transparent",
    bubbleColorSender: "transparent",
    textColorRecipient: "#dbdee1",
    textColorSender: "#dbdee1",
    fontFamily:
      '"gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    showAvatars: true,
    showUsernames: true,
  },
  tumblr: {
    id: "tumblr",
    name: "Tumblr",
    bgColor: "#ffffff",
    headerColor: "#001935",
    bubbleColorRecipient: "#f2f2f2",
    bubbleColorSender: "#00b8ff",
    textColorRecipient: "#000000",
    textColorSender: "#ffffff",
    fontFamily: '"Favorit", "Helmet", "Freesans", sans-serif',
    showAvatars: true,
    showUsernames: true,
  },
  peerlist: {
    id: "peerlist",
    name: "Peerlist",
    bgColor: "#ffffff",
    headerColor: "#00aa45",
    bubbleColorRecipient: "#f3f4f6",
    bubbleColorSender: "#00aa45",
    textColorRecipient: "#1f2937",
    textColorSender: "#ffffff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    showAvatars: true,
    showUsernames: true,
  },
  slack: {
    id: "slack",
    name: "Slack",
    bgColor: "#ffffff",
    headerColor: "#ffffff",
    bubbleColorRecipient: "transparent",
    bubbleColorSender: "transparent",
    textColorRecipient: "#1d1c1d",
    textColorSender: "#1d1c1d",
    fontFamily:
      "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    showAvatars: true,
    showUsernames: true,
  },
  telegram: {
    id: "telegram",
    name: "Telegram",
    bgColor: "#7195ba", // Classic Telegram blue/gray background
    headerColor: "#517da2",
    bubbleColorRecipient: "#ffffff",
    bubbleColorSender: "#effdde",
    textColorRecipient: "#000000",
    textColorSender: "#000000",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    showAvatars: false,
    showUsernames: false,
  },
};

export interface PlatformLayoutProps {
  platform: PlatformType;
  config: PlatformConfig;
  participants: Participant[];
}

export interface PlatformMessageProps {
  message: Message;
  sender: Participant;
  isFirst: boolean;
  isLast: boolean;
  config: PlatformConfig;
}
