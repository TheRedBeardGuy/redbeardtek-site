# RedBeardTek Website Runbook (GitLab Pages)

This repo powers **redbeardtek.com** via **GitLab Pages**. Use these steps to update, preview, deploy, and troubleshoot—copy/paste friendly.

---

## Repo layout (top-level)
- `index.html` – Home
- `assets/` – CSS, images (`assets/styles.css`, `assets/img/...`)
- `services/` – service pages
- `blog/` – each post in its own folder with an `index.html`
- `.gitlab-ci.yml` – Pages pipeline (auto-publishes)

---

## Update the homepage
1) Put images here:
   - Logo → `assets/img/logo.png`
   - Hero → `assets/img/hero.jpg` (1920×1080 JPG)
2) Edit copy in `index.html` (or ask assistant for a paste block).
3) Commit & push (see Commands).

---

## Add or update a blog post
### Quick scaffold for a new post
```bash
POST="2025-11-01-new-post-slug"
mkdir -p "blog/$POST"
cat > "blog/$POST/index.html" <<'H'
<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="/assets/styles.css">
<div class="container"><h1>New Post Title</h1><p class="small">Posted: 2025-11-01</p><p>Your content here...</p></div>
H

3) Commit & push (see Commands).

---

## Add or update a blog post
### Quick scaffold for a new post
```bash
POST="2025-11-01-new-post-slug"
mkdir -p "blog/$POST"
cat > "blog/$POST/index.html" <<'H'
<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="/assets/styles.css">
<div class="container"><h1>New Post Title</h1><p class="small">Posted: 2025-11-01</p><p>Your content here...</p></div>
H
Rebuild the blog list
bash
Copy code
{
  cat <<'H'
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Blog | RedBeard Technologies</title>
<link rel="stylesheet" href="/assets/styles.css"></head><body>
<header class="container"><nav class="nav">
  <a href="/index.html">Home</a><a href="/services/index.html">Services</a><a href="/contact.html">Contact</a>
</nav></header><main class="container"><h1>Blog</h1><ul>
H
  for f in $(find blog -mindepth 2 -maxdepth 2 -name index.html | sort -r); do
    d=$(dirname "$f"); t=$(grep -m1 -oP '(?<=<h1>).*?(?=</h1>)' "$f" || true)
 
<title>Blog | RedBeard Technologies</title>
<link rel="stylesheet" href="/assets/styles.css"></head><body>
<header class="container"><nav class="nav">
  <a href="/index.html">Home</a><a href="/services/index.html">Services</a><a href="/contact.html">Contact</a>
</nav></header><main class="container"><h1>Blog</h1><ul>
H
  for f in $(find blog -mindepth 2 -maxdepth 2 -name index.html | sort -r); do
    d=$(dirname "$f"); t=$(grep -m1 -oP '(?<=<h1>).*?(?=</h1>)' "$f" || true)
    [ -z "$t" ] && t="${d#blog/}"
    echo "<li><a href=\"/$d/\">$t</a></li>"
  done
  cat <<'T'
</ul></main><footer class="footer"><div class="container"><div class="small"><a href="/index.html">RedBeard Technologies</a></div></div></footer></body></html>
T
} > blog/index.html

### Block R2 — append (part 2/3)
```bash
cd "$HOME/redbeardtek_site"
cat >> README_UPDATE_SITE.md <<'EOF'

## Partners / Vendors page
```bash
cat > partners.html <<'H'
<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="/assets/styles.css">
<div class="container"><h1>Trusted Brands & Partners</h1>
<div class="grid">
  <div class="card"><h3>Example Vendor</h3><p>Routers & mesh Wi-Fi</p><p><a class="btn" href="#">Shop</a></p></div>
  <div class="card"><h3>Example Vendor</h3><p>SSDs & RAM</p><p><a class="btn" href="#">Shop</a></p></div>
  <div class="card"><h3>Example Vendor</h3><p>Backup & recovery</p><p><a class="btn" href="#">Shop</a></p></div>
</div></div>
H

git add -A
git commit -m "Update site"
git push origin main

python3 -m http.server --directory "$(pwd)" 8080
# open http://<home-ip>:8080

### Block R3 — append (part 3/3) + commit
```bash
cd "$HOME/redbeardtek_site"
cat >> README_UPDATE_SITE.md <<'EOF'
## Troubleshooting quick fixes

### CSS change not showing
- Bust cache by adding `?v=$(date +%s)` to `/assets/styles.css` in `index.html`.

### Hero not visible
- Ensure `assets/img/hero.jpg` exists (lowercase).  
- Hero section must have: `<section class="hero hero-viking">`.

### Pipeline failed
- Open GitLab → CI/CD → Pipelines → last run → **pages** job → read last ~20 lines.  
- Common fix: ensure `.gitlab-ci.yml` exists on `main` and contains a `pages` job that outputs `public/`.

### Blog index empty
- Re-run the “Rebuild the blog list” snippet above.

---

## Commands (cheat sheet)
```bash
# Create/update & push
git add -A && git commit -m "Update" && git push origin main

# Force rebuild of Pages without file changes
git commit --allow-empty -m "Trigger Pages" && git push origin main

# Show branch & remotes
git rev-parse --abbrev-ref HEAD
git remote -v

— End of Runbook —
