


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=10">
        <title>php-sdk/docs/README.md at master · qiniu/php-sdk · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <link rel="logo" type="image/svg" href="https://github-media-downloads.s3.amazonaws.com/github-logo.svg" />
    <meta property="og:image" content="https://github.global.ssl.fastly.net/images/modules/logos_page/Octocat.png">
    <meta name="hostname" content="github-fe128-cp1-prd.iad.github.net">
    <meta name="ruby" content="ruby 1.9.3p194-tcs-github-tcmalloc (e1c0c3f392) [x86_64-linux]">
    <link rel="assets" href="https://github.global.ssl.fastly.net/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035/">
    <link rel="xhr-socket" href="/_sockets" />
    


    <meta name="msapplication-TileImage" content="/windows-tile.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="selected-link" value="repo_source" data-pjax-transient />
    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="B4A8221A:7395:5547424:52A149F7" name="octolytics-dimension-request_id" />
    

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="+7xfAQyxjKCrKnw2ngUlO7oNe9FdMwrJoX+4jnpbLz0=" name="csrf-token" />

    <link href="https://github.global.ssl.fastly.net/assets/github-95d7006755542e644a6361c96eb6e209141209dc.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://github.global.ssl.fastly.net/assets/github2-e8fd7fa97473f42d491037924a76d9c2fb4726ff.css" media="all" rel="stylesheet" type="text/css" />
    

    

      <script src="https://github.global.ssl.fastly.net/assets/frameworks-5970f5a0a3dcc441d5f7ff74326ffd59bbe9388e.js" type="text/javascript"></script>
      <script src="https://github.global.ssl.fastly.net/assets/github-42e9793d7b64149e1866ac95052d9a1054cc6dc6.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="b70f199f9889699d5def9992f0a26438">

        <link data-pjax-transient rel='permalink' href='/qiniu/php-sdk/blob/dbf237ff37710ddd17414061c62d5e872fa65234/docs/README.md'>
  <meta property="og:title" content="php-sdk"/>
  <meta property="og:type" content="githubog:gitrepository"/>
  <meta property="og:url" content="https://github.com/qiniu/php-sdk"/>
  <meta property="og:image" content="https://github.global.ssl.fastly.net/images/gravatars/gravatar-user-420.png"/>
  <meta property="og:site_name" content="GitHub"/>
  <meta property="og:description" content="php-sdk - Qiniu Resource (Cloud) Storage SDK for PHP"/>

  <meta name="description" content="php-sdk - Qiniu Resource (Cloud) Storage SDK for PHP" />

  <meta content="1563636" name="octolytics-dimension-user_id" /><meta content="qiniu" name="octolytics-dimension-user_login" /><meta content="9497044" name="octolytics-dimension-repository_id" /><meta content="qiniu/php-sdk" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="9497044" name="octolytics-dimension-repository_network_root_id" /><meta content="qiniu/php-sdk" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/qiniu/php-sdk/commits/master.atom" rel="alternate" title="Recent Commits to php-sdk:master" type="application/atom+xml" />

  </head>


  <body class="logged_out  env-production  vis-public page-blob">
    <div class="wrapper">
      
      
      
      


      
      <div class="header header-logged-out">
  <div class="container clearfix">

    <a class="header-logo-wordmark" href="https://github.com/">
      <span class="mega-octicon octicon-logo-github"></span>
    </a>

    <div class="header-actions">
        <a class="button primary" href="/join">Sign up</a>
      <a class="button signin" href="/login?return_to=%2Fqiniu%2Fphp-sdk%2Fblob%2Fmaster%2Fdocs%2FREADME.md">Sign in</a>
    </div>

    <div class="command-bar js-command-bar  in-repository">

      <ul class="top-nav">
          <li class="explore"><a href="/explore">Explore</a></li>
        <li class="features"><a href="/features">Features</a></li>
          <li class="enterprise"><a href="https://enterprise.github.com/">Enterprise</a></li>
          <li class="blog"><a href="/blog">Blog</a></li>
      </ul>
        <form accept-charset="UTF-8" action="/search" class="command-bar-form" id="top_search_form" method="get">

<input type="text" data-hotkey="/ s" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" autocapitalize="off"
    
    
      data-repo="qiniu/php-sdk"
      data-branch="master"
      data-sha="8d5679eaefa0240bcd7aa36f1fb51e472ee9810b"
  >

    <input type="hidden" name="nwo" value="qiniu/php-sdk" />

    <div class="select-menu js-menu-container js-select-menu search-context-select-menu">
      <span class="minibutton select-menu-button js-menu-target">
        <span class="js-select-button">This repository</span>
      </span>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container">
        <div class="select-menu-modal">

          <div class="select-menu-item js-navigation-item js-this-repository-navigation-item selected">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" class="js-search-this-repository" name="search_target" value="repository" checked="checked" />
            <div class="select-menu-item-text js-select-button-text">This repository</div>
          </div> <!-- /.select-menu-item -->

          <div class="select-menu-item js-navigation-item js-all-repositories-navigation-item">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" name="search_target" value="global" />
            <div class="select-menu-item-text js-select-button-text">All repositories</div>
          </div> <!-- /.select-menu-item -->

        </div>
      </div>
    </div>

  <span class="octicon help tooltipped downwards" title="Show command bar help">
    <span class="octicon octicon-question"></span>
  </span>


  <input type="hidden" name="ref" value="cmdform">

