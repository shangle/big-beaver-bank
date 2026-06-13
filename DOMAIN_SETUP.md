# Domain Configuration Guide: bigbeaverbank.com

This guide provides step-by-step instructions to map your custom domain, **bigbeaverbank.com** (purchased on Namecheap), to your GitHub Pages site hosted at `https://shangle.github.io/big-beaver-bank/`.

---

## Step 1: Configure Custom Domain on GitHub

To tell GitHub Pages to listen for requests coming from `bigbeaverbank.com`:

1. Go to your GitHub repository: [https://github.com/shangle/big-beaver-bank](https://github.com/shangle/big-beaver-bank).
2. Click on the **Settings** tab at the top.
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Scroll down to the **Custom domain** section.
5. Enter your domain: `bigbeaverbank.com` and click **Save**.
   * *Note: This will automatically commit a `CNAME` file to the root of your `main` branch containing your domain name.*

---

## Step 2: Configure Namecheap DNS Records

Now, you must tell Namecheap to point your domain's traffic to GitHub's servers.

1. Log in to your **Namecheap Dashboard**.
2. Find `bigbeaverbank.com` in your **Domain List** and click **Manage** on the right.
3. Select the **Advanced DNS** tab.
4. Under the **Host Records** section, add the following records (remove any existing default parking records):

### A Records (for the apex domain: `bigbeaverbank.com`)
Create **four** separate A Records pointing to GitHub's static IP addresses:

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `185.199.108.153` | Automatic / 5 min |
| **A Record** | `@` | `185.199.109.153` | Automatic / 5 min |
| **A Record** | `@` | `185.199.110.153` | Automatic / 5 min |
| **A Record** | `@` | `185.199.111.153` | Automatic / 5 min |

### CNAME Record (for the subdomain: `www.bigbeaverbank.com`)
Create a CNAME Record to redirect `www` requests to your GitHub Pages URL:

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME Record** | `www` | `shangle.github.io.` | Automatic / 5 min |

---

## Step 3: Enforce HTTPS

Once DNS records are configured, they can take anywhere from 10 minutes to a few hours to propagate globally. 

1. Go back to your GitHub repository's **Settings > Pages** screen.
2. In the **Custom domain** section, you will see a check status. Once GitHub verifies the DNS records are live, it will issue an SSL certificate.
3. Check the box for **Enforce HTTPS** to ensure all traffic is secure.

---

## Testing Propagation
To test if your records are active from your local command line, run:
```bash
nslookup bigbeaverbank.com
```
You should see the four `185.199.x.x` IP addresses listed in the response.
