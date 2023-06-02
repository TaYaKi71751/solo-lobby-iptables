#!/bin/bash
#
SHELL_RUN_COMMANDS=`find ~ -maxdepth 1 -name '.*shrc'`
for shrc in ${SHELL_RUN_COMMANDS[@]};do
	source ${shrc}
done

source ./add-rules.sh
source ./remove-rules.sh
