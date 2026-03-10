# replacepicoswithchipotle.com

Landing page for Mustang Market. Hosted on **Cloudflare Pages**.

## Cloudflare setup (hosting + Worker routing + HTTPS)

This project is served by a **Cloudflare Worker** and mapped to the custom domain via **Workers Routes**.

### 1) DNS (proxy/orange cloud)
Cloudflare Dashboard → `replacepicoswithchipotle.com` → **DNS → Records**

Ensure these records exist and are **Proxied (orange cloud)**:

- `A`  **@** → `192.0.2.1`  *(placeholder “no origin” IP)*
- `A`  **www** → `192.0.2.1`  *(or `CNAME www → @`)*
- (Optional) `A` **\*** → `192.0.2.1` *(only if you want any subdomain to work)*

> Proxied DNS is required so Cloudflare can run the Worker and redirect/HTTPS logic at the edge.

### 2) Worker routing (attach the domain to the Worker)
Cloudflare Dashboard → `replacepicoswithchipotle.com` → **Workers Routes**

Create routes pointing to the Worker `replacepicoswithchipotle`:

- `replacepicoswithchipotle.com/*`  *(root domain)*
- `*.replacepicoswithchipotle.com/*` *(all subdomains, including `www`)*

### 3) HTTPS / “Not secure” fix
Cloudflare Dashboard → `replacepicoswithchipotle.com` → **SSL/TLS → Edge Certificates**

- ✅ Enable **Always Use HTTPS**
- ✅ (Optional) Enable **Automatic HTTPS Rewrites**

This forces `http://` to upgrade to `https://` so browsers show the secure lock.

### 4) Verify
- `https://replacepicoswithchipotle.com`
- `https://www.replacepicoswithchipotle.com`
3. Cloudflare will create/update DNS automatically.

## Local preview
Just open `index.html` in a browser (or use any simple static server).
