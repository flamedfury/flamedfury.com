---
title: Running World of Warcraft on Pop!_OS Guide
description: Patch 9.2 is on the horizon and with that the next raid, Sepulcher of the First Ones will be released. These are my notes for getting World of Warcraft up and running on Pop!_OS.
date: 2022-01-26
---

Patch 9.2 is on the horizon and with that the next raid, Sepulcher of the First Ones will be released. These are my notes for getting World of Warcraft up and running on Pop!\_OS.

## Install Battle.Net launcher and Warcraft

World of Warcraft is available on Lutris.

Various dependencies are required to install successfully, these may already be installed on your system, but it won't hurt to ensure you have them. Check [docs/WineDependencies.md at master · lutris/docs · GitHub](https://github.com/lutris/docs/blob/master/WineDependencies.md) for the most recent list.

```bash
sudo dpkg --add-architecture i386 && sudo apt update && sudo apt install -y wine64 wine32 libasound2-plugins:i386 libsdl2-2.0-0:i386 libdbus-1-3:i386 libsqlite3-0:i386
```

With dependencies sorted, and with Lutris already insatlled, you can hit the `Install` button on the [World of Warcraft - Lutris](https://lutris.net/games/world-of-warcraft/) page.

Leave the default install directory, eg. `/home/flamed/Games/world-of-warcraft` and Lutris will run through downloading and installing the Battle.Net app required to launch World of Warcraft.

Run through the installers, check the options you want, shouldn't make a difference.

When the Battle.Net login screen pops up during install, just close it so that the game can continue installing.

> Do not try to log into Battle.net, just close the Battle.Net login window when appearing. After Lutris installer is finished, you can start Blizzard App with "Launch the game", and install / locate your Blizzard game.

Once done, set shortcuts if you want, and launch Battle.Net, login, and then hit the install button on the World of Warcraft page. This will take you through the installation process just like you would in Windows.

## What about addons?

I've been using [WowUp](https://wowup.io/) for all my addon management, they have a Linux app available too so this is as easy as downloading the latest `.AppImage` from the [WowUp Releases page on GitHub](https://github.com/WowUp/WowUp/releases).

Save the `.AppImage` to where you want then make it executable by right clicking > Properties > Permissions > Enable Allow executing file as program > Close and run as normal.

Just like in Windows, point WowUp to your WoW.exe file, which in Lutris is located in `/home/games/`

```bash
/home/flamed/Games/world-of-warcraft/drive_c/Program Files (x86)/World of Warcraft/_retail_/Wow.exe
```

---

Reference

[docs/Battle.Net.md at master · lutris/docs · GitHub](https://github.com/lutris/docs/blob/master/Battle.Net.md)

[docs/WorldOfWarcraft.md at master · lutris/docs · GitHub](https://github.com/lutris/docs/blob/master/WorldOfWarcraft.md)

---

_First published Jan 26, 2022_

_Last updated Jan Jan 26, 2022_
