# HPTANA screenshots

Exported Power BI page images. The case study references these filenames
directly — dropping a file in here is all that is needed.

| File | Page | Status |
| --- | --- | --- |
| `overview.png` | Overview | ✅ supplied (1834×964) |
| `sales.png` | Sales | ✅ supplied (1758×975) |
| `production.png` | Production | ✅ supplied (1804×982) |
| `inventory.png` | Inventory | ✅ supplied (1774×978) |

If a file is ever removed, `Figure` falls back to a labelled placeholder
rather than a broken image.

## Notes

- Real intrinsic pixel dimensions are set in `src/content/hptana/copy.js`
  (the `pages` array) and passed through `src/content/hptana/index.jsx` to
  each `DashboardPage`, so every frame matches its own image's aspect ratio
  instead of the generic 16:9 fallback.
- The repository CTA is hidden for now (`meta.links` is `[]` in
  `src/content/hptana/index.jsx`) since no real HPTANA repository URL exists
  yet. Add one to `meta.links` once the repo is public.
