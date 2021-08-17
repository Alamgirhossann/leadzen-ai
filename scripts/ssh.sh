#!/bin/bash

REMOTE_SERVER="ubuntu@3.109.59.177"
PEM_FILE="linux2-pinaki.pem"

ssh -i $PEM_FILE $REMOTE_SERVER