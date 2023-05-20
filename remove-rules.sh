#!/bin/bash

session_ports=("6672" "61455" "61456" "61457" "61458")
ports=("--sport" "--dport")
targets=("INPUT" "OUTPUT")

ADD_RULE="-D"
PROTOCOL="-p udp"
REJECT="-j REJECT"

for target in ${targets[@]};do
	for session_port in ${session_ports[@]};do
		for port in ${ports[@]};do
			echo "iptables ${ADD_RULE} ${target} ${PROTOCOL} ${port} ${session_port} ${REJECT}"
			sudo sh -c "iptables ${ADD_RULE} ${target} ${PROTOCOL} ${port} ${session_port} ${REJECT}"
		done
	done
done
