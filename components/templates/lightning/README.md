# Gothic Portfolio Template

A clean gothic portfolio template inspired by the supplied visual reference.

## Design direction

- Near-black storm-cloud background.
- White / icy-blue typography and thin glowing borders.
- Large centered gothic name and role.
- Compact profile panel with a small skills preview.
- Portrait-focused right side.
- Horizontal project archive on desktop.
- Compact certificate list and contact footer.
- Responsive mobile navigation.
- Minimal decoration so the content and data stay visually dominant.

## Data contract

The template keeps the existing data fields used by the portfolio system:

- `data.name`
- `data.role`
- `data.description`
- `data.about`
- `data.image`
- `data.cv`
- `data.city`
- `data.country`
- `data.stats`
- `data.skills`: `id`, `name`, `level`, `category`
- `data.projects`: `id`, `title`, `description`, `cover_image`, `github_url`, `live_url`
- `data.certificates`: `id`, `title`, `organization`, `image_url`, `issue_date`, `credential_url`
- `data.social`: `id`, `platform`, `url`

No Supabase queries or portfolio data structures are introduced here.

## Files

- `index.tsx` — template composition only.
- `Navbar.tsx` — responsive navigation.
- `Hero.tsx` — compact reference-style hero.
- `About.tsx` — profile section.
- `Skills.tsx` — skills and levels.
- `Projects.tsx` — horizontal project archive.
- `Certificates.tsx` — credentials list.
- `Contact.tsx` — email and social links.
- `Background.tsx` — shared storm-cloud background.
- `gothic.module.css` — all template styling in one organized CSS module.
- `fonts.ts` — gothic title fonts.

## Background image

Place the background image at:

`public/assets/clouds-bg.png`

`Background.tsx` references it as:

`/assets/clouds-bg.png`

The image is intentionally darkened in CSS so portfolio content remains readable.

## Dependencies

The design uses the dependencies already present in the project:

- `next`
- `next/font/google`
- `lucide-react`
- `gsap`
- `@gsap/react`

No new dependency is required.
