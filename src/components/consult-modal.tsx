// src/components/consult-modal.tsx
"use client";

import * as React from "react";
import { api, ga } from "@/lib/api.mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export function ConsultModal({ triggerClass = "" }: { triggerClass?: string }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    reason: "",
    preferredTime: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) {
      toast({ title: "Email required", variant: "destructive" });
      return;
    }
    try {
      setLoading(true);
      await api.createConsult(form);
      ga.track("consult_request", { src: "consult-modal" });
      toast({ title: "Request sent!", description: "We'll get back shortly." });
      setForm({ name: "", email: "", reason: "", preferredTime: "" });
      setOpen(false);
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClass} variant="secondary">
          Schedule a consult
        </Button>
      </DialogTrigger>
      <DialogContent id="schedule-consult">
        <DialogHeader>
          <DialogTitle>Schedule a consult</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-3">
          <Input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            type="email"
            required
            placeholder="Email*"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Preferred time (e.g. Tue 18:00 CET)"
            value={form.preferredTime}
            onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
          />
          <Textarea
            placeholder="Reason / goals"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Sending…" : "Send request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}