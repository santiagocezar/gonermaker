FROM base

COPY fury.repo /etc/yum.repos.d/fury.repo
COPY fury-nushell.repo /etc/yum.repos.d/fury-nushell.repo

RUN --mount=type=cache,dst=/var/cache \
    --mount=type=cache,dst=/var/log \
    --mount=type=tmpfs,dst=/tmp \
    dnf config-manager setopt install_weak_deps=False && \
    dnf config-manager addrepo --from-repofile=https://cli.github.com/packages/rpm/gh-cli.repo && \
    dnf update -y && \
    dnf install -y git just nushell zoxide carapace-bin direnv neovim gh ripgrep bash-completion && \
    true

ENV SHELL=/usr/bin/nu
