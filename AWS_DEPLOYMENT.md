# AWS Deployment — UK Public Sector AI Marketplace

This is a Vite/React static-site build. It deploys to **S3 + CloudFront**.

## What's in the zip

`~/Desktop/marketplace-dist.zip` (~14 MB) — the contents of `dist/`, ready to drop into an S3 bucket.

```
index.html
assets/                  (hashed JS + CSS chunks, immutable cache)
*.png  AIhub.html  ...   (static assets from public/)
```

## One-time AWS setup (skip if you already have a bucket + CloudFront)

```bash
# Variables — set these to YOUR resources
export BUCKET=uk-public-sector-ai-marketplace-prod
export REGION=eu-west-2
export DISTRIBUTION_ID=EXXXXXXXXXXXXX

# 1. Create the bucket (private)
aws s3api create-bucket \
  --bucket "$BUCKET" \
  --region "$REGION" \
  --create-bucket-configuration LocationConstraint="$REGION"

# 2. Block all public access (CloudFront will be the only reader)
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# 3. Create a CloudFront Origin Access Control + distribution pointing at the
#    bucket, with SPA routing (404/403 -> /index.html, 200). Easiest via console.
```

When configuring CloudFront for an SPA:
- **Default root object:** `index.html`
- **Custom error responses:** map `403` and `404` -> `/index.html` with response code `200` so React Router handles unknown paths.
- **Origin access:** Origin Access Control (signed requests), bucket policy auto-attached.

## Deploy from your machine

### Option A: upload the zip via the AWS console

1. Open the S3 console -> your bucket
2. Click **Upload** -> drag `~/Desktop/marketplace-dist.zip` ... wait — **extract it first**, S3 won't unpack a zip. Either:
   - Unzip locally (`unzip -d marketplace-dist marketplace-dist.zip`) then drag the folder contents in, **OR**
   - Use option B (one command)

### Option B: upload directly with the AWS CLI (recommended)

```bash
cd "/Users/541388/Library/CloudStorage/OneDrive-Cognizant/Documents/Projects/Public Marketplace _V2"

export BUCKET=uk-public-sector-ai-marketplace-prod
export DISTRIBUTION_ID=EXXXXXXXXXXXXX

# Everything except index.html is hash-named -> cache forever
aws s3 sync dist/ "s3://$BUCKET" \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html"

# index.html is the entry point -> never cache
aws s3 cp dist/index.html "s3://$BUCKET/index.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8"

# Invalidate CloudFront so visitors see the new index.html immediately
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/index.html" "/*"
```

### Option C: let the existing GitHub Actions workflow do it

`.github/workflows/deploy.yml` already runs Option B on every push to `main`. Required repo secrets:

| Secret | Example value |
|---|---|
| `AWS_ACCESS_KEY_ID` | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | `...` |
| `AWS_REGION` | `eu-west-2` |
| `AWS_S3_BUCKET` | `uk-public-sector-ai-marketplace-prod` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `EXXXXXXXXXXXXX` |

## Rebuilding

```bash
cd "/Users/541388/Library/CloudStorage/OneDrive-Cognizant/Documents/Projects/Public Marketplace _V2"
npm ci
npm run build                              # outputs to dist/
(cd dist && zip -rq ~/Desktop/marketplace-dist.zip .)
```

## Suggested follow-up perf wins

The bundle is now well-split (~130 KB gzipped initial JS, routes lazy-load). The biggest remaining file-size cost is in `public/`:

- **Team photos** (`Abhishek.png` ... `Yatin.png`) are ~2 MB each -> ~14 MB total. Re-export as 800px-wide WebP and save ~12 MB.
- `AIhub.html` (22 KB) is a standalone html file in `public/`. If it's no longer referenced from the React app, you can delete it.
