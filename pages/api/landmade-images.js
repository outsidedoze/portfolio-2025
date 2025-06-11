import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dir = path.join(process.cwd(), 'public/images/creative/landmade');
  const files = fs.readdirSync(dir)
    .filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
  res.status(200).json(files);
} 