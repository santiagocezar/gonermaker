FROM base

ARG bun_checksum=sha256:c3d3c14e9a5ec83ff67d0acfe76e4315ad06da9f34f59fc7b13813782caf1f66
ARG bun_version=v1.2.19
ARG bun_target=linux-x64

ADD --checksum=${bun_checksum} \
    https://github.com/oven-sh/bun/releases/download/bun-${bun_version}/bun-${bun_target}.zip \
    /tmp/bun.zip

RUN \
    unzip -joqd /usr/local/bin /tmp/bun.zip && \
    rm /tmp/bun.zip && \
    ln -s /usr/local/bin/bun /usr/local/bin/bunx && \
    true

RUN --mount=type=cache,dst=/var/cache \
    --mount=type=cache,dst=/var/log \
    --mount=type=tmpfs,dst=/tmp \
    dnf install -y nodejs pnpm && \
    true
