# Push this repo to GitHub

## 1. Create the empty repo
Go to https://github.com/new
- Owner: eknatha
- Name: ytanalytics
- Public
- Do NOT initialize with README/.gitignore/license (this repo has them)

## 2. Push from this folder
```bash
git init
git add .
git commit -m "ytanalytics: offline-first YouTube growth studio"
git branch -M main
git remote add origin https://github.com/eknatha/ytanalytics.git
git push -u origin main
```

## 3. Make GitHub Pages serve the built file
Pages serves the repo root, but the deployable artifact lives in dist/.
Easiest path — copy the build output to root before committing:

```bash
cp dist/index.html ./index.html
git add index.html && git commit -m "deploy: built index.html at root"
git push
```

Then: repo Settings -> Pages -> Source: Deploy from a branch -> main -> / (root) -> Save.

(.nojekyll and CNAME are already at root.)

## 4. DNS
Add a CNAME record at your DNS provider:
- Host: ytanalytics
- Value: eknatha.github.io

Settings -> Pages -> Custom domain: ytanalytics.eknathalabs.com -> Enforce HTTPS.

## Editing later
Edit files in src/, then:
```bash
python3 build.py
cp dist/index.html ./index.html
git commit -am "update" && git push
```
