#!/bin/bash
COUNTER=0
while [  $COUNTER -lt 25 ]; do cat cases.json | jq ".[$COUNTER]" > $COUNTER.json; echo The counter is $COUNTER; let COUNTER=COUNTER+1 ; done
