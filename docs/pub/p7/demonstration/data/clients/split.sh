#!/bin/bash
COUNTER=0
while [  $COUNTER -lt 251 ]; do cat clients.json | jq ".[$COUNTER]" > $COUNTER.json; echo The counter is $COUNTER; let COUNTER=COUNTER+1 ; done
