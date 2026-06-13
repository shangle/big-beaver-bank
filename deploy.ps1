# PowerShell deployment script for Big Beaver Bank (BBB)
# Automatically initializes Git, creates a GitHub Repository, pushes, and configures GitHub Pages.

Write-Output "Starting deployment of Big Beaver Bank..."

# 1. Initialize Git if not already done
if (-not (Test-Path .git)) {
    Write-Output "Initializing Git repository..."
    git init -b main
} else {
    Write-Output "Git repository already initialized."
}

# Configure local Git author identity
Write-Output "Configuring local Git author identity..."
git config user.name "shangle"
git config user.email "shangle@users.noreply.github.com"

# 2. Add and commit all files
Write-Output "Staging files for commit..."
git add .

Write-Output "Creating commit..."
git commit -m "Initial commit: Big Beaver Bank (BBB) - The Bank of Fiction"

# 3. Create public GitHub repository if remote doesn't exist
$remoteExists = (git remote) -contains "origin"

if (-not $remoteExists) {
    Write-Output "Creating remote repository on GitHub using gh CLI..."
    # Create the public repository, set origin remote, and push the main branch
    gh repo create big-beaver-bank --public --source=. --remote=origin --push
} else {
    Write-Output "Git remote 'origin' already exists. Pushing main branch..."
    git push -u origin main
}

# 4. Enable GitHub Pages to deploy from the main branch root
Write-Output "Configuring GitHub Pages..."
gh api -X POST /repos/shangle/big-beaver-bank/pages `
  -f "source[branch]=main" `
  -f "source[path]=/"

Write-Output "Deployment Script Complete!"
Write-Output "Please allow 1-2 minutes for GitHub Actions to build and deploy the page."
Write-Output "Once complete, your site will be live at: https://shangle.github.io/big-beaver-bank/"
