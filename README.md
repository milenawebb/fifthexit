# fifthexit

Marketing and portfolio site for **fifthexit**, a web and app development studio and a DBA of Webb Consulting LLC.

Live at **[fifthexit.com](https://fifthexit.com)**

## What it does

The site is the studio's front door. It has to do three jobs without a sales call:

- **Show the work.** A filterable portfolio of shipped projects, split by websites, web apps, e-commerce and our own products. Every project links to the live site, because a screenshot proves nothing.
- **Set expectations on cost.** An interactive estimator that gives a visitor a real range before they talk to anyone, so the first conversation is about the project rather than the budget.
- **Book the call.** A direct booking flow instead of a contact form that disappears into an inbox.

## Notable pieces

**Project estimator.** Takes project type, scope and feature selections and returns a price range. The hard part was not the arithmetic, it was deciding how much to reveal. Too vague and it is useless, too precise and it becomes a quote the studio is held to.

**Portfolio filtering.** Client-side filtering across project categories with the URL kept in sync, so a filtered view can be linked and shared.

[FILL IN: one more piece worth calling out, for example the AI page, the dark theme system, or the performance work]

## Stack

- React + TypeScript
- Tailwind CSS
- Vite
- Supabase (Postgres) for [FILL IN: what is actually stored, for example booking submissions and estimator leads]
- Deployed on Cloudflare

## Development

```bash
git clone https://github.com/milenawebb/fifthexit.git
cd fifthexit
npm install
npm run dev
```

## Notes

Built with AI-native tooling, primarily Lovable, with the architecture, data model and product decisions made by hand. The tools write code faster; they do not decide what the product should be.

---

Built and maintained by [Milena Webb](https://milenawebb.com). fifthexit is a DBA of [Webb Consulting LLC](https://webb-consulting.net).
