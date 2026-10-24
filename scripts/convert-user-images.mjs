import sharp from "sharp";
import path from "path";
import fs from "fs";

const mappings = [
  { src: "assets/Homepage and brand imagery.png", dest: "public/images/hero-living-room.webp" },
  { src: "assets/Why AquaShine.png", dest: "public/images/why-aquashine.webp" },
  { src: "assets/watertankclean.png", dest: "public/images/water-tank.webp" },
  { src: "assets/Bathroom Glassbefore.png", dest: "public/images/demo-bathroom-before.webp" },
  { src: "assets/Bathroom Glassafter.png", dest: "public/images/demo-bathroom-after.webp" },
  { src: "assets/sofa before.png", dest: "public/images/demo-sofa-before.webp" },
  { src: "assets/sofa after.png", dest: "public/images/demo-sofa-after.webp" },
  { src: "assets/Kitchenbefore.png", dest: "public/images/demo-kitchen-before.webp" },
  { src: "assets/Kitchenafter.png", dest: "public/images/demo-kitchen-after.webp" },
];

async function run() {
  for (const { src, dest } of mappings) {
    if (fs.existsSync(src)) {
      console.log(`Converting ${src} -> ${dest}`);
      await sharp(src)
        .webp({ quality: 88, effort: 4 })
        .toFile(dest);
      console.log(`✓ Saved ${dest}`);
    } else {
      console.warn(`File not found: ${src}`);
    }
  }
}

run().catch(console.error);

