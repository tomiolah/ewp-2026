import { $ } from "bun";
import { mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

const PRO_URL = "http://localhost:1025"; // Replace with your ProPresenter Network port
const PLAYLIST_NAME = "ewp-2026"; // Exact playlist name in ProPresenter
const DISPLAY_ID = "2"; // Secondary monitor ID (1 = main MacBook screen, 2 = secondary display)
const OUT_DIR = "./stage-exports";

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${PRO_URL}${path}`);
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}

await mkdir(OUT_DIR, { recursive: true });

// 1. Find the playlist UUID
const playlists = await api<Array<{ id: { uuid: string; name: string } }>>("/v1/playlists");
const target = playlists.find((p) => p.id.name === PLAYLIST_NAME);
if (!target) throw new Error(`Playlist "${PLAYLIST_NAME}" not found`);

// 2. Fetch all items in the playlist
const playlistData = await api<{ items: Array<{ id: { uuid: string; name: string }; type: string }> }>(
  `/v1/playlist/${target.id.uuid}`
);

for (let itemIdx = 0; itemIdx < playlistData.items.length; itemIdx++) {
  const item = playlistData.items[itemIdx];
  if (!item) continue;
  if (item.type !== "presentation") continue;

  // Trigger the song in the playlist so it becomes the active presentation
  await api(`/v1/playlist/${target.id.uuid}/${itemIdx}/trigger`);
  await Bun.sleep(400);

  // Get exact slide count from the active presentation
  const active = await api<{ presentation: { groups: Array<{ slides: unknown[] }> } }>(
    "/v1/presentation/active"
  );
  const totalSlides = active.presentation.groups.reduce((sum, g) => sum + g.slides.length, 0);

  const safeName = `${String(itemIdx + 1).padStart(2, "0")} - ${item.id.name.replace(/[/\\?%*:|"<>]/g, "-")}`;
  const songImgDir = join(OUT_DIR, safeName);
  await mkdir(songImgDir, { recursive: true });

  console.log(`Exporting "${item.id.name}" (${totalSlides} slides)...`);

  // 3. Trigger each slide index and capture the secondary display directly
  for (let slideIdx = 0; slideIdx < totalSlides; slideIdx++) {
    await api(`/v1/presentation/active/${slideIdx}/trigger`);
    await Bun.sleep(350); // Wait for dynamic text scaling & transition to settle

    const imgPath = join(songImgDir, `slide_${String(slideIdx + 1).padStart(3, "0")}.png`);
    await $`screencapture -x -D ${DISPLAY_ID} ${imgPath}`;
  }

  // 4. Bundle the captured PNGs for this song into 1 PDF
  const pngs = (await readdir(songImgDir))
    .filter((f) => f.endsWith(".png"))
    .sort()
    .map((f) => join(songImgDir, f));

  if (pngs.length > 0) {
    const pdfPath = join(OUT_DIR, `${safeName}.pdf`);
    await $`img2pdf ${pngs} -o ${pdfPath}`;
    console.log(`Saved ${pdfPath}`);
  }
}