import { redirect } from "next/navigation";

export default function Home() {
  redirect("/products");
  return null;
}
