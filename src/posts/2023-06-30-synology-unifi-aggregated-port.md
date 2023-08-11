---
title: Network link aggregation on Synology and Unifi
description: My notes on creating a bonded interface for link aggregation on a Unifi switch and Synology NAS.
tags: [technology, guides, linux]
date: 2023-06-30
---

The [Synology DS923+](/posts/synology-ds923/) features two RJ-45 1GbE LAN Ports allowing link aggregation or fail-over support. My switch (Unifi US-16-150W) supports this, so I went ahead and configured it. These are my notes for future reference and for anyone else who happens across this page.

## Synology

* **Control Panel** > **Network** > **Network Interface**. Click **Create** > **Create Bond**.
* Select IEEE 802.3ad Dynamic Link Aggregation.
* Select the interfaces to create Link Aggregation.
* Configure the IP settings by entering the **IP address**, **subnet mask**, and **gateway**.
* Click **apply** to save the changes.
* The new interface **Bond 1** will be displayed the **Network Interface** list.

{% imagePlaceholder "./src/assets/images/posts/2023-06-30-synology-bonded-interface.png", "A screenshot showing the newly created interface Bond 1 in the Synology DSM control panel." %}

## Unifi switch

* **Unifi Devices** > Select **Switch (US-16-150W)** > **Ports** > **Port Manager**
* Select port that LAN1 on the Synology is connected to.
* **Advanced** > **Manual** > Set Operation to **Aggregate**.
* Select the port that LAN2 on the SYnology is connected.
* Leave Link Speed set to **Auto-negotiate**
* Click **Apply Changes** to save the changes.

{% imagePlaceholder "./src/assets/images/posts/2023-06-30-unifi-aggregated-ports.png", "A screenshot showing ports 15 and 16 in aggregation mode on a Unifi US-16-150W network switch." %}

With Link Aggregation enabled, the network traffic will be automatically adjusted and balanced for each connected device. It doesn't increase the bandwidth per device beyond the 110 MB/s over Gigabit ethernet. However, multiple concurrent users can achieve higher bandwidth by utilising both ethernet links simultaneously.