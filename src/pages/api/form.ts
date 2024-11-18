import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  body: z.string().max(500).min(10),
});

import { NextApiRequest, NextApiResponse } from "next";
import { DISCORD_WEBHOOK } from "@/utils/constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = schema.parse(req.body);

  const result = await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: "new email innit",
      embeds: [
        {
          description: body.body,
          author: {
            name: body.email,
          },
          fields: [
            {
              name: "ip",
              value:
                req.headers["x-forwarded-for"] ??
                req.socket.remoteAddress ??
                "unknown!?",
            },
          ],
        },
      ],
    }),
  });

  if (result.status >= 400) {
    throw new Error("Error sending notification");
  }

  if (req.headers["content-type"] === "application/json") {
    res.status(200).json({ sent: true });
    return;
  }

  res.redirect(302, "/thanks");
}
