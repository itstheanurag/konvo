'use client';

import React from 'react';
import { PlatformLayoutProps } from '@/lib/types';
import { WhatsAppHeader, WhatsAppFooter } from '@/components/platforms/whatsapp';
import { MessagesHeader, MessagesFooter } from '@/components/platforms/messages';
import { InstagramHeader, InstagramFooter } from '@/components/platforms/instagram';
import { DiscordHeader, DiscordFooter } from '@/components/platforms/discord';
import { XHeader } from '@/components/platforms/x';
import { TumblrHeader, TumblrFooter } from '@/components/platforms/tumbler';
import { PeerlistHeader, PeerlistFooter } from '@/components/platforms/peerlist';
import { HingeHeader, HingeFooter } from '@/components/platforms/hinge';
import { GenericHeader, GenericFooter } from '@/components/platforms/generic';

export const PlatformHeader: React.FC<PlatformLayoutProps> = (props) => {
  switch (props.platform) {
    case 'whatsapp':
      return <WhatsAppHeader {...props} />;
    case 'messages':
      return <MessagesHeader {...props} />;
    case 'instagram':
      return <InstagramHeader {...props} />;
    case 'x':
      return <XHeader {...props} />;
    case 'discord':
      return <DiscordHeader {...props} />;
    case 'tumblr':
      return <TumblrHeader {...props} />;
    case 'peerlist':
      return <PeerlistHeader {...props} />;
    case 'hinge':
      return <HingeHeader {...props} />;
    default:
      return <GenericHeader {...props} />;
  }
};

export const PlatformFooter: React.FC<PlatformLayoutProps> = (props) => {
  switch (props.platform) {
    case 'whatsapp':
      return <WhatsAppFooter {...props} />;
    case 'messages':
      return <MessagesFooter {...props} />;
    case 'instagram':
      return <InstagramFooter {...props} />;
    case 'discord':
      return <DiscordFooter {...props} />;
    case 'tumblr':
      return <TumblrFooter {...props} />;
    case 'peerlist':
      return <PeerlistFooter {...props} />;
    case 'hinge':
      return <HingeFooter {...props} />;
    case 'x':
      return <GenericFooter {...props} />;
    default:
      return <GenericFooter {...props} />;
  }
};
