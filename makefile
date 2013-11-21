all:
	#成生菜单所需的json文件
	./_genMenu api/overview > _data/apiview.json 
	./_genMenu api/reference > _data/apiref.json 
	./_genMenu guide > _data/guide.json 

test: all
	./_jkl --server

install: 
	./_jkl --qiniu-config _jekyll_qiniu.yml  --qiniu --verbose
	@echo

clean:
	rm -rf _site
