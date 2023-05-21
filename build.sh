#!/bin/bash

targets=("add-rules" "remove-rules" "enable-iptables" "disable-iptables" "apply-rules-once")

which shc || (\
	echo "Install shc ( https://github.com/neurobin/shc )" && \
	exit 1
)

for target in ${targets[@]};do
	echo "shc -f ${target}.sh -o ${target}"
	shc -f ${target}.sh -o ${target}.out
done
