all:
	#成生菜单所需的json文件
	./_genMenu docs/v6/api/overview > _data/apiview.json 
	./_genMenu docs/v6/api/reference > _data/apiref.json 
	./_genMenu docs/v6/tutorial > _data/guide.json 
	./_genMenu docs/v6/kb > _data/kb.json 
fc:
	#分词索引
	./_jkl --plugin 'fc _dictionary.txt static/js/fc.js' --server
	


test: all
	./_jkl --server

install: 
	./_jkl --qiniu-config _jekyll_qiniu.yml --plugin 'fc _dictionary.txt static/js/fc.js' --qiniu --verbose
	@echo

clean:
	rm -rf _site