</form>
    </div>

  </div>
</div>


      


          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        

<ul class="pagehead-actions">


  <li>
    <a href="/login?return_to=%2Fqiniu%2Fphp-sdk"
    class="minibutton with-count js-toggler-target star-button tooltipped upwards"
    title="You must be signed in to use this feature" rel="nofollow">
    <span class="octicon octicon-star"></span>Star
  </a>

    <a class="social-count js-social-count" href="/qiniu/php-sdk/stargazers">
      14
    </a>

  </li>

    <li>
      <a href="/login?return_to=%2Fqiniu%2Fphp-sdk"
        class="minibutton with-count js-toggler-target fork-button tooltipped upwards"
        title="You must be signed in to fork a repository" rel="nofollow">
        <span class="octicon octicon-git-branch"></span>Fork
      </a>
      <a href="/qiniu/php-sdk/network" class="social-count">
        22
      </a>
    </li>
</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="repo-label"><span>public</span></span>
          <span class="mega-octicon octicon-repo"></span>
          <span class="author">
            <a href="/qiniu" class="url fn" itemprop="url" rel="author"><span itemprop="title">qiniu</span></a>
          </span>
          <span class="repohead-name-divider">/</span>
          <strong><a href="/qiniu/php-sdk" class="js-current-repository js-repo-home-link">php-sdk</a></strong>

          <span class="page-context-loader">
            <img alt="Octocat-spinner-32" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">

      <div class="repository-with-sidebar repo-container  ">

        <div class="repository-sidebar">
            

<div class="sunken-menu vertical-right repo-nav js-repo-nav js-repository-container-pjax js-octicon-loaders">
  <div class="sunken-menu-contents">
    <ul class="sunken-menu-group">
      <li class="tooltipped leftwards" title="Code">
        <a href="/qiniu/php-sdk/tree/master" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-gotokey="c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_tags repo_branches /qiniu/php-sdk/tree/master">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped leftwards" title="Issues">
          <a href="/qiniu/php-sdk/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-gotokey="i" data-selected-links="repo_issues /qiniu/php-sdk/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class='counter'>5</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped leftwards" title="Pull Requests">
        <a href="/qiniu/php-sdk/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-gotokey="p" data-selected-links="repo_pulls /qiniu/php-sdk/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class='counter'>3</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


    </ul>
    <div class="sunken-menu-separator"></div>
    <ul class="sunken-menu-group">

      <li class="tooltipped leftwards" title="Pulse">
        <a href="/qiniu/php-sdk/pulse" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="pulse /qiniu/php-sdk/pulse">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Graphs">
        <a href="/qiniu/php-sdk/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_graphs repo_contributors /qiniu/php-sdk/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Network">
        <a href="/qiniu/php-sdk/network" aria-label="Network" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-selected-links="repo_network /qiniu/php-sdk/network">
          <span class="octicon octicon-git-branch"></span> <span class="full-word">Network</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
    </ul>


  </div>
</div>

            <div class="only-with-full-nav">
              

  

<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><strong>HTTPS</strong> clone URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="https://github.com/qiniu/php-sdk.git" readonly="readonly">

    <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/qiniu/php-sdk.git" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>

  

<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><strong>Subversion</strong> checkout URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="https://github.com/qiniu/php-sdk" readonly="readonly">

    <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/qiniu/php-sdk" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <span class="octicon help tooltipped upwards" title="Get help on which URL is right for you.">
    <a href="https://help.github.com/articles/which-remote-url-should-i-use">
    <span class="octicon octicon-question"></span>
    </a>
  </span>
</p>



              <a href="/qiniu/php-sdk/archive/master.zip"
                 class="minibutton sidebar-button"
                 title="Download this repository as a zip file"
                 rel="nofollow">
                <span class="octicon octicon-cloud-download"></span>
                Download ZIP
              </a>
            </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          


<!-- blob contrib key: blob_contributors:v21:2d79c81aa1853ada2ba8ef17db2e98ff -->

<p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

<a href="/qiniu/php-sdk/find/master" data-pjax data-hotkey="t" class="js-show-file-finder" style="display:none">Show File Finder</a>

<div class="file-navigation">
  

