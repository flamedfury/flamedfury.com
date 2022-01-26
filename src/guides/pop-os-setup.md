---
title: Pop!_OS Setup Guide
description: I've recently moved from Windows to Pop!_OS. These are my notes for first time configuration to get myself up and running and refer back to later.
css: "/css/prisim.css"
date: 2020-12-14
---

In December 2021 I moved from Windows to Pop!\_OS. These are my notes for first time configuration to get myslef up and running and refer back to later.

This guide will be updated as needed as new apps or configurations are added.

## Update OS and install common tools

Security updates:

```bash
sudo apt update && sudo apt dist-upgrade -y
```

Install common tools:

```bash
sudo apt install \
neofetch \
gnome-tweaks \
gnome-shell-extensions \
libusb-1.0-0-dev \
libusb-1.0-0 \
cabextract
```

Cleanup:

```bash
sudo apt autoremove -y
sudo apt autoclean -y
```

Check and update firmware:

```bash
sudo fwupdmgr get-devices
sudo fwupdmgr get-updates
sudo fwupdmgr update
```

Reboot:

```bash
sudo reboot now
```

## Improve Font Rendering

Install Gnome Tweaks to adjust font rendering. Can be installed from Pop!\_Shop or terminal:

- Run `sudo apt install gnome-tweaks`
- Run `gnome-tweaks`
- **Fonts** > **Hinting** > Set to "Full"
- **Fonts** > **Antialiasing** > Set to "Subpixel (for LCD screens)"

### Install fonts

Install **Font Manager** to manage fonts. Can be installed from Pop!\_Shop or terminal:

```bash
flatpak install flathub org.gnome.FontManager
```

Install Overpass font (thanks erik1066) by downloading from the [RedHatOfficial Repo](https://github.com/RedHatOfficial/Overpass/releases) and extract.

Open **Font Manager** > press **+** > Navigate to extracted ZIP and import fonts.

Open **Tweaks** > **Fonts**

- **Interface Text** set to Overpass Regular
- **Monospace Text** set to "Overpass Mono"
- **Legacy Window Titles** set to "Overpass Semi Bold"

## Terminal

By default a fresh install the host is called `pop-os`; rename it for better accessability and personalisation.

```bash
hostnamectl set-hostname flamedfury
```

Set terminal theme to [One Dark theme for GNOME Terminal](https://github.com/denysdovhan/one-gnome-terminal).

```bash
bash -c "$(curl -fsSL
https://raw.githubusercontent.com/denysdovhan/gnome-terminal-one/master/one-dark.sh)"
```

Restart terminal for settings to take effect.

## Coding & Hacking

## MarkText

I need a good markdown editor, [Mark Text](https://marktext.app/) is my editor of choice on Linux. Can be installed from Pop!\_Shop or from terminal:

```bash
flatpak install flathub com.github.marktext.marktext
```

### VSCodium

I'm moving across to VSCodium for all my coding. Can be installed from Pop!\_Shop or from terminal:

```bash
flatpak install flathub com.vscodium.codium
```

#### Settings

Custom settings: **File** > **Preferences** > **Settings**

- **Titlebar** set to "Custom"
- **Enable Natural Language Search** set to "False"
- **Enable Experiments** set to "False"
- **Editor: Format on Save** set to "Enable"
- **Editor: Font Size** set to "16px"
- **Editor: Tab Size** set to "2"

settings.json:

```json
{
  "workbench.colorTheme": "One Dark Pro Flat",
  "terminal.integrated.defaultProfile.linux": "bash",
  "editor.fontSize": 16,
  "editor.tabSize": 2,
  "window.titleBarStyle": "custom",
  "workbench.settings.enableNaturalLanguageSearch": false,
  "workbench.enableExperiments": false,
  "editor.formatOnSave": true
}
```

#### Extensions

I don't rely on too many extensions, the following help me on my web projects:

- [Prettier](https://open-vsx.org/extension/esbenp/prettier-vscode): An opinionated code formatter that enforces a consistent style by parsing code based on a rule set.
- [Auto Close Tag](https://open-vsx.org/extension/formulahendry/auto-close-tag): Automatically closes HTML/XML tags, really useful.
- [Live Server](https://open-vsx.org/extension/ritwickdey/LiveServer): Launch a development local Server with live reload feature for static & dynamic pages. Useful when I'm working on a non 11ty project.

#### Themes

Only one dark theme matters to me: [Atom One Dark Theme](https://open-vsx.org/extension/zhuangtongfa/material-theme)

## Firefox

Firefox is installed by default on Pop!\_OS.

#### Settings

**Firefox** > **Settings** > **Default Search Engine** > Set to "[DuckDuckGo](https://duckduckgo.com/)"

**Firefox** > **Settings** > **Browsing** > Enable "User autoscrolling"

**Firefox** > **Settings** > **Privacy**

- **Allow Firefox to send technical and interaction data to Mozilla** disable
- **Uncheck "Allow Firefox to install and run studies** disable

**Firefox** > `about:config` > `layers.acceleration.force-enabled` > set to "True"
**Firefox** > `about:config` > `layers.force-active` > set to "True"

## Gaming

Pop!\_OS makes it really easy to get up and running with my favourite games.

### Steam

Steam is amazing for gaming on Linux. Can be installed from Pop!\_Shop or terminal:

```bash
sudo apt install steam
```

Enable Proton: **Steam** > **Settings** > **Steam Play** > Enable "Enable Steam Play for supported titles" **AND** "Enable Steam Play for all other titles".

Install **ProtonUp-QT** for managing external Proton releases to play GTA V.
Can be installed from Pop!\_Shop or terminal:

```bash
flatpak install flathub net.davidotek.pupgui2
```

Install Glorious Eggroll Proton: **ProtonUp-QT** > **Add version** > **Proton-GE** / **7.0rc2-GE-1** (or other specific version)

Configure Steam to run GTA V in Proton GE: **Steam** > **Library** > Rightclick **Grand Theft Auto V** > **Properties** > **Compatibility** > Enable "Force the use of a specific Steam Play compatibility tool" and set to "Proton-7.0rc2-GE-1"

### Xbox One Controller

To use the Xbox One Controller + Wireless Adapter for Windows 10 install [xow](https://github.com/medusalix/xow), a Linux user mode driver for the Xbox One wireless dongle.

```bash
git clone https://github.com/medusalix/xow.git \
cd xow \
make BUILD=RELEASE \
sudo make install \
sudo systemctl enable xow.service \
sudo systemctl start xow.service\
sudo reboot -now
```

### Lutris

[Lutris](https://lutris.net/) is a game launcher that enables me to play non Steam Proton games on Linux, like World of Warcraft. Various games have various levels of support. Can be installed from Pop!\_Shop or terminal:

```bash
sudo apt install lutris
```

## Other apps

Useful apps, that don't need individual configuration. Can be installed from Pop!\_Shop

- **Discord** for interacting with my many communities
- **Solaar** for manging my Logitech devices
- **Spotify** for listening to music
- **Librewolf** is a Firefox fork with a focus on security and privacy
- **Fluent Reader** for RSS feeds

---

The following guides were used to develop my own:

- [Willi Mutschler's Pop!\_OS Guide](https://mutschler.eu/linux/install-guides/pop-os-post-install/)
- [Pop!\_OS 20.04 Setup for Web Developers](https://github.com/erik1066/pop-os-setup)
- [Pop!\_OS Setup Script](https://github.com/TechnologyMan101/pop-os-setup-script)

---

_First published Dec 14, 2021_

_Last updated Dec 22, 2021_
