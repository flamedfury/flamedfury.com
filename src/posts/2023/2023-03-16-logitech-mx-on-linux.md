---
title: Logitech MX on Linux
description: When it comes to computer peripherals, I use Logitech. Keyboards, mice, headsets - they’re all Logitech. But how do you take advantage of them when Logitech doesn't provide Linux drivers or software?
tags:
  - linux
  - technology
date: 2023-03-16
---

When it comes to computer peripherals, I use Logitech. Keyboards, mice, headsets - they're all Logitech.

Until recently, I used a [G613](https://www.logitechg.com/en-us/products/gaming-keyboards/g613-wireless-mechanical-gaming-keyboard.920-008386.html) keyboard paired with a [G03](https://support.logi.com/hc/en-nz/articles/360025266514--Product-Gallery-G603-LIGHTSPEED-Wireless-Gaming-Mouse) wireless mouse. They suited me fine over the years. I wanted to switch from gaming peripherals to the [MX Master Series](https://www.logitech.com/en-us/mx/master-series.html) after using the MX Master 2 and 3S mice and MX Keys keyboard on my work MacBook.

{% eleventyImage "./src/assets/images/posts/2023/2023-03-16-logitech-mx-keyboard-mouse.jpeg", "A Logitech MX Mechanical keyboard and MX Master 3S mouse on a camouflage mouse mat on a wooden desk", "The MX Mechanical & MX Master 3S" %}

I'm now using an [MX Mechanical](https://www.logitech.com/en-us/products/keyboards/mx-mechanical.html) with tactile quiet keys and an [MX Master 3S](https://www.logitech.com/en-us/products/mice/mx-master-3s.910-006556.html) mouse. This has been great because I enjoy the mouse gestures that the MX Master 3S provides on my work MacBook. Using these gestures, I can easily switch between open applications and desktops without reaching for the keyboard and remembering the keys to press.

Reducing the number of USB devices from two Lightspeed receivers to a single Logi Bolt receiver was a nice bonus.

The problem with Logitech is that they don't provide software or drivers for Linux. I need the ability to install and use Logi Options+, which allows you to configure the keyboard and mouse buttons.

Luckily, [Solaar](https://pwr-solaar.github.io/Solaar/) is available for Linux users to manage Logitech keyboards and mice that connect with USB Unifying, Bolt, Lightspeed, or Nano receivers. I previously used Solaar with the G613 and G603, but only for the battery indicators.

## Configuring the MX Mechanical

Solaar allows you to view the battery level and monitor the status of the wireless link between the keyboard and the computer.

I've enabled the keyboard backlight illumination and changed the `Fx` keys to use the special functions by default.

## Configuring the MX Master 3S

There are only three gestures that I need to configure on my mouse to make me feel productive:

- Move to the workspace above
- Move to the workspace below
- Show workspaces

To do this, I had to create three user-defined rules:

Move to workspace above

- Mouse Gesture: Mouse Up
- Key press: `Super_L` + `Control_L` + `Up`

Move to the workspace below

- Mouse Gesture: Mouse Down
- Key press: `Super_L` + `Control_L` + `Down`

Show workspaces

- Mouse Gesture: Mouse Left
- Key press: `Super_L` + `d`

I tried having "show workspaces" by just pressing the gesture button, but this confused the switching between workspaces gestures, so I settled for a slight left movement to show the workspaces and open applications.

That's all I've explored so far, and it suits my purposes perfectly.