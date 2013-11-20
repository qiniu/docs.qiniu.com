#!/bin/sh
for file in ./*
do
	if test -d $file;then
		# echo $file;
		# cd $file;
		# if test -f mycp.sh;then
		# 	rm -r mycp.sh
		# fi
		cp put.markdown "$file/index.markdown"
		#cp mycp.sh $file
		#echo $file 是目录
	fi
done
