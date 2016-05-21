FROM java:openjdk-8u72

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    unzip \
    maven \
    && rm -rf /var/lib/apt/lists/*

RUN adduser -disabled-password --gecos '' app
WORKDIR /home/app