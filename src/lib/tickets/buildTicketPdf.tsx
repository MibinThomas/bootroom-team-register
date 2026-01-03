import { pdf } from "@react-pdf/renderer";
import type { TeamPayload } from "@/lib/tickets/types";
import { TicketDoc } from "@/lib/tickets/TicketDoc";
import { makeQrDataUrl } from "@/lib/tickets/qr";
import fs from "node:fs";
import path from "node:path";

function fileToDataUrl(absPath: string, mime: string) {
  const buf = fs.readFileSync(absPath);
  const b64 = buf.toString("base64");
  return `data:${mime};base64,${b64}`;
}

export async function buildTicketPdfBuffer(team: TeamPayload) {
  const qrValue = `bootroom:team:${team.teamNumber}`;
  const qrDataUrl = await makeQrDataUrl(qrValue);

  // Load images from /public
  const publicDir = path.join(process.cwd(), "public");
  const logoPath = path.join(publicDir, "bootroom-logo.png");
  const bannerPath = path.join(publicDir, "ticket-banner.png");

  const logoDataUrl = fs.existsSync(logoPath)
    ? fileToDataUrl(logoPath, "image/png")
    : null;

  const bannerDataUrl = fs.existsSync(bannerPath)
    ? fileToDataUrl(bannerPath, "image/png")
    : null;

  const blob = await pdf(
    <TicketDoc
      team={team}
      qrDataUrl={qrDataUrl}
      logoDataUrl={logoDataUrl ?? undefined}
      bannerDataUrl={bannerDataUrl ?? undefined}
    />
  ).toBlob();

  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
