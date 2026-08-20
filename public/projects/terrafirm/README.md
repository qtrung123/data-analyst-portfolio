# TerraFirm report screenshots

Exported Power BI page images. The case study references these filenames
directly — dropping a file in here is all that is needed.

| File | Page | Status |
| --- | --- | --- |
| `page1.png` | Are we getting safer? | ✅ supplied |
| `page2.png` | Are sites doing the preventive work? | ✅ supplied |
| `page3.png` | What are we seeing in the field? | ✅ supplied |
| `page4.png` | What actually happened? | ✅ supplied |
| `page5.png` | Are people ready for the work? | ✅ supplied |
| `page6.png` | Why is this site different? | ✅ supplied |
| `semantic-model.png` | Model relationship diagram | ⬜ not yet supplied |

`page1.png` doubles as the project card cover art on the homepage and the
projects index.

## Notes

- Each image's intrinsic width/height is passed to `Figure` in
  `src/content/terrafirm/index.jsx`, so the frame matches the screenshot's own
  aspect ratio, nothing is cropped, and the space is reserved before the image
  loads. **If you replace a screenshot at a different size, update the
  `width`/`height` props alongside it.**
- Until a file is present, `Figure` renders a labelled placeholder rather than a
  broken image, and it is not click-to-enlarge.
- Current exports are ~1700px wide, which is comfortably above the largest
  rendered size (~816px) so they stay sharp on high-density displays.
