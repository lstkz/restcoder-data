#!/usr/bin/env bash

sudo add-apt-repository -y ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install -y openjdk-8-jdk
sudo update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java 
sudo update-alternatives --set javac /usr/lib/jvm/java-8-openjdk-amd64/bin/javac
sudo apt-get purge maven maven2 maven3
sudo apt-add-repository -y ppa:andrei-pozolotin/maven3
sudo apt-get update
sudo apt-get install -y maven3
