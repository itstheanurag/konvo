"use client";

import React from "react";
import { PlatformLayoutProps, PlatformMessageProps } from "@/lib/types";
import {
  SlackHeader,
  SlackFooter,
  SlackMessage,
} from "@/components/platforms/slack";
import {
  TelegramHeader,
  TelegramFooter,
} from "@/components/platforms/telegram/telegram";
import { TelegramMessage } from "@/components/platforms/telegram/messages";
import {
  WhatsAppHeader,
  WhatsAppFooter,
} from "@/components/platforms/whatsapp/whatsapp";
import { WhatsAppMessage } from "@/components/platforms/whatsapp/messages";
import {
  MessagesHeader,
  MessagesFooter,
  MessagesMessage,
} from "@/components/platforms/messages";
import {
  InstagramHeader,
  InstagramFooter,
} from "@/components/platforms/instagram/instagram";
import { InstagramMessage } from "@/components/platforms/instagram/messages";
import {
  DiscordHeader,
  DiscordFooter,
  DiscordMessage,
} from "@/components/platforms/discord";
import { XHeader } from "@/components/platforms/x/x";
import { XMessage } from "@/components/platforms/x/messages";
import {
  TumblrHeader,
  TumblrFooter,
  TumblrMessage,
} from "@/components/platforms/tumbler";
import {
  PeerlistHeader,
  PeerlistFooter,
} from "@/components/platforms/peerlist/peerlist";
import { PeerlistMessage } from "@/components/platforms/peerlist/messages";
import {
  HingeHeader,
  HingeFooter,
  HingeMessage,
} from "@/components/platforms/hinge";
import {
  RedditHeader,
  RedditFooter,
} from "@/components/platforms/reddit/reddit";
import { RedditMessage } from "@/components/platforms/reddit/messages";
import {
  GenericHeader,
  GenericFooter,
  GenericMessage,
} from "@/components/platforms/generic";

export const PlatformHeader: React.FC<PlatformLayoutProps> = (props) => {
  switch (props.platform) {
    case "whatsapp":
      return <WhatsAppHeader {...props} />;
    case "messages":
      return <MessagesHeader {...props} />;
    case "instagram":
      return <InstagramHeader {...props} />;
    case "x":
      return <XHeader {...props} />;
    case "discord":
      return <DiscordHeader {...props} />;
    case "tumblr":
      return <TumblrHeader {...props} />;
    case "peerlist":
      return <PeerlistHeader {...props} />;
    case "hinge":
      return <HingeHeader {...props} />;
    case "slack":
      return <SlackHeader {...props} />;
    case "telegram":
      return <TelegramHeader {...props} />;
    case "reddit":
      return <RedditHeader {...props} />;
    default:
      return <GenericHeader {...props} />;
  }
};

export const PlatformFooter: React.FC<PlatformLayoutProps> = (props) => {
  switch (props.platform) {
    case "whatsapp":
      return <WhatsAppFooter {...props} />;
    case "messages":
      return <MessagesFooter {...props} />;
    case "instagram":
      return <InstagramFooter {...props} />;
    case "discord":
      return <DiscordFooter {...props} />;
    case "tumblr":
      return <TumblrFooter {...props} />;
    case "peerlist":
      return <PeerlistFooter {...props} />;
    case "hinge":
      return <HingeFooter {...props} />;
    case "slack":
      return <SlackFooter {...props} />;
    case "telegram":
      return <TelegramFooter {...props} />;

    case "reddit":
      return <RedditFooter {...props} />;
    default:
      return <GenericFooter {...props} />;
  }
};

export const PlatformMessage: React.FC<
  PlatformMessageProps & { platform: string }
> = (props) => {
  switch (props.platform) {
    case "whatsapp":
      return <WhatsAppMessage {...props} />;
    case "slack":
      return <SlackMessage {...props} />;
    case "telegram":
      return <TelegramMessage {...props} />;
    case "messages":
      return <MessagesMessage {...props} />;
    case "instagram":
      return <InstagramMessage {...props} />;
    case "discord":
      return <DiscordMessage {...props} />;
    case "x":
      return <XMessage {...props} />;
    case "tumblr":
      return <TumblrMessage {...props} />;
    case "peerlist":
      return <PeerlistMessage {...props} />;
    case "hinge":
      return <HingeMessage {...props} />;
    case "reddit":
      return <RedditMessage {...props} />;
    default:
      return <GenericMessage {...props} />;
  }
};
