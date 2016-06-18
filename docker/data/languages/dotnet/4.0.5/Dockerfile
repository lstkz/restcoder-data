FROM mono:4.0.5.1

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN adduser -disabled-password --gecos '' app
WORKDIR /home/app