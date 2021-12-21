---
title: Pop!_OS Setup Guide
description: I've recently moved from Windows to Pop!_OS. These are my notes for first time configuration to get myself up and running and refer back to later.
date: 2020-12-14
---

I've just moved from Windows to Pop!_OS. These are my notes for first time configuration to get myslef up and running and refer back to later. 

I will update this guide as I add new apps or configure my system further.

## Things to do after installation

I've taken inspiration from [Willi Mutschler's Pop!_OS Guide](https://mutschler.eu/linux/install-guides/pop-os-post-install/) and added my own.

### Terminal

By default a fresh install the host is called `pop-os`; rename it for better accessability and personalisation.

```bash
hostnamectl set-hostname flamedfury
```

Set terminal theme to [One Dark theme for GNOME Terminal](https://github.com/denysdovhan/one-gnome-terminal).

```bash
bash -c "$(curl -fsSL 
https://raw.githubusercontent.com/denysdovhan/gnome-terminal-one/master/one-dark.sh)"
```

Install Neofetch so you to print your host details in terminal.

```bash
sudo apt install neofetch
```

### Remove unnecessary languages

In Region Settings open “Manage Installed Languages”, do not update 
these, but first remove the unnecessary ones. Then reopen “languages” 
and update these.

### Install updates and reboot

```bash
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

### Keyboard shortcuts

Show desktop is not enabled by default. Open Settings > Keyboard > Keyboard Shortcuts > Navigation > Enable Hide All Normal Windows (super + d)

```bash
dconf write /org/gnome/desktop/wm/keybindings/show-desktop "['<Super>d']"`
```

## Apps

### Firefox

Firefox comes installed by deafault with Pop!__OS, so can get straight to customising.

Set DuckDuckGo as default search engine: 

```bash
Firefox > Settings > Search > Default Search Engine > DuckDuckGo
```

Enable middle mouse button click to scroll:

```bash
Firefox > Settings > General > Browsing > Use autoscrolling
```

### Mark Text

I love a great markdown editor, I found [Mark Text](https://marktext.app/) in Pop!_Shop, easy 1 click install.

### Discord

I'm  part of so many communities on Discord. Discord is also available in Pop!_Shop.

### Solaar

I have a Logitech G615 wireless keyboard and G603 wireless mouse. [Solaar](https://pwr-solaar.github.io/Solaar/) is available in the Pop!_Shop for configuring and managing Logitech Unifying Receivers and Devices.

### VSCodium

I'm moving across to VSCodium for all my coding. VSCodium is available as a flatpack for Pop!_OS](https://github.com/flathub/com.vscodium.codium/).

Open Pop! Shop and search for VSCodium and click **install**.

Setup profile and extensions.

- [One Dark Pro](https://open-vsx.org/extension/zhuangtongfa/material-theme): Atom's iconic One Dark theme for VSCodium.
- [Live Server](https://open-vsx.org/extension/ritwickdey/LiveServer): Launch a development local Server with live reload feature for static & dynamic pages. Useful when I'm working on a non 11ty project.

### Node.js and NPM

I need Node and NPM for developing my [11ty](https://11ty.dev) based websites

```bash
sudo apt install nodejs npm
```

Verify the installation

```bash
node -v && npm -v
```

## Gaming

Pop!_OS makes it really easy to get up and running with my favourite games.

### Steam

Steam is available in the Pop!_Shop, open it up and you will find on the Pop!_Shop home page.

You can also install via terminal

```bash
sudo apt install steam
```

Proton is a compatibility layer tool which enables support for some Windows games on Linux. It's based on the WINE project with some tweaks and dditions by Valve. 

Enable Proton: 

```bash
Steam -> Settings -> Steam Play -> Check the box for "Enable Steam Play for supported titles" AND "Enable Steam Play for all other 
titles".
```

ProtonUp-QT is a GUI for managing compatibility tools for both Steam and Lutris. I used this to install the latest Glorious Eggroll Proton release to play GTA V. Available as a flatpak on Pop!_Store.

### Lutris

[Lutris](https://lutris.net/) is a game launcher that enables me to play non Steam Proton games on Linux, like World of Warcraft. Various games have various levels of support.

Lutris is available in the Pop!_Shop or can be installed via the terminal:

```bash
sudo apt install lutris
```

### Xbox One Controller

I have the Xbox One Controller + Wireless Adapter for Windows 10 and was pleased to see that I could get this working.

To do this install [xow](https://github.com/medusalix/xow), a Linux user mode driver for the Xbox One wireless dongle.

```bash
git clone https://github.com/medusalix/xow.git

sudo apt-get install libusb-1.0-0-dev  libusb-1.0-0 cabextract

cd xow

make BUILD=RELEASE

sudo make install

sudo systemctl enable xow.service

sudo systemctl start xow.service
```

***

*First published Dec 14, 2021*

*Last updated Dec 22, 2021*