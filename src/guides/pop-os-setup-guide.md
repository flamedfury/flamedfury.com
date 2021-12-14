---
title: Pop!_OS Setup Guide
description: I've recently moved from Windows to Pop!_OS. These are my notes for first time configuration to get myself up and running and refer back to later.
date: 2020-12-14
---

{{ post.data.description }}

## Applications needed

- [Mark Text](https://marktext.app/) for note taking
  
- [Solaar](https://pwr-solaar.github.io/Solaar/) for configuring and managing Logitech Unifying Receivers and Devices
  
- Discord for Discord
  

## Colour Themes

#### Terminal

[One Dark theme for GNOME Terminal](https://github.com/denysdovhan/one-gnome-terminal)

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/denysdovhan/gnome-terminal-one/master/one-dark.sh)"
```

## Pop!_OS: Things to do after installation (Apps, Settings, and Tweaks)

Based off of [Pop!_OS: Things to do after installation (Apps, Settings, and Tweaks) | Willi Mutschler](https://mutschler.eu/linux/install-guides/pop-os-post-install/)

### Set hostname

By default a fresh install the host is called `pop-os`; rename it for better accessability and personalisation

```bash
hostnamectl set-hostname flamedfury
```

### Install Neofetch

Allows you to print your host details in terminal

```bash
sudo apt install neofetch
```

#### Remove unnecessary languages

In Region Settings open “Manage Installed Languages”, do not update 
these, but first remove the unnecessary ones. Then reopen “languages” 
and update these.

#### Install updates and reboot

```bash
Install updates and reboot

sudo apt update
sudo apt upgrade
sudo apt dist-upgrade
sudo apt autoremove
sudo apt autoclean
sudo fwupdmgr get-devices
sudo fwupdmgr get-updates
sudo fwupdmgr update
flatpak update
sudo reboot now
```

#### Gnome-tweaks

```bash
sudo apt install gnome-tweak-tool 
```

In Gnome Tweaks I make the following changes:

- Disable “Suspend when laptop lid is closed” in General
- Disable “Activities Overview Hot Corner” in Top Bar
- Enable “Weekday” and “Date” in “Top Bar”
- Enable Battery Percentage (also possible in Gnome Settings - Power)
- Check Autostart programs
- Put the window controls to the left and disable the minimize button

#### Keyboard shortcuts

Show desktop is not enabled by default. Open Settings > Keyboard > Keyboard Shortcuts > Navigation > Enable Hide All Normal Windows (super + d)

```bash
dconf write /org/gnome/desktop/wm/keybindings/show-desktop "['<Super>d']"`
```

## Firefox

Firefox comes installed by deafault with Pop!__OS, so can get straight to customising.

Set DuckDuckGo as default search engine: Firefox > Settings > Search > Default Search Engine > DuckDuckGo

Enable middle mouse button click to scroll: Firefox > Settings > General > Browsing > Use autoscrolling

## Gaming

### Steam

Open Pop!_Shop then either search for Steam or by clicking the Steam icon on the Pop!_Shop home page and click the **install**.

You can also install via terminal

```bash
sudo apt install steam
```

Proton is a compatibility layer tool which enables support for some 
Windows games on Linux. It's based on the WINE project with some tweaks 
and additions by Valve. Enable Proton: Steam -> Settings -> Steam Play -> Check the box for "Enable Steam Play for supported titles" AND "Enable Steam Play for all other 
titles".

## Development

### VSCodium

I'm moving across to VSCodium for all my coding. VSCodium is available as a flatpack for Pop!_OS](https://github.com/flathub/com.vscodium.codium/).

Open Pop! Shop and search for VSCodium and click **install**.

Setup profile and extensions.

[One Dark Pro](https://open-vsx.org/extension/zhuangtongfa/material-theme): Atom's iconic One Dark theme for VSCodium.

[Live Server](https://open-vsx.org/extension/ritwickdey/LiveServer): Launch a development local Server with live reload feature for static & dynamic pages. Useful when I'm working on a non 11ty project.

### Node.js and NPM

I need Node and NPM for developing my [11ty](https://11ty.dev) based websites

```bash
sudo apt install nodejs npm
```

Verify the installation

```bash
node -v && npm -v
```

***

*First published Dec 14, 2021*
*Last updated Dec 14, 2021*