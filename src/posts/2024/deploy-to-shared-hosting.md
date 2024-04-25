---
title: Deploying An 11ty Project To Shared Hosting
description: Forget the usual suspects for your website hosting. You should consider shared hosting for your next 11ty project.
tags:
  - eleventy
  - webdev
  - guides
date: 2024-04-25
timestamp: 2024-04-25T05:17:11.582Z
---

What's up, Internet? When discussing hosting options for personal websites, the usual suspects are mentioned: Netlify, Vercel, Cloudflare, Github, Neocities, or a VPS if you want to go off the deep end. All have their strengths and weaknesses, but I'm here to discuss a solid option never suggested: the humble shared hosting plan.

## Remember shared hosting?

While shared hosting is often overlooked, it's an affordable and user-friendly way to host a website, making it a great option whether you're a beginner or a veteran in website building. It's also a great throwback to the hosting you yearned for back in the day. Who remembers sitting around on the old free hosting platforms waiting for someone with their own domain to scoop them up and allow them to start hosting a website on their shared plan under a subdomain?

I've been hosting my website on a shared hosting plan for the past couple of months and have been enjoying it. 

## Diversity for 11ty

Consequently, when you search for [11ty deployment](https://11tybundle.dev/categories/deployment/) options, they all tend to be for the VC funded or big players. With this guide, I hope to provide some diversity and help anyone looking for an alternative hosting option or to help you get started with automated builds and deployments for your 11ty project.

## Deploying to shared hosting with Github Actions

The script I'm about to share offers decent automation for building and deploying an 11ty project. It's a powerful tool that handles everything from checking out the repository to setting up the environment, building the website, deploying it to the server, and managing caches for improved performance in future runs. It's designed to work seamlessly with any server type you have SSH access to, whether shared, managed, dedicated, or VPS, giving you the confidence to choose the best hosting that suits your needs. 

Because this is a Github Action, it relies on GitHub, which I still use to host my source code. If you're not into Github, try running this on [Gitea](https://docs.gitea.com/usage/actions/overview); I still need to look into it though.

```yaml
name: "11ty: Build and Deploy"

on:
  schedule:
    - cron: 0 2/6 * * *
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    name: "11ty: Build and Deploy"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: "npm"

      - uses: actions/cache/restore@v4
        id: cache
        with:
          path: |
            .cache/
            src/assets/fonts/
            src/assets/images/
            src/assets/og-images/
          key: 11ty-${{ runner.os }}-${{ github.run_id }}
          restore-keys: |
            11ty-${{ runner.os }}
            ${{ runner.os }}-11ty
            
      - name: Build website
        run: |
          npm install
          npm run build
        env:
          LASTFM_KEY: ${{ secrets.LASTFM_KEY }}
          LASTFM_USER: ${{ secrets.LASTFM_USER }}

      - name: Deploy website to server
        uses: easingthemes/ssh-deploy@v5.0.3
        env:
          SSH_PRIVATE_KEY: ${{ secrets.CPANEL_SSH_KEY }}
          SOURCE: "dist/"
          REMOTE_HOST: ${{ secrets.CPANEL_HOST }}
          REMOTE_PORT: ${{ secrets.CPANEL_PORT }}
          REMOTE_USER: ${{ secrets.CPANEL_USER }}
          TARGET: ${{ secrets.CPANEL_TARGET }}
          EXCLUDE: ".git*, .github*, node_modules*, src*"

      - uses: actions/cache/save@v4
        with:
          path: |
            .cache/
            src/assets/fonts/
            src/assets/images/
            src/assets/og-images/
          key: 11ty-${{ runner.os }}-${{ github.run_id }}
```

## What do I need to use this?

You're going to need a shared hosting plan or any hosting plan that gives you SSH access. This should work with any type of server, including VPS. I had to raise a ticket with my host to enable and allow SSH from GitHub's IP ranges.

### Github IP ranges

Unless you're paying Github lots of money, when you run an action, your runner gets assigned a random IP address. There are complicated ways to automate retrieving the IP address at build time and creating firewall rules, but this depends on the access level to your server. To simplify things, I just allowed GitHub's IP ranges access to SSH, and I'm happy to hear [why this might be a bad idea]().

To get the IP ranges, I created a file `github-ip-ranges.zsh` with the following:

```bash
#!/bin/zsh

get_github_ip_ranges() {
    local url="https://api.github.com/meta"
    local response=$(curl -s "$url")
    if [ $? -eq 0 ]; then
        local ip_ranges=$(echo "$response" | jq -r '.hooks[]')
        echo "$ip_ranges"
    else
        echo "Failed to retrieve GitHub IP ranges"
    fi
}

github_ip_ranges=$(get_github_ip_ranges)
if [ -n "$github_ip_ranges" ]; then
    echo "GitHub IP ranges:"
    echo "$github_ip_ranges"
fi
```

Then I gave it running permissiones `chmod +x github_ip_ranges.zsh` before running it with `./github_ip_ranges.zsh`

### Server details

For this to work, you will need the following details for your hosting account

- SSH Key
- Server Hostname
- Server SSH Port
- Server Username

Once you have these, you need to create them as [repository secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository) that your action can access. 

## Let's breakdown the script

```yaml
name: "11ty: Build and Deploy"

on:
  schedule:
    - cron: 0 2/6 * * *
  push:
    branches:
      - main
```

- The script is named "11ty: Build and Deploy". 
- It automates the process of building and deploying your 11ty website project to a shared hosting server. 
- The script triggers automatically on a schedule or when changes are pushed to the `main` branch.

### Setup

```yaml
jobs:
  build-and-deploy:
    name: "11ty: Build and Deploy"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: "npm"
```

- The job runs on the latest version of the Ubuntu operating system (`ubuntu-latest`).
- It uses the `actions/checkout@v4` action to check out the repository and `actions/setup-node@v4` action to set up Node.js with the latest LTS version.

### Restore cache

```yaml
  - uses: actions/cache/restore@v4
    id: cache
    with:
      path: |
        .cache/
        src/assets/fonts/
        src/assets/images/
        src/assets/og-images/
      key: 11ty-${{ runner.os }}-${{ github.run_id }}
      restore-keys: |
        11ty-${{ runner.os }}
        ${{ runner.os }}-11ty
```

- `actions/cache/restore@v4` is used to restore cached files and directories that may speed up the build process.
- The cache includes specific paths such as `.cache/`, `src/assets/fonts/`, and others.
- The cache key is based on the runner's operating system and GitHub run ID.

### Build

```yaml
      - name: Build website
        run: |
          npm install
          npm run build
        env:
          LASTFM_KEY: ${{ secrets.LASTFM_KEY }}
          LASTFM_USER: ${{ secrets.LASTFM_USER }}
```

- Installs necessary dependencies with `npm install`.
- Builds the website with `npm run build`.
- Uses secrets (`LASTFM_KEY` and `LASTFM_USER`) as environment variables during the build process. Copy and paste over anything you have in your `.env` file here. Don't forget to create them in your repository secrets in GitHub. I've used my Last.FM keys as an example.

### Deploy

```yaml
      - name: Deploy website to server
        uses: easingthemes/ssh-deploy@v5.0.3
        env:
          SSH_PRIVATE_KEY: ${{ secrets.CPANEL_SSH_KEY }}
          SOURCE: "dist/"
          REMOTE_HOST: ${{ secrets.CPANEL_HOST }}
          REMOTE_PORT: ${{ secrets.CPANEL_PORT }}
          REMOTE_USER: ${{ secrets.CPANEL_USER }}
          TARGET: ${{ secrets.CPANEL_TARGET }}
          EXCLUDE: ".git*, .github*, node_modules*, src*"
```

- Uses the `easingthemes/ssh-deploy`action to deploy the built website to the shared hosting server.
- Uses an SSH private key (`CPANEL_SSH_KEY`) to authenticate with the server.
- Deploys files from the `dist/` directory.
- Specifies server connection details such as host, port, and user (`CPANAL_HOST`, `CPANEL_PORT`, `CPANEL_USER`)
  - I'm not actually sure if the `USER` is required, but it's there anyway.
- Excludes specific directories and files (e.g., `.git*`, `.github*`, `node_modules*`, `src*`) from the deployment.

### Save cache

```yaml
      - uses: actions/cache/save@v4
        with:
          path: |
            .cache/
            src/assets/fonts/
            src/assets/images/
            src/assets/og-images/
          key: 11ty-${{ runner.os }}-${{ github.run_id }}
```

- Uses the `actions/cache/save@v4` action to save the cache paths from the build process for future runs.
- The cache key is based on the runner's operating system and GitHub run ID.

### How fast is it?

Build and deploy time varies a lot. For my website, it averages around 2 minutes 30 seconds. If I change a bunch of things, it can be longer. These are similar times to what I would experience with Netlify but quicker than deploying to Neocities and with fewer errors than I would experience with Neocities.

### Wrapping up

I need to investigate RSYNC arguments to do some type of cleanup, e.g. when I delete a file on my local project, it is deleted from the server. Related to that, I want to figure out how to cache more, but I need to use RSYNC to make sure to replace cache files if they're updated. I ran into an issue the other week where I cached the entire `/dist/` directory. While new files appeared, a modified file, e.g. a stylesheet, remained using the cached version rather than the updated version.

I hope this helps you figure out how to bring automated build and deploys to your life without having to rely on the big or VC funded platforms. Shared, managed, self-managed (VPS) and self-hosted hosting options help create a healthy, small, and open web. 

Shout out to [Chris](https://chrisburnell.com/) for the back-n-forth while we figured this out.

Happy website building.