import { getProduct } from "@/lib/content/product";
import { ProductParams } from "@/types/route";
import fs from "fs";
import path from "path";
import { APP } from "@/lib/app";

type Props = {
  params: ProductParams;
};

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug, params.locale);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.desc}</p>
      <span>{product.price}</span>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const product = getProduct(params.slug, params.locale);

  return {
    title: product.title,
    description: product.desc
  };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/content/products");

  const files = fs.readdirSync(dir);

  const slugs = files.map((f) =>
    f.replace(".md", "")
  );

  return slugs.flatMap((slug) =>
    APP.locales.map((locale) => ({
      slug,
      locale
    }))
  );
}