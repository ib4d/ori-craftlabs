// src/components/footer.tsx
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api, ga } from "@/lib/api.mock";

function NewsletterForm() {
  const { toast } = useToast();
  async function onSubmit(formData: FormData) {
    const email = String(formData.get("email") || "").trim();
    if (!email) return;
    await api.subscribe(email, ["global"]);
    ga.track("newsletter_join", { page: "footer" });
    toast({ title: "Subscribed!", description: "Thanks for joining ORI." });
  }
  return (
    <form action={onSubmit} className="flex w-full max-w-sm gap-2">
      <Input name="email" type="email" required placeholder="Enter your email" />
      <Button type="submit">Join</Button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-[#861388]">ORI Craft Labs</h3>
            <p className="text-sm text-gray-600 mt-2">
              Fusing Cuban and Polish cultures for holistic wellness.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/wellness" className="text-gray-600 hover:text-[#861388]">Wellness</Link></li>
              <li><Link href="/culture" className="text-gray-600 hover:text-[#861388]">Culture</Link></li>
              <li><Link href="/food" className="text-gray-600 hover:text-[#861388]">Food</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[#861388]">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#861388]">TikTok</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#861388]">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">Stay updated with tips and events.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          © 2025 ORI Craft Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}