<div class="select-menu js-menu-container js-select-menu" >
  <span class="minibutton select-menu-button js-menu-target" data-hotkey="w"
    data-master-branch="develop"
    data-ref="master"
    role="button" aria-label="Switch branches or tags" tabindex="0">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax>

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-remove-close js-menu-close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/blob/develop/docs/README.md"
                 data-name="develop"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="develop">develop</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/blob/master/docs/README.md"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/tree/v6.1.4/docs/README.md"
                 data-name="v6.1.4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v6.1.4">v6.1.4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/tree/v6.1.3/docs/README.md"
                 data-name="v6.1.3"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v6.1.3">v6.1.3</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/tree/v6.1.2/docs/README.md"
                 data-name="v6.1.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v6.1.2">v6.1.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/tree/v6.1.1/docs/README.md"
                 data-name="v6.1.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v6.1.1">v6.1.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/tree/v6.1.0/docs/README.md"
                 data-name="v6.1.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v6.1.0">v6.1.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/tree/v6.0.2/docs/README.md"
                 data-name="v6.0.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v6.0.2">v6.0.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/tree/v6.0.1/docs/README.md"
                 data-name="v6.0.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v6.0.1">v6.0.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/php-sdk/tree/v6.0.0/docs/README.md"
                 data-name="v6.0.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v6.0.0">v6.0.0</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/qiniu/php-sdk/tree/master" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">php-sdk</span></a></span></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/qiniu/php-sdk/tree/master/docs" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">docs</span></a></span><span class="separator"> / </span><strong class="final-path">README.md</strong> <span class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="docs/README.md" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>


  <div class="commit commit-loader file-history-tease js-deferred-content" data-url="/qiniu/php-sdk/contributors/master/docs/README.md">
    Fetching contributors…

    <div class="participation">
      <p class="loader-loading"><img alt="Octocat-spinner-32-eaf2f5" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32-EAF2F5.gif" width="16" /></p>
      <p class="loader-error">Cannot retrieve contributors at this time</p>
    </div>
  </div>

<div id="files" class="bubble">
  <div class="file">
    <div class="meta">
      <div class="info">
        <span class="icon"><b class="octicon octicon-file-text"></b></span>
        <span class="mode" title="File Mode">file</span>
          <span>425 lines (307 sloc)</span>
        <span>15.693 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
              <a class="minibutton disabled tooltipped leftwards" href="#"
                 title="You must be signed in to make or propose changes">Edit</a>
          <a href="/qiniu/php-sdk/raw/master/docs/README.md" class="button minibutton " id="raw-url">Raw</a>
            <a href="/qiniu/php-sdk/blame/master/docs/README.md" class="button minibutton ">Blame</a>
          <a href="/qiniu/php-sdk/commits/master/docs/README.md" class="button minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->
          <a class="minibutton danger disabled empty-icon tooltipped leftwards" href="#"
             title="You must be signed in and on a branch to make or propose changes">
          Delete
        </a>
      </div><!-- /.actions -->

    </div>
      
  <div id="readme" class="blob instapaper_body">
    <article class="markdown-body entry-content" itemprop="mainContentOfPage"><table data-table-type="yaml-metadata">
<thead><tr>
<th>title</th>
  </tr></thead>
<tbody><tr>
<td><div>PHP SDK</div></td>
  </tr></tbody>
</table><p>此 SDK 适用于 PHP 5.1.0 及其以上版本。基于 <a href="http://docs.qiniu.com">七牛云存储官方API</a> 构建。使用此 SDK 构建您的网络应用程序，能让您以非常便捷地方式将数据安全地存储到七牛云存储上。无论您的网络应用是一个网站程序，还是包括从云端（服务端程序）到终端（手持设备应用）的架构的服务或应用，通过七牛云存储及其 SDK，都能让您应用程序的终端用户高速上传和下载，同时也让您的服务端更加轻盈。</p>

<p>SDK源码地址：<a href="https://github.com/qiniu/php-sdk/tags">https://github.com/qiniu/php-sdk/tags</a></p>

<ul>
<li>
<a href="#install">应用接入</a>

<ul>
<li><a href="#acc-appkey">获取Access Key 和 Secret Key</a></li>
</ul>
</li>
<li>
<a href="#rs-api">资源管理接口</a>

<ul>
<li><a href="#rs-stat">1 查看单个文件属性信息</a></li>
<li><a href="#rs-copy">2 复制单个文件</a></li>
<li><a href="#rs-move">3 移动单个文件</a></li>
<li><a href="#rs-delete">4 删除单个文件</a></li>
</ul>
</li>
<li>
<a href="#get-and-put-api">上传下载接口</a>

<ul>
<li>
<a href="#upload">1 文件上传</a>

<ul>
<li><a href="#io-put-flow">1.1 上传流程</a></li>
<li><a href="#io-put-policy">1.2 上传策略</a></li>
</ul>
</li>
<li>
<a href="#io-download">2 文件下载</a>

