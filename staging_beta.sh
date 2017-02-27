#!/usr/bin/env bash
set -e
# Any subsequent(*) commands which fail will cause the shell script to exit immediately

id="[Staging Script]"

rsync -rv --progress --partial dist/ water:~/staging_jakecoppinger/
