FROM base

ARG USER
ARG UID=1000
ARG GID=1000
ARG NEW_UID=$UID
ARG NEW_GID=$GID

RUN if ! grep "${USER}" /etc/group >/dev/null 2>&1;then sudo groupadd -g ${NEW_GID} ${USER};fi

# Ensure passwordless sudo is set up for user

RUN if ! grep "${USER}" /etc/passwd >/dev/null 2>&1; \
then \
sudo useradd -g ${NEW_GID} -u ${NEW_UID} ${USER}; \
sudo usermod -aG wheel ${USER}; \
printf "%s ALL=(ALL:ALL) NOPASSWD: ALL\n" "${USER}" >> /etc/sudoers; \
fi

# Uncomment and move into 'RUN if' above to troubleshoot
# ls -l /etc/sudoers; \
# cat /etc/sudoers; \
# id ${USER}; \
#

RUN \
    sudo echo '/bin/nu' | sudo tee -a /etc/shells; \
    sudo usermod -s /bin/nu ${USER};

RUN touch /etc/passwd.done

USER ${NEW_UID}:${NEW_GID}
WORKDIR /var/home/${USER}