<ul>
<li><a href="#public-download">2.1 公有资源下载</a></li>
<li><a href="#private-download">2.2 私有资源下载</a></li>
</ul>
</li>
</ul>
</li>
<li>
<a href="#fop-api">数据处理接口</a>

<ul>
<li>
<a href="#fop-image">1 图像</a>

<ul>
<li><a href="#fop-image-info">1.1 查看图像属性</a></li>
<li><a href="#fop-exif">1.2 查看图片EXIF信息</a></li>
<li><a href="#fop-image-view">1.3 生成图片预览</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#contribution">贡献代码</a></li>
<li><a href="#license">许可证</a></li>
</ul><p><a name="install"></a></p>

<h2>
<a name="%E5%BA%94%E7%94%A8%E6%8E%A5%E5%85%A5" class="anchor" href="#%E5%BA%94%E7%94%A8%E6%8E%A5%E5%85%A5"><span class="octicon octicon-link"></span></a>应用接入</h2>

<p><a name="acc-appkey"></a></p>

<h3>
<a name="1-%E8%8E%B7%E5%8F%96access-key-%E5%92%8C-secret-key" class="anchor" href="#1-%E8%8E%B7%E5%8F%96access-key-%E5%92%8C-secret-key"><span class="octicon octicon-link"></span></a>1. 获取Access Key 和 Secret Key</h3>

<p>要接入七牛云存储，您需要拥有一对有效的 Access Key 和 Secret Key 用来进行签名认证。可以通过如下步骤获得：</p>

<ol>
<li><a href="https://portal.qiniu.com/signup">开通七牛开发者帐号</a></li>
<li>
<a href="https://portal.qiniu.com/setting/key">登录七牛开发者自助平台，查看 Access Key 和 Secret Key</a> 。</li>
</ol><p><a name="rs-api"></a></p>

<h2>
<a name="%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E6%8E%A5%E5%8F%A3" class="anchor" href="#%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E6%8E%A5%E5%8F%A3"><span class="octicon octicon-link"></span></a>资源管理接口</h2>

<p><a name="rs-stat"></a></p>

<h3>
<a name="1%E6%9F%A5%E7%9C%8B%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6%E5%B1%9E%E6%80%A7%E4%BF%A1%E6%81%AF" class="anchor" href="#1%E6%9F%A5%E7%9C%8B%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6%E5%B1%9E%E6%80%A7%E4%BF%A1%E6%81%AF"><span class="octicon octicon-link"></span></a>1.查看单个文件属性信息</h3>

<p>示例代码如下：</p>

<pre><code>require_once("qiniu/rs.php");

$bucket = "phpsdk";
$key = "pic.jpg";
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);
$client = new Qiniu_MacHttpClient(null);

list($ret, $err) = Qiniu_RS_Stat($client, $bucket, $key);
echo "Qiniu_RS_Stat result: \n";
if ($err !== null) {
    var_dump($err);
} else {
    var_dump($ret);
}
</code></pre>

<p><a name="rs-copy"></a></p>

<h3>
<a name="2-%E5%A4%8D%E5%88%B6%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6" class="anchor" href="#2-%E5%A4%8D%E5%88%B6%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6"><span class="octicon octicon-link"></span></a>2. 复制单个文件</h3>

<p>示例代码如下：</p>

<pre><code>require_once("qiniu/rs.php");

$bucket = "phpsdk";
$key = "pic.jpg";
$key1 = "file_name1";
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);
$client = new Qiniu_MacHttpClient(null);

$err = Qiniu_RS_Copy($client, $bucket, $key, $bucket, $key1);
echo "====&gt; Qiniu_RS_Copy result: \n";
if ($err !== null) {
    var_dump($err);
} else {
    echo "Success!";
}
</code></pre>

<p><a name="rs-move"></a></p>

<h3>
<a name="3-%E7%A7%BB%E5%8A%A8%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6" class="anchor" href="#3-%E7%A7%BB%E5%8A%A8%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6"><span class="octicon octicon-link"></span></a>3. 移动单个文件</h3>

<p>示例代码如下：</p>

<pre><code>require_once("qiniu/rs.php");

$bucket = "phpsdk";
$key = "pic.jpg";
$key1 = "file_name1";
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);
$client = new Qiniu_MacHttpClient(null);

$err = Qiniu_RS_Move($client, $bucket, $key, $bucket, $key1);
echo "====&gt; Qiniu_RS_Move result: \n";
if ($err !== null) {
    var_dump($err);
} else {
    echo "Success!";
}
</code></pre>

<p><a name="rs-delete"></a></p>

<h3>
<a name="4-%E5%88%A0%E9%99%A4%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6" class="anchor" href="#4-%E5%88%A0%E9%99%A4%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6"><span class="octicon octicon-link"></span></a>4. 删除单个文件</h3>

<p>示例代码如下：</p>

<pre><code>require_once("qiniu/rs.php");

