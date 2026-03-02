# Deploy UK Public Sector AI Marketplace to AWS

This guide walks you through deploying this React app to AWS using **S3** (storage) and **CloudFront** (CDN). No prior AWS experience required.

---

## Prerequisites

- **AWS Account** – Sign up at [aws.amazon.com](https://aws.amazon.com)
- **AWS CLI** – Install from [AWS CLI Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- **Node.js** – For building the app (you already have this)

---

## Step 1: Build the App

From the project folder, run:

```bash
npm install
npm run build
```

This creates a `dist` folder with the production files.

---

## Step 2: Create an S3 Bucket

1. Open **AWS Console** → **S3** → **Create bucket**
2. Choose a **unique bucket name** (e.g. `uk-ai-marketplace-yourname`)
3. Select your **region** (e.g. `us-east-1`)
4. **Uncheck** "Block all public access" (we need public read for the website)
5. Acknowledge the warning and click **Create bucket**

---

## Step 3: Enable Static Website Hosting

1. Open your bucket → **Properties**
2. Scroll to **Static website hosting** → **Edit**
3. Select **Enable**
4. Set:
   - **Index document:** `index.html`
   - **Error document:** `index.html` (required for React Router)
5. Save changes

---

## Step 4: Upload the Build Files

1. Go to **Objects** tab → **Upload**
2. Click **Add files** and select **all files inside the `dist` folder**:
   - `index.html` (from `dist/`)
   - Everything inside `dist/assets/`
3. Click **Upload**

---

## Step 5: Set Bucket Policy (Make It Public)

1. Go to **Permissions** → **Bucket policy** → **Edit**
2. Paste this (replace `YOUR-BUCKET-NAME` with your bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

3. Save changes

---

## Step 6: Get Your Website URL

1. Go to **Properties** → **Static website hosting**
2. Copy the **Bucket website endpoint** (e.g. `http://bucket-name.s3-website-region.amazonaws.com`)

Open that URL in your browser to see your site.

---

## Step 7 (Optional): Add HTTPS with CloudFront

For a custom domain and HTTPS:

1. Go to **CloudFront** → **Create distribution**
2. **Origin domain:** Choose your S3 bucket (the website endpoint, not the bucket itself)
3. **Default root object:** `index.html`
4. **Error pages:** Add custom error response:
   - HTTP error code: `403` and `404`
   - Response page path: `/index.html`
   - HTTP response code: `200`
5. Create distribution
6. After it deploys (~5 min), use the **Distribution domain name** URL (e.g. `d1234abcd.cloudfront.net`)

---

## Deploying Updates

When you make changes:

1. Run `npm run build` again
2. In S3, delete the old files in your bucket
3. Upload the new contents of the `dist` folder

---

## Using AWS CLI (Faster Updates)

After initial setup, you can sync with one command:

```bash
aws s3 sync dist/ s3://YOUR-BUCKET-NAME --delete
```

Replace `YOUR-BUCKET-NAME` with your bucket name.

---

## Environment Variables

To change the Agent Builder URL in production, set `VITE_AGENT_BUILDER_URL` before building:

```bash
VITE_AGENT_BUILDER_URL=https://your-agent-builder-url.com npm run build
```

---

## Troubleshooting

| Issue | Fix |
|------|-----|
| Blank page | Ensure error document is `index.html` for SPA routing |
| 403 Forbidden | Check bucket policy allows public read |
| Old content showing | Clear browser cache or invalidate CloudFront cache |
| Build fails | Run `npm install` and ensure Node.js is installed |
