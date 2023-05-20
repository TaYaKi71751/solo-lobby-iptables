#!/bin/bash

function remove_rules(){
session_ports=("6672" "61455" "61456" "61457" "61458")
ports=("--sport" "--dport")
targets=("INPUT" "OUTPUT")

RULE_HANDLE="-D"
PROTOCOL="-p udp"
REJECT="-j REJECT"

	IPTABLES_SAVE=`sudo iptables-save`
	for session_port in ${session_ports[@]};do
		for port in ${ports[@]};do
			for target in ${targets[@]};do
				BREAK=false
				while [ true ];do
					echo "iptables ${RULE_HANDLE} ${target} ${PROTOCOL} ${port} ${session_port} ${REJECT}"
					sudo iptables ${RULE_HANDLE} ${target} ${PROTOCOL} ${port} ${session_port} ${REJECT} || break
				done
			done
		done
	done
}

remove_rules
