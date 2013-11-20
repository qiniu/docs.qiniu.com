package main

import (
	"io/ioutil"
	"launchpad.net/goyaml"
)

// Config represents the key-value pairs in a _config.yml file.
// The file is freeform, and thus requires the flexibility of a map.
type Config map[string]interface{}

// Sets a parameter value.
func (c Config) Set(key string, val interface{}) {
	c[key] = val
}

// Gets a parameter value.
func (c Config) Get(key string) interface{} {
	return c[key]
}

// Gets a parameter value as a string. If none exists return an empty string.
func (c Config) GetString(key string) (str string) {
	if v, ok := c[key]; ok {
		str = v.(string)
	}
	return
}

// ParseConfig will parse a YAML file at the given path and return
// a key-value Config structure.
//
// ParseConfig always returns a non-nil map containing all the
// valid YAML parameters found; err describes the first unmarshalling
// error encountered, if any.
func ParseConfig(path string) (Config, error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}
	return parseConfig(b)
}

func parseConfig(data []byte) (Config, error) {
	conf := map[string]interface{}{}
	err := goyaml.Unmarshal(data, &conf)
	if err != nil {
		return nil, err
	}

	return conf, nil
}

// DeployConfig represents the key-value data in the _jekyll_s3.yml file
// used for deploying a website to Amazon's S3.
type DeployS3Config struct {
	Key    string `s3_id`
	Secret string `s3_secret`
	Bucket string `s3_bucket`
}

// DeployConfig represents the key-value data in the _jekyll_qiniu.yml file
// used for deploying a website to QiniuCloudStorage.
type Deploy76Config struct {
	Key    string `access_key`
	Secret string `secret_key`
	Bucket string `bucket`
}

// ParseDeployConfig will parse a YAML file at the given path and return
// a key-value DeployConfig structure.

func ParseDeployS3Config(path string) (*DeployS3Config, error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}
	conf := DeployS3Config{}
	err = goyaml.Unmarshal(b, &conf)
	if err != nil {
		return nil, err
	}

	return &conf, nil
}

func ParseDeploy76Config(path string) (*Deploy76Config, error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}
	conf := Deploy76Config{}
	err = goyaml.Unmarshal(b, &conf)
	if err != nil {
		return nil, err
	}
	return &conf, nil
}
