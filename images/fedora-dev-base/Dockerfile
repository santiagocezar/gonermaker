FROM base

COPY fury.repo /etc/yum.repos.d/fury.repo

RUN \
    dnf config-manager setopt install_weak_deps=False && \
    dnf config-manager addrepo --from-repofile=https://cli.github.com/packages/rpm/gh-cli.repo && \
    dnf copr enable -y atim/nushell && \
    dnf update -y && \
    dnf install -y git just nushell zoxide carapace-bin direnv neovim gh ripgrep bash-completion && \
    true

ENV SHELL=/usr/bin/nu