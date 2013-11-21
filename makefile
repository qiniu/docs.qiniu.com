all:
	#成生菜单所需的json文件
	./genMenu api/overview > _data/apiview.json 
	./genMenu api/reference > _data/apiref.json 
	./jkl --qiniu-config _jekyll_qiniu.yml  --qiniu --verbose

test:
	./jkl --server

install: all
	@echo

clean:
	rm -rf _site
