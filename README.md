# Favourite Student List

React + React Router + useContext + Tailwind CSS project.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Flow

1. **Login page** (`/`) — validates email format and password strength with
   regex (`AuthContext`). Any input matching the rules logs you in (demo only,
   no real backend).
2. **Home page** (`/home`) — navbar, hero header, a `<video>` demo, and info
   cards. Toggle the **Sunset / Ocean** gradient theme from the navbar
   (`ThemeContext`).
3. **Student List** (`/students`) — fetches 100 students from
   `https://dummyjson.com/users?limit=100` with `async/await`, sorted A–Z by
   name. Each card shows ID, a derived class/section, and extra info
   (university/company). "Add to Favourite" pushes the student into the
   global `StudentContext`, guarding against duplicates.
4. **Favourites** (`/favourites`) — reads the same `StudentContext`. Shows
   "No favourite students added yet" when empty, otherwise lists each
   favourite with a Remove button. The navbar badge shows the live count.

## Notes

- The public API has no "class/section" field, so it's derived from each
  student's `id` for demo purposes — swap in your real data source as needed.
- Swap the `<video>` `<source>` URLs in `HomePage.jsx` for your own clip.
- All routing uses React Router's `<Link>`/`<Routes>` — no full page reloads.
