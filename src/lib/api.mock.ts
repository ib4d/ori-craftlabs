// src/lib/api.mock.ts
type Ok = { ok: true };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const demoDates = {
  dance: ["Thu 19:00", "Sat 10:30"],
  kids: ["Sat 11:00", "Sat 13:00"],
  tasting: ["Fri 18:30", "Sun 17:00"],
};

const db = {
  consults: [] as any[],
  rsvps: [] as any[],
  waitlist: [] as any[],
  newsletter: [] as any[],
  office: [] as any[],
};

export const api = {
  async subscribe(email: string, groups: string[] = []): Promise<Ok> {
    await sleep(400);
    db.newsletter.push({ email: email.toLowerCase(), groups, at: Date.now() });
    return { ok: true };
  },

  async createConsult(payload: {
    name?: string;
    email: string;
    reason?: string;
    preferredTime?: string;
  }): Promise<Ok> {
    await sleep(500);
    db.consults.push({ id: crypto.randomUUID(), ...payload, at: Date.now() });
    return { ok: true };
  },

  async rsvpDance(payload: {
    name: string;
    email: string;
    experience?: string;
    date?: string;
    notes?: string;
  }): Promise<Ok> {
    await sleep(450);
    db.rsvps.push({ type: "dance", ...payload, at: Date.now() });
    return { ok: true };
  },

  async spanishMini(payload: {
    email: string;
    level?: string;
    interest?: string;
  }): Promise<Ok> {
    await sleep(350);
    db.rsvps.push({ type: "spanish-mini", ...payload, at: Date.now() });
    return { ok: true };
  },

  async kidsRsvp(payload: {
    parentName: string;
    email: string;
    childAge: string;
    date?: string;
    notes?: string;
  }): Promise<Ok> {
    await sleep(450);
    db.rsvps.push({ type: "kids", ...payload, at: Date.now() });
    return { ok: true };
  },

  async foodWaitlist(payload: {
    name: string;
    email: string;
    area?: string;
    diet?: string;
    allergens?: string;
    spice?: string;
    attend?: string;
    notes?: string;
  }): Promise<Ok> {
    await sleep(500);
    db.waitlist.push({ ...payload, at: Date.now() });
    return { ok: true };
  },

  async officeTasting(payload: {
    name: string;
    email: string;
    company?: string;
    message?: string;
  }): Promise<Ok> {
    await sleep(500);
    db.office.push({ ...payload, at: Date.now() });
    return { ok: true };
  },
};

// tiny analytics stub (swap to GA4 later)
export const ga = {
  track: (event: string, payload?: Record<string, any>) =>
    console.log(`[ga] ${event}`, payload ?? {}),
};