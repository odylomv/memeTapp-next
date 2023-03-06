import { env } from '@mtp/env.mjs';
import { prisma } from '@mtp/server/db';
import { type IncomingHttpHeaders } from 'http';
import { buffer } from 'micro';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { Webhook, type WebhookRequiredHeaders } from 'svix';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Update the prisma backend when Clerk sends updated User data
export default async function handler(req: NextApiRequestWithSvixRequiredHeaders, res: NextApiResponse) {
  // Verify the webhook signature
  // See https://docs.svix.com/receiving/verifying-payloads/how
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payload, headers) as Event;
  } catch (_) {
    return res.status(400).json({});
  }

  // Handle the webhook
  const eventType: EventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, profile_image_url, email_addresses } = evt.data as UserUpsertEventData;
    const email = email_addresses[0]?.email_address;
    const emailVerified = email_addresses[0]?.verification.status === 'verified';

    await prisma.user.upsert({
      where: { id: id },
      create: {
        id: id,
        email,
        emailVerified,
        image: profile_image_url,
      },
      update: {
        email,
        emailVerified,
      },
    });
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data as UserDeleteEventData;

    await prisma.user.delete({ where: { id } });
  }

  res.json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

type Event = {
  data: UserUpsertEventData | UserDeleteEventData;
  object: 'event';
  type: EventType;
};

type UserUpsertEventData = {
  id: string;
  profile_image_url: string;
  email_addresses: {
    email_address: string;
    verification: {
      status: string;
    };
  }[];
};

type UserDeleteEventData = {
  id: string;
};

type EventType = 'user.created' | 'user.updated' | 'user.deleted' | '*';
