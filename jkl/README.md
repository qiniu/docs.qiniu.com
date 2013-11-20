## Introduction

**jkl** is a static site generator written in [Go](http://www.golang.org),
based on [Jekyll](https://github.com/mojombo/jekyll)

[![Build Status](https://drone.io/github.com/why404/jkl/status.png)](https://drone.io/github.com/why404/jkl/latest)

Notable similarities between jkl and Jekyll:

* Directory structure
* Use of YAML front matter in Pages and Posts
* Availability of `site`, `content`, `page` and `posts` variables in templates
* Copies all static files into destination directory

Notable differences between jkl and Jekyll:

* Uses [Go templates](http://www.golang.org/pkg/text/template)
* Only supports YAML front matter in markup files
* No plugin support

Additional features:

* Deploy to [Qiniu Cloud Storage](http://www.qiniu.com/)
* Deploy to [Amazon S3](http://aws.amazon.com/s3/)

Sites built with jkl:

* Drone.io Documentation: <http://docs.drone.io>
* Drone.io Blog: <http://blog.drone.io>
* Qiniu Cloud Storage Documentation: <http://docs.qiniu.com>

Source of above sites:

* <https://github.com/drone/docs.drone.io>
* <https://github.com/drone/blog.drone.io>
* <https://github.com/qiniu/docs.qiniu.com>


## Installation

You can select the binary distribution that matches your operating system and processor architecture as bellow.

* Mac OS X 64-bit [zip](http://gojkl.b1.qiniudn.com/jkl-darwin-amd64.zip) [tar.gz](http://gojkl.b1.qiniudn.com/jkl-darwin-amd64.tar.gz)
* Mac OS X 32-bit [zip](http://gojkl.b1.qiniudn.com/jkl-darwin-386.zip) [tar.gz](http://gojkl.b1.qiniudn.com/jkl-darwin-386.tar.gz)
* Linux 64-bit [zip](http://gojkl.b1.qiniudn.com/jkl-linux-amd64.zip) [tar.gz](http://gojkl.b1.qiniudn.com/jkl-linux-amd64.tar.gz)
* Linux 32-bit [zip](http://gojkl.b1.qiniudn.com/jkl-linux-386.zip) [tar.gz](http://gojkl.b1.qiniudn.com/jkl-linux-386.tar.gz)
* FreeBSD 64-bit [zip](http://gojkl.b1.qiniudn.com/jkl-freebsd-amd64.zip) [tar.gz](http://gojkl.b1.qiniudn.com/jkl-freebsd-amd64.tar.gz)
* FreeBSD 32-bit [zip](http://gojkl.b1.qiniudn.com/jkl-freebsd-386.zip) [tar.gz](http://gojkl.b1.qiniudn.com/jkl-freebsd-386.tar.gz)
* Windows 64-bit [zip](http://gojkl.b1.qiniudn.com/jkl-windows-amd64.zip) [tar.gz](http://gojkl.b1.qiniudn.com/jkl-windows-amd64.tar.gz)
* Windows 32-bit [zip](http://gojkl.b1.qiniudn.com/jkl-windows-386.zip) [tar.gz](http://gojkl.b1.qiniudn.com/jkl-windows-386.tar.gz)

If you want to install from source you should [install the Go tools](http://golang.org/doc/install) first.

In order to compile with `go build` you will first need to download
the following dependencies(be sure you have already set the `GOPATH` environment variable):

```
go get github.com/qiniu/bytes
go get github.com/qiniu/rpc
go get github.com/qiniu/api
go get github.com/russross/blackfriday
go get github.com/howeyc/fsnotify
go get launchpad.net/goyaml
go get launchpad.net/gocheck
go get launchpad.net/goamz/aws
go get launchpad.net/goamz/s3
```

Compile it form source

```
git clone git://github.com/why404/jkl.git
cd jkl
go build
```

Once you have compiled or downloaded `jkl` you can install with the following command:

```
sudo mv ./jkl /usr/local/bin
sudo chmod +x /usr/local/bin/jkl
```

## Usage

```
Usage: jkl [OPTION]... [SOURCE]

      --auto                re-generates the site when files are modified
      --base-url            serve website from a given base URL
      --source              changes the dir where Jekyll will look to transform files
      --destination         changes the dir where Jekyll will write files to
      --server              starts a server that will host your _site directory
      --port                changes the port that the Jekyll server will run on
      --s3                  copies the _site directory to s3
      --s3-config           path to the _jekyll_s3.yml file that specifies your AWS key, secret and bucket
      --s3-key              aws access key use for s3 authentication
      --s3-secret           aws secret key use for s3 authentication
      --s3-bucket           name of the s3 bucket
      --qiniu               copies the _site directory to Qiniu Cloud Storage
      --qiniu-config        path to the _jekyll_qiniu.yml file that specifies your Qiniu key, secret and bucket
      --qiniu-key           access key use for qiniu authentication
      --qiniu-secret        secret key use for qiniu authentication
      --qiniu-bucket        name of the qiniu bucket

  -v, --verbose             runs jkl with verbose output
  -h, --help                display this help and exit

Examples:
  jkl                       generates site from current working directory
  jkl /path/to/site         generates site from source dir /path/to/site
  jkl --server              generates site and serves at localhost:4000
  jkl --server --port=:4567 generates site and serves at localhost:4567
  jkl --s3 --verbose        copies the _site directory to s3
  jkl --qiniu --verbose     copies the _site directory to Qiniu Cloud Storage
```

## Auto Generation

If you are running the website in server mode, with the `--server` flag, you can
also instruct `jkl` to auto-recompile you website by adding the `--auto` flag.

## Deploy to Qiniu Cloud Storage

In order to deploy to [Qiniu Cloud Storage](http://www.qiniu.com/) you must include a `_jekyll_qiniu.yml` file that specifies your Qiniu key, secret and bucket:

```
access_key: YOUR_QINIU_ACCESS_KEY
secret_key: YOUR_QINIU_SECRET_KEY
bucket: YOUR_QINIU_BUCKET
```

If the `_jekyll_qiniu.yml` file in your site's root directory, you can run 

```
jkl --qiniu
```
otherwise, run this:

```
jkl --qiniu --qiniu-config=/path/to/_jekyll_qiniu.yml
```

If you do not want to use the config file, you can do it as the following command:

```
jkl --qiniu \ 
    --qiniu-key=YOUR_QINIU_ACCESS_KEY \
    --qiniu-secret=YOUR_QINIU_SECRET_KEY \
    --qiniu-bucket=YOUR_QINIU_BUCKET
```

Runs **jkl** with verbose output you can use the `--verbose` option.


### Deploy to Amazon S3

If you want to deploy to [Amazon S3](http://aws.amazon.com/s3/) you must include a `_jekyll_s3.yml` file that specifies your AWS key, secret and bucket:

```
s3_id: YOUR_AWS_S3_ACCESS_KEY_ID
s3_secret: YOUR_AWS_S3_SECRET_ACCESS_KEY
s3_bucket: YOUR_AWS_S3_BUCKET
```
If the `_jekyll_s3.yml` file in your site's root directory, you can run 

```
jkl --s3
```
otherwise, run this:

```
jkl --s3 --s3-config=/path/to/_jekyll_s3.yml
```

If you do not want to use the config file, you can do it as the following command:

```
jkl --s3 \ 
    --s3-key=YOUR_AWS_S3_ACCESS_KEY_ID \
    --s3-secret=YOUR_AWS_S3_SECRET_ACCESS_KEY \
    --s3-bucket=YOUR_AWS_S3_BUCKET
```

Runs **jkl** with verbose output you can use the `--verbose` option.


## Documentation

See the official [Jekyll wiki](https://github.com/mojombo/jekyll/wiki)
... just remember that you are using Go templates instead of Liquid templates.