$bucket = "phpsdk";
$key1 = "file_name1";
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);
$client = new Qiniu_MacHttpClient(null);

$err = Qiniu_RS_Delete($client, $bucket, $key1);
echo "====&gt; Qiniu_RS_Delete result: \n";
if ($err !== null) {
    var_dump($err);
} else {
    echo "Success!";
}
</code></pre>

<p><a name="get-and-put-api"></a></p>

<h2>
<a name="%E4%B8%8A%E4%BC%A0%E4%B8%8B%E8%BD%BD%E6%8E%A5%E5%8F%A3" class="anchor" href="#%E4%B8%8A%E4%BC%A0%E4%B8%8B%E8%BD%BD%E6%8E%A5%E5%8F%A3"><span class="octicon octicon-link"></span></a>上传下载接口</h2>

<p><a name="upload"></a></p>

<h3>
<a name="1-%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0" class="anchor" href="#1-%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0"><span class="octicon octicon-link"></span></a>1. 文件上传</h3>

<p>为了尽可能地改善终端用户的上传体验，七牛云存储首创了客户端直传功能。一般云存储的上传流程是：</p>

<pre><code>客户端（终端用户） =&gt; 业务服务器 =&gt; 云存储服务
</code></pre>

<p>这样多了一次上传的流程，和本地存储相比，会相对慢一些。但七牛引入了客户端直传，将整个上传过程调整为：</p>

<pre><code>客户端（终端用户） =&gt; 七牛 =&gt; 业务服务器
</code></pre>

<p>客户端（终端用户）直接上传到七牛的服务器，通过DNS智能解析，七牛会选择到离终端用户最近的ISP服务商节点，速度会比本地存储快很多。文件上传成功以后，七牛的服务器使用回调功能，只需要将非常少的数据（比如Key）传给应用服务器，应用服务器进行保存即可。</p>

<p><a name="io-put-flow"></a></p>

<h4>
<a name="11%E4%B8%8A%E4%BC%A0%E6%B5%81%E7%A8%8B" class="anchor" href="#11%E4%B8%8A%E4%BC%A0%E6%B5%81%E7%A8%8B"><span class="octicon octicon-link"></span></a>1.1上传流程</h4>

<p>在七牛云存储中，整个上传流程大体分为这样几步：</p>

<ol>
<li>业务服务器颁发 <a href="http://docs.qiniu.com/api/put.html#uploadToken">uptoken（上传授权凭证）</a>给客户端（终端用户）</li>
<li>客户端凭借 <a href="http://docs.qiniu.com/api/put.html#uploadToken">uptoken</a> 上传文件到七牛</li>
<li>在七牛获得完整数据后，发起一个 HTTP 请求回调到业务服务器</li>
<li>业务服务器保存相关信息，并返回一些信息给七牛</li>
<li>七牛原封不动地将这些信息转发给客户端（终端用户）</li>
</ol><p>需要注意的是，回调到业务服务器的过程是可选的，它取决于业务服务器颁发的 <a href="http://docs.qiniu.com/api/put.html#uploadToken">uptoken</a>。如果没有回调，七牛会返回一些标准的信息（比如文件的 hash）给客户端。如果上传发生在业务服务器，以上流程可以自然简化为：</p>

<ol>
<li>业务服务器生成 uptoken（不设置回调，自己回调到自己这里没有意义）</li>
<li>凭借 <a href="http://docs.qiniu.com/api/put.html#uploadToken">uptoken</a> 上传文件到七牛</li>
<li>善后工作，比如保存相关的一些信息</li>
</ol><p>服务端生成 <a href="http://docs.qiniu.com/api/put.html#uploadToken">uptoken</a> 代码如下：</p>

<pre><code>require_once("qiniu/rs.php");

$bucket = 'phpsdk';
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);
$putPolicy = new Qiniu_RS_PutPolicy($bucket);
$upToken = $putPolicy-&gt;Token(null);
</code></pre>

<p>上传文件到七牛（通常是客户端完成，但也可以发生在服务端）：</p>

<p>上传字符串</p>

<pre><code>require_once("qiniu/io.php");
require_once("qiniu/rs.php");

$bucket = "phpsdk";
$key1 = "file_name1";
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);
$putPolicy = new Qiniu_RS_PutPolicy($bucket);
$upToken = $putPolicy-&gt;Token(null);
list($ret, $err) = Qiniu_Put($upToken, $key1, "Qiniu Storage!", null);
echo "====&gt; Qiniu_Put result: \n";
if ($err !== null) {
    var_dump($err);
} else {
    var_dump($ret);
}
</code></pre>

<p>上传本地文件</p>

<pre><code>require_once("qiniu/io.php");
require_once("qiniu/rs.php");

