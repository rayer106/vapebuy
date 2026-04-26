import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Locale } from "@/lib/app";

const DIR = path.join(process.cwd(), "src/content/products");

export function getProduct(slug: string, locale: Locale) {
  const file = fs.readFileSync(
    path.join(DIR, `${slug}.md`),
    "utf-8"
  );

  const { data } = matter(file);

  return {
    slug: data.slug,
    price: data.price,
    image: data.image,
    title: data.title?.[locale],
    desc: data.desc?.[locale]
  };
}