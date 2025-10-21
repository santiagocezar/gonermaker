FROM base

RUN --mount=type=cache,dst=/var/cache \
    --mount=type=cache,dst=/var/log \
    --mount=type=tmpfs,dst=/tmp \
    dnf install -y @kf6-software-development plasma-devel plasma-workspace-devel plasma-activities-devel && \
    true