$bucket = "phpsdk";
$key1 = "file_name1";
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);
$putPolicy = new Qiniu_RS_PutPolicy($bucket);
$upToken = $putPolicy-&gt;Token(null);
$putExtra = new Qiniu_PutExtra();
$putExtra-&gt;Crc32 = 1;
list($ret, $err) = Qiniu_PutFile($upToken, $key1, __file__, $putExtra);
echo "====&gt; Qiniu_PutFile result: \n";
if ($err !== null) {
    var_dump($err);
} else {
    var_dump($ret);
}
</code></pre>

<p><a name="io-put-policy"></a></p>

<h3>
<a name="12-%E4%B8%8A%E4%BC%A0%E7%AD%96%E7%95%A5" class="anchor" href="#12-%E4%B8%8A%E4%BC%A0%E7%AD%96%E7%95%A5"><span class="octicon octicon-link"></span></a>1.2 上传策略</h3>

<p><a href="http://docs.qiniu.com/api/put.html#uploadToken">uptoken</a> 实际上是用 AccessKey/SecretKey 进行数字签名的上传策略(<code>Qiniu_RS_PutPolicy</code>)，它控制则整个上传流程的行为。让我们快速过一遍你都能够决策啥：</p>

<pre><code>class Qiniu_RS_PutPolicy
{
    public $Scope;              // 必选项。可以是 bucketName 或者 bucketName:key
    public $CallbackUrl;        // 可选
    public $CallbackBody;       // 可选
    public $ReturnUrl;          // 可选， 更贴切的名字是 redirectUrl。
    public $ReturnBody;         // 可选
    public $AsyncOps;           // 可选
    public $EndUser;            // 可选
    public $Expires;            // 可选。默认是 3600 秒
    public $PersistentOps;      // 可选。
    public $PersistentNotifyUrl;    // 如果设置了PersistentOps，必须同时设置此项。
}
</code></pre>

<ul>
<li>
<code>scope</code> 限定客户端的权限。如果 <code>scope</code> 是 bucket，则客户端只能新增文件到指定的 bucket，不能修改文件。如果 <code>scope</code> 为 bucket:key，则客户端可以修改指定的文件。<strong>注意： key必须采用utf8编码，如使用非utf8编码访问七牛云存储将反馈错误</strong>
</li>
<li>
<code>callbackUrl</code> 设定业务服务器的回调地址，这样业务服务器才能感知到上传行为的发生。</li>
<li>
<code>callbackBody</code> 设定业务服务器的回调信息。文件上传成功后，七牛向业务服务器的callbackUrl发送的POST请求携带的数据。支持 <a href="http://docs.qiniu.com/api/put.html#MagicVariables">魔法变量</a> 和 <a href="http://docs.qiniu.com/api/put.html#xVariables">自定义变量</a>。</li>
<li>
<code>returnUrl</code> 设置用于浏览器端文件上传成功后，浏览器执行301跳转的URL，一般为 HTML Form 上传时使用。文件上传成功后浏览器会自动跳转到 <code>returnUrl?upload_ret=returnBody</code>。</li>
<li>
<code>returnBody</code> 可调整返回给客户端的数据包，支持 <a href="http://docs.qiniu.com/api/put.html#MagicVariables">魔法变量</a> 和 <a href="http://docs.qiniu.com/api/put.html#xVariables">自定义变量</a>。<code>returnBody</code> 只在没有 <code>callbackUrl</code> 时有效（否则直接返回 <code>callbackUrl</code> 返回的结果）。不同情形下默认返回的 <code>returnBody</code> 并不相同。在一般情况下返回的是文件内容的 <code>hash</code>，也就是下载该文件时的 <code>etag</code>；但指定 <code>returnUrl</code> 时默认的 <code>returnBody</code> 会带上更多的信息。</li>
<li>
<code>asyncOps</code> 可指定上传完成后，需要自动执行哪些数据处理。这是因为有些数据处理操作（比如音视频转码）比较慢，如果不进行预转可能第一次访问的时候效果不理想，预转可以很大程度改善这一点。<br>
</li>
<li>
<code>persistentOps</code> 可指定音视频文件上传完成后，需要进行的转码持久化操作。asyncOps的处理结果保存在缓存当中，有可能失效。而persistentOps的处理结果以文件形式保存在bucket中，体验更佳。<a href="http://docs.qiniu.com/api/persistent-ops.html">数据处理(持久化)</a><br>
</li>
<li>
<code>persistentNotifyUrl</code> 音视频转码持久化完成后，七牛的服务器会向用户发送处理结果通知。这里指定的url就是用于接收通知的接口。设置了<code>persistentOps</code>,则需要同时设置此字段。</li>
</ul><p>关于上传策略更完整的说明，请参考 <a href="http://docs.qiniu.com/api/put.html#uploadToken">uptoken</a>。</p>

<p><a name="io-download"></a></p>

<h3>
<a name="2-%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD" class="anchor" href="#2-%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD"><span class="octicon octicon-link"></span></a>2. 文件下载</h3>

