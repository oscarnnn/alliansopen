/**
 * Banguider för 2026. Scorekort (par, index, yards per tee) från GolfPass.
 * Längder visas i meter (1 yd = 0,9144 m).
 *
 * Egna hålbilder (t.ex. skärmdumpar från simulatorn) kan läggas i
 * src/assets/courses/<slug>/<hål>.jpg – då visas de i guiden och går att förstora.
 */

export interface Hole {
  hole: number;
  par: number;
  index: number;
  /** Yards per tee, i samma ordning som Course.tees */
  yards: number[];
  tip?: string;
}

export interface Course {
  slug: "pebble" | "sawgrass";
  name: string;
  short: string;
  round: string;
  tees: string[];
  holes: Hole[];
}

export const toMeters = (yd: number) => Math.round(yd * 0.9144);

const imageModules = import.meta.glob<string>("../assets/courses/*/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

/** Hålbilder per bana: slug → hål → bild-URL */
export function holeImages(slug: Course["slug"]): Record<number, string> {
  const out: Record<number, string> = {};
  for (const [path, src] of Object.entries(imageModules)) {
    const m = path.match(/courses\/([^/]+)\/\D*(\d+)\.\w+$/);
    if (m && m[1] === slug) out[Number(m[2])] = src;
  }
  return out;
}

export const pebble: Course = {
  slug: "pebble",
  name: "Pebble Beach Golf Links",
  short: "Pebble Beach",
  round: "Scramble · hål 10–18",
  tees: ["Blå", "Vit"],
  holes: [
    { hole: 10, par: 4, index: 3, yards: [444, 408], tip: "Klippan och Stilla havet längs hela högersidan, fairway lutar mot vattnet. Sikta vänster om mitten." },
    { hole: 11, par: 4, index: 9, yards: [370, 338], tip: "Bort från havet och uppför. Liten green som lutar bakifrån – lämna bollen under hålet." },
    { hole: 12, par: 3, index: 17, yards: [202, 176], tip: "Bred men grund green med bunker framför. Rätt längd på klubban är allt." },
    { hole: 13, par: 4, index: 7, yards: [401, 370], tip: "Fairwaybunker vänster i landningszonen. Greenen lutar kraftigt – putta försiktigt nedför." },
    { hole: 14, par: 5, index: 1, yards: [559, 490], tip: "Banans svåraste. Lång dogleg höger mot en upphöjd green med djup bunker framför. Kort inspel rullar tillbaka." },
    { hole: 15, par: 4, index: 13, yards: [393, 338], tip: "Ett av de snällare hålen på slingan. Rakt fram – ta chansen här." },
    { hole: 16, par: 4, index: 11, yards: [400, 368], tip: "En ravin korsar fairway – välj klubba från tee så att du ligger kort om den." },
    { hole: 17, par: 3, index: 15, yards: [182, 166], tip: "Klassikern vid havet. Timglasformad green – fel halva ger en lång putt. Watsons chip 1982." },
    { hole: 18, par: 5, index: 5, yards: [541, 506], tip: "Havet hela vägen till vänster, out of bounds till höger. Världens mest kända avslutning." },
  ],
};

export const sawgrass: Course = {
  slug: "sawgrass",
  name: "TPC Sawgrass · Stadium Course",
  short: "TPC Sawgrass",
  round: "Finalen · 18 hål",
  tees: ["Blå", "Vit"],
  holes: [
    { hole: 1, par: 4, index: 11, yards: [394, 360], tip: "Mjuk start. Fairway först, mitten av green sen." },
    { hole: 2, par: 5, index: 15, yards: [507, 469], tip: "Kort par 5 – ett av banans bästa birdielägen, men greenen är smal och väl bevakad." },
    { hole: 3, par: 3, index: 17, yards: [160, 134], tip: "Kort par 3 till upphöjd green. Rätt längd, inte rätt flagga." },
    { hole: 4, par: 4, index: 9, yards: [359, 324] },
    { hole: 5, par: 4, index: 3, yards: [446, 422] },
    { hole: 6, par: 4, index: 13, yards: [360, 333] },
    { hole: 7, par: 4, index: 1, yards: [407, 382], tip: "Banans svåraste hål. En bogey här är ingen katastrof." },
    { hole: 8, par: 3, index: 7, yards: [195, 168], tip: "Längsta par 3:an. Ta en klubba extra." },
    { hole: 9, par: 5, index: 5, yards: [546, 522], tip: "Banans längsta hål. Tre raka slag slår ett hjältemodigt." },
    { hole: 10, par: 4, index: 12, yards: [392, 351] },
    { hole: 11, par: 5, index: 8, yards: [519, 469], tip: "Vatten till vänster vid greenen. Lägg upp om du är tveksam." },
    { hole: 12, par: 4, index: 16, yards: [332, 296], tip: "Kort par 4 med vatten vänster om greenen. Frestande att gå på green – men det ligger vatten där." },
    { hole: 13, par: 3, index: 18, yards: [156, 141], tip: "Banans lättaste på papperet – men vattnet ligger längs vänsterkanten." },
    { hole: 14, par: 4, index: 4, yards: [436, 377] },
    { hole: 15, par: 4, index: 6, yards: [421, 366] },
    { hole: 16, par: 5, index: 10, yards: [486, 470], tip: "Nåbar par 5 med vatten längs högersidan vid greenen. Starten på den berömda avslutningen." },
    { hole: 17, par: 3, index: 14, yards: [128, 115], tip: "Ön. Kortaste hålet på banan och det enda som spelar roll. Bollar i vattnet: räknas." },
    { hole: 18, par: 4, index: 2, yards: [426, 387], tip: "Vatten hela vägen till vänster. Sikta höger och håll nerverna i schack – pokalen väntar." },
  ],
};

export const courses2026: Course[] = [pebble, sawgrass];
