#!/usr/bin/env node

import { image, pull, distrobox, createVessel } from './gonermaker/index.js'

const images = pull ("ghcr.io/ublue-os/fedora-toolbox:latest", [
    image ("fedora-dev-base", [
        image ("fedora-node", [
            distrobox(),
        ]),
        image ("fedora-c-base", [
            distrobox(),
            image ("fedora-kf6", [
                distrobox()
            ])
        ]),
    ])
])

await createVessel(images)