<p>七牛云存储上的资源下载分为 公有资源下载 和 私有资源下载 。</p>

<p>私有（private）是 Bucket（空间）的一个属性，一个私有 Bucket 中的资源为私有资源，私有资源不可匿名下载。</p>

<p>新创建的空间（Bucket）缺省为私有，也可以将某个 Bucket 设为公有，公有 Bucket 中的资源为公有资源，公有资源可以匿名下载。</p>

<p><a name="public-download"></a></p>

<h4>
<a name="21-%E5%85%AC%E6%9C%89%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD" class="anchor" href="#21-%E5%85%AC%E6%9C%89%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD"><span class="octicon octicon-link"></span></a>2.1 公有资源下载</h4>

<p>如果在给bucket绑定了域名的话，可以通过以下地址访问。</p>

<pre><code>[GET] http://&lt;domain&gt;/&lt;key&gt;
</code></pre>

<p>示例代码：</p>

<pre><code>$key = 'pic.jpg';
$domain = 'phpsdk.qiniudn.com';
//$baseUrl 就是您要访问资源的地址
$baseUrl = Qiniu_RS_MakeBaseUrl($domain, $key);
</code></pre>

<p>其中&lt;domain&gt;是bucket所对应的域名。七牛云存储为每一个bucket提供一个默认域名。默认域名可以到<a href="https://portal.qiniu.com/">七牛云存储开发者平台</a>中，空间设置的域名设置一节查询。用户也可以将自有的域名绑定到bucket上，通过自有域名访问七牛云存储。</p>

<p><strong>注意： key必须采用utf8编码，如使用非utf8编码访问七牛云存储将反馈错误</strong></p>

<p><a name="private-download"></a></p>

<h4>
<a name="22-%E7%A7%81%E6%9C%89%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD" class="anchor" href="#22-%E7%A7%81%E6%9C%89%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD"><span class="octicon octicon-link"></span></a>2.2 私有资源下载</h4>

<p>私有资源必须通过临时下载授权凭证(downloadToken)下载，如下：</p>

<pre><code>[GET] http://&lt;domain&gt;/&lt;key&gt;?e=&lt;deadline&gt;&amp;token=&lt;downloadToken&gt;
</code></pre>

<p>注意，尖括号不是必需，代表替换项。<br>
私有下载链接可以使用 SDK 提供的如下方法生成：</p>

<pre><code>require_once("qiniu/rs.php");

$key = 'pic.jpg';
$domain = 'phpsdk.qiniudn.com';
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);  
$baseUrl = Qiniu_RS_MakeBaseUrl($domain, $key);
$getPolicy = new Qiniu_RS_GetPolicy();
$privateUrl = $getPolicy-&gt;MakeRequest($baseUrl, null);
echo "====&gt; getPolicy result: \n";
echo $privateUrl . "\n";
</code></pre>

<p><a name="fop-api"></a></p>

<h2>
<a name="%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86%E6%8E%A5%E5%8F%A3" class="anchor" href="#%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86%E6%8E%A5%E5%8F%A3"><span class="octicon octicon-link"></span></a>数据处理接口</h2>

<p>七牛支持在云端对图像, 视频, 音频等富媒体进行个性化处理</p>

<p><a name="fop-image"></a></p>

<h3>
<a name="1-%E5%9B%BE%E5%83%8F" class="anchor" href="#1-%E5%9B%BE%E5%83%8F"><span class="octicon octicon-link"></span></a>1. 图像</h3>

<p><a name="fop-image-info"></a></p>

<h4>
<a name="11-%E6%9F%A5%E7%9C%8B%E5%9B%BE%E5%83%8F%E5%B1%9E%E6%80%A7" class="anchor" href="#11-%E6%9F%A5%E7%9C%8B%E5%9B%BE%E5%83%8F%E5%B1%9E%E6%80%A7"><span class="octicon octicon-link"></span></a>1.1 查看图像属性</h4>

<pre><code>require_once("qiniu/rs.php");
require_once("qiniu/fop.php");

$key = 'pic.jpg';
$domain = 'phpsdk.qiniudn.com';
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);  
//生成baseUrl
$baseUrl = Qiniu_RS_MakeBaseUrl($domain, $key);

//生成fopUrl
$imgInfo = new Qiniu_ImageInfo;
$imgInfoUrl = $imgInfo-&gt;MakeRequest($baseUrl);

//对fopUrl 进行签名，生成privateUrl。 公有bucket 此步可以省去。
$getPolicy = new Qiniu_RS_GetPolicy();
$imgInfoPrivateUrl = $getPolicy-&gt;MakeRequest($imgInfoUrl, null);
echo "====&gt; imageInfo privateUrl: \n";
echo $imgInfoPrivateUrl . "\n";
</code></pre>

