# HPTANA screenshots

Exported Power BI page images. The case study references these filenames
directly — dropping a file in here is all that is needed.

| File | Page | Status |
| --- | --- | --- |
| `overview.png` | Overview | ⬜ not yet supplied |
| `sales.png` | Sales | ⬜ not yet supplied |
| `production.png` | Production | ⬜ not yet supplied |
| `inventory.png` | Inventory | ⬜ not yet supplied |

Until a file is present, `Figure` renders a labelled placeholder rather than a
broken image.

## Notes

- Unlike the other case studies, no `width`/`height` are set on these
  `Figure` calls (real dimensions weren't available yet). Once you add the
  screenshots, pass their intrinsic pixel size in
  `src/content/hptana/index.jsx` so the frame matches each image's own aspect
  ratio instead of the generic 16:9 fallback.
- The repository link in `src/content/hptana/index.jsx` is a placeholder
  (`https://github.com/`) — replace it with the real HPTANA repository URL
  before publishing.
