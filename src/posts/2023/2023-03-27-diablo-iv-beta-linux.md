---
title: Diablo IV Beta on Pop!_OS
description: A quick tip to get Diablo IV Beta running on Linux through Lutris.
tags:
  - gaming
  - linux
  - guides
date: 2023-03-27
---

This quick post details how I got the Diablo IV Beta running on Pop!_OS.

Applications needed:
* [Lutris](https://lutris.net/downloads)
* [ProtonUp-QT](https://davidotek.github.io/protonup-qt/)

## Install BattleNet launcher & Diablo IV

Open ProtonUp-QT and install `lutris-GE-diablo_4_beta-x86_64` (Wine-GE Runner).

Open Lutris and install the BattleNet launcher using the Diablo IV installation script with Lutris. Click the + add game button in the upper left and select the first option. Search for Diablo IV.

Launch BattleNet and then Diablo IV. Select Diablo IV Beta in the game version selection menu and install the game files.

## Configure game options

#### Game options
Add `--exec="launch Fen"` as a launch argument. This will load straight to Diablo IV when the Battle.net launcher is run.

#### Runner options:
Set Wine version to lutris-GE-diablo_4_beta-x86_64
Set DXVK to version 2.1
Set VKD3D to version 2.8

#### Game info
Download custom cover art from [SteamGridDB](https://www.steamgriddb.com/search/grids?term=Diablo+Iv).

{% imagePlaceholder "./src/assets/images/posts/2023-03-27-diablo-iv-character-select.png", "The character select screen in the game Diablo IV", "Chose your character" %}

{% imagePlaceholder "./src/assets/images/posts/2023-03-27-diablo-iv-gameplay.png", "A screenshot of Diablo IV gameplay", "Clearing the first dungeon" %}

{% imagePlaceholder "./src/assets/images/posts/2023-03-27-diablo-iv-boss-fight.png", "A screenshot of Diablo IV gameplay, fighting the first boss", "First boss fight" %}

{% imagePlaceholder "./src/assets/images/posts/2023-03-27-diablo-iv-cut-scene.png", "A cut scene from the game Diablo IV", "Cut scenes play perfectly" %}

You should be good to go to slay the demons of hell.