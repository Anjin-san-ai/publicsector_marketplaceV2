# Push to Your New GitHub Repository

After you create a new repository on GitHub, run these commands from the project folder:

```bash
# Remove the old remote (points to ineilsen/publimarketplace)
git remote remove origin

# Add your new repository (replace with YOUR GitHub URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Stage all changes
git add -A
git status

# Commit the cleanup and AWS deployment prep
git commit -m "Prepare for AWS deployment: remove dev dependencies, add deployment guide"

# Push to your new repo (use main or master depending on your default branch)
git push -u origin main
```

If your default branch is `master` instead of `main`:

```bash
git push -u origin master
```
