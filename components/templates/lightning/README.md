# Lightning Portfolio Template

A standalone Gothic / storm-light portfolio template built from the existing template data contract.

## Data contract
The entry component accepts `{ data }` and uses the existing fields without changing the database schema:
- profile: `name`, `role`, `description`, `about`, `image`, `cv`, `email`, `city`, `country`
- `stats[]`
- `skills[]`: `id`, `name`, `level`, `category`
- `projects[]`: `id`, `title`, `description`, `cover_image`, `github_url`, `live_url`
- `certificates[]`: `id`, `title`, `organization`, `image_url`, `issue_date`, `credential_url`
- `social[]`: `id`, `platform`, `url`

## Integration
Use `index.tsx` as the template entry point in the same place the existing templates are loaded. The visual layer is isolated in `LightningTemplate.tsx` and `lightning.css`.

The supplied storm-cloud image is included at `assets/storm-clouds.png`.