<p>将<code>$imgInfoPrivateUrl</code>粘贴到浏览器地址栏中就可以查看该图像的信息了。</p>

<p><a name="fop-exif"></a></p>

<h4>
<a name="12-%E6%9F%A5%E7%9C%8B%E5%9B%BE%E7%89%87exif%E4%BF%A1%E6%81%AF" class="anchor" href="#12-%E6%9F%A5%E7%9C%8B%E5%9B%BE%E7%89%87exif%E4%BF%A1%E6%81%AF"><span class="octicon octicon-link"></span></a>1.2 查看图片EXIF信息</h4>

<pre><code>require_once("qiniu/rs.php");
require_once("qiniu/fop.php");

$key = 'pic.jpg';
$domain = 'phpsdk.qiniudn.com';
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);  
//生成baseUrl
$baseUrl = Qiniu_RS_MakeBaseUrl($domain, $key);

//生成fopUrl
$imgExif = new Qiniu_Exif;
$imgExifUrl = $imgExif-&gt;MakeRequest($baseUrl);

//对fopUrl 进行签名，生成privateUrl。 公有bucket 此步可以省去。
$getPolicy = new Qiniu_RS_GetPolicy();
$imgExifPrivateUrl = $getPolicy-&gt;MakeRequest($imgExifUrl, null);
echo "====&gt; imageView privateUrl: \n";
echo $imgExifPrivateUrl . "\n";
</code></pre>

<p><a name="fop-image-view"></a></p>

<h4>
<a name="13-%E7%94%9F%E6%88%90%E5%9B%BE%E7%89%87%E9%A2%84%E8%A7%88" class="anchor" href="#13-%E7%94%9F%E6%88%90%E5%9B%BE%E7%89%87%E9%A2%84%E8%A7%88"><span class="octicon octicon-link"></span></a>1.3 生成图片预览</h4>

<pre><code>require_once("qiniu/rs.php");
require_once("qiniu/fop.php");

$key = 'pic.jpg';
$domain = 'phpsdk.qiniudn.com';
$accessKey = '&lt;YOUR_APP_ACCESS_KEY&gt;';
$secretKey = '&lt;YOUR_APP_SECRET_KEY&gt;';

Qiniu_SetKeys($accessKey, $secretKey);  
//生成baseUrl
$baseUrl = Qiniu_RS_MakeBaseUrl($domain, $key);

//生成fopUrl
$imgView = new Qiniu_ImageView;
$imgView-&gt;Mode = 1;
$imgView-&gt;Width = 60;
$imgView-&gt;Height = 120;
$imgViewUrl = $imgView-&gt;MakeRequest($baseUrl);

//对fopUrl 进行签名，生成privateUrl。 公有bucket 此步可以省去。
$getPolicy = new Qiniu_RS_GetPolicy();
$imgViewPrivateUrl = $getPolicy-&gt;MakeRequest($imgViewUrl, null);
echo "====&gt; imageView privateUrl: \n";
echo $imgViewPrivateUrl . "\n";
</code></pre>

<p><a name="contribution"></a></p>

<h2>
<a name="%E8%B4%A1%E7%8C%AE%E4%BB%A3%E7%A0%81" class="anchor" href="#%E8%B4%A1%E7%8C%AE%E4%BB%A3%E7%A0%81"><span class="octicon octicon-link"></span></a>贡献代码</h2>

<ol>
<li>Fork</li>
<li>创建您的特性分支 (<code>git checkout -b my-new-feature</code>)</li>
<li>提交您的改动 (<code>git commit -am 'Added some feature'</code>)</li>
<li>将您的修改记录提交到远程 <code>git</code> 仓库 (<code>git push origin my-new-feature</code>)</li>
<li>然后到 github 网站的该 <code>git</code> 远程仓库的 <code>my-new-feature</code> 分支下发起 Pull Request</li>
</ol><p><a name="license"></a></p>

<h2>
<a name="%E8%AE%B8%E5%8F%AF%E8%AF%81" class="anchor" href="#%E8%AE%B8%E5%8F%AF%E8%AF%81"><span class="octicon octicon-link"></span></a>许可证</h2>

<p>Copyright (c) 2013 qiniu.com</p>

<p>基于 MIT 协议发布:</p>

<ul>
<li><a href="http://www.opensource.org/licenses/MIT">www.opensource.org/licenses/MIT</a></li>
</ul></article>
  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/">
      <span class="mega-octicon octicon-mark-github"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2013 <span title="0.03352s from github-fe128-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
          <div class="suggester-container">
              <div class="suggester fullscreen-suggester js-navigation-container" id="fullscreen_suggester"
                 data-url="/qiniu/php-sdk/suggestions/commit">
              </div>
          </div>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped leftwards" title="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped leftwards"
      title="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-remove-close close ajax-error-dismiss"></a>
      Something went wrong with that request. Please try again.
    </div>

  </body>
</html>

