#!/bin/bash

declare -a doc_lists
doc_lists=("docs.qiniu.com" "apidoc" "c-sdk" "php-sdk" "csharp-sdk" "android-sdk" "ios-sdk" "python-sdk" "ruby-sdk" "java-sdk" "nodejs-sdk" "go-sdk")

if [ $# != 1 ]; then
    echo "./update-qiniu-docs.sh <repo-name>"
    exit 1
fi

if [ $1 == "docs.qiniu.com" ]; then
    for doc in ${doc_lists[@]}
    do
        if [ $doc == "docs.qiniu.com" ]; then
            # ./_doc-update.py --user icattlecoder --repo $doc --branch feature_qrsbox
            ./_doc-update.py --user qiniu --repo $doc --branch develop
    	elif [ $doc == "apidoc" ]; then
            #./_doc-update.py --user icattlecoder --repo $doc --branch feature_resumble_up
            #./_doc-update.py --user coaku --repo $doc --branch gen_use_demo_1
            ./_doc-update.py --user qiniu --repo $doc --branch develop
        else
            ./_doc-update.py --user qiniu --repo $doc --branch develop
        fi
    done
else
    if [ $1 == "apidoc" ]; then
        ./_doc-update.py --user icattlecoder --repo $1 --branch fix_resumble_up_api
    else
        ./_doc-update.py --user qiniu --repo $1 --branch develop
    fi
fi
