


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=10">
        <title>android-sdk/docs/README.md at master · qiniu/android-sdk · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <link rel="logo" type="image/svg" href="https://github-media-downloads.s3.amazonaws.com/github-logo.svg" />
    <meta property="og:image" content="https://github.global.ssl.fastly.net/images/modules/logos_page/Octocat.png">
    <meta name="hostname" content="github-fe138-cp1-prd.iad.github.net">
    <meta name="ruby" content="ruby 1.9.3p194-tcs-github-tcmalloc (e1c0c3f392) [x86_64-linux]">
    <link rel="assets" href="https://github.global.ssl.fastly.net/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035/">
    <link rel="xhr-socket" href="/_sockets" />
    


    <meta name="msapplication-TileImage" content="/windows-tile.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="selected-link" value="repo_source" data-pjax-transient />
    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="B4A8221A:31F1:5332B7D:52A149FD" name="octolytics-dimension-request_id" />
    

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="Ihr8quN7KffyCWIAAHPsMgbHMOm+7ec8nJqa3+we43U=" name="csrf-token" />

    <link href="https://github.global.ssl.fastly.net/assets/github-95d7006755542e644a6361c96eb6e209141209dc.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://github.global.ssl.fastly.net/assets/github2-e8fd7fa97473f42d491037924a76d9c2fb4726ff.css" media="all" rel="stylesheet" type="text/css" />
    

    

      <script src="https://github.global.ssl.fastly.net/assets/frameworks-5970f5a0a3dcc441d5f7ff74326ffd59bbe9388e.js" type="text/javascript"></script>
      <script src="https://github.global.ssl.fastly.net/assets/github-42e9793d7b64149e1866ac95052d9a1054cc6dc6.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="b70f199f9889699d5def9992f0a26438">

        <link data-pjax-transient rel='permalink' href='/qiniu/android-sdk/blob/ad43020011881b3d4c4be12431cd69217f6c9a3a/docs/README.md'>
  <meta property="og:title" content="android-sdk"/>
  <meta property="og:type" content="githubog:gitrepository"/>
  <meta property="og:url" content="https://github.com/qiniu/android-sdk"/>
  <meta property="og:image" content="https://github.global.ssl.fastly.net/images/gravatars/gravatar-user-420.png"/>
  <meta property="og:site_name" content="GitHub"/>
  <meta property="og:description" content="android-sdk - Qiniu Resource (Cloud) Storage SDK for Android"/>

  <meta name="description" content="android-sdk - Qiniu Resource (Cloud) Storage SDK for Android" />

  <meta content="1563636" name="octolytics-dimension-user_id" /><meta content="qiniu" name="octolytics-dimension-user_login" /><meta content="5308654" name="octolytics-dimension-repository_id" /><meta content="qiniu/android-sdk" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="5308654" name="octolytics-dimension-repository_network_root_id" /><meta content="qiniu/android-sdk" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/qiniu/android-sdk/commits/master.atom" rel="alternate" title="Recent Commits to android-sdk:master" type="application/atom+xml" />

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
      <a class="button signin" href="/login?return_to=%2Fqiniu%2Fandroid-sdk%2Fblob%2Fmaster%2Fdocs%2FREADME.md">Sign in</a>
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
    
    
      data-repo="qiniu/android-sdk"
      data-branch="master"
      data-sha="36b0ae3f4205803265b8caf04d64ca57ade0f1c2"
  >

    <input type="hidden" name="nwo" value="qiniu/android-sdk" />

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
    <a href="/login?return_to=%2Fqiniu%2Fandroid-sdk"
    class="minibutton with-count js-toggler-target star-button tooltipped upwards"
    title="You must be signed in to use this feature" rel="nofollow">
    <span class="octicon octicon-star"></span>Star
  </a>

    <a class="social-count js-social-count" href="/qiniu/android-sdk/stargazers">
      5
    </a>

  </li>

    <li>
      <a href="/login?return_to=%2Fqiniu%2Fandroid-sdk"
        class="minibutton with-count js-toggler-target fork-button tooltipped upwards"
        title="You must be signed in to fork a repository" rel="nofollow">
        <span class="octicon octicon-git-branch"></span>Fork
      </a>
      <a href="/qiniu/android-sdk/network" class="social-count">
        15
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
          <strong><a href="/qiniu/android-sdk" class="js-current-repository js-repo-home-link">android-sdk</a></strong>

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
        <a href="/qiniu/android-sdk/tree/master" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-gotokey="c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_tags repo_branches /qiniu/android-sdk/tree/master">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped leftwards" title="Issues">
          <a href="/qiniu/android-sdk/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-gotokey="i" data-selected-links="repo_issues /qiniu/android-sdk/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class='counter'>3</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped leftwards" title="Pull Requests">
        <a href="/qiniu/android-sdk/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-gotokey="p" data-selected-links="repo_pulls /qiniu/android-sdk/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class='counter'>1</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


    </ul>
    <div class="sunken-menu-separator"></div>
    <ul class="sunken-menu-group">

      <li class="tooltipped leftwards" title="Pulse">
        <a href="/qiniu/android-sdk/pulse" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="pulse /qiniu/android-sdk/pulse">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Graphs">
        <a href="/qiniu/android-sdk/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_graphs repo_contributors /qiniu/android-sdk/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Network">
        <a href="/qiniu/android-sdk/network" aria-label="Network" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-selected-links="repo_network /qiniu/android-sdk/network">
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
           value="https://github.com/qiniu/android-sdk.git" readonly="readonly">

    <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/qiniu/android-sdk.git" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>

  

<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><strong>Subversion</strong> checkout URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="https://github.com/qiniu/android-sdk" readonly="readonly">

    <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/qiniu/android-sdk" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
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



              <a href="/qiniu/android-sdk/archive/master.zip"
                 class="minibutton sidebar-button"
                 title="Download this repository as a zip file"
                 rel="nofollow">
                <span class="octicon octicon-cloud-download"></span>
                Download ZIP
              </a>
            </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          


<!-- blob contrib key: blob_contributors:v21:d03ae934f54bb773b5cde0cdc05d9545 -->

<p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

<a href="/qiniu/android-sdk/find/master" data-pjax data-hotkey="t" class="js-show-file-finder" style="display:none">Show File Finder</a>

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
              <a href="/qiniu/android-sdk/blob/develop/docs/README.md"
                 data-name="develop"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="develop">develop</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/android-sdk/blob/master/docs/README.md"
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
              <a href="/qiniu/android-sdk/tree/v6.0.0/docs/README.md"
                 data-name="v6.0.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v6.0.0">v6.0.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/android-sdk/tree/v1.3.0/docs/README.md"
                 data-name="v1.3.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v1.3.0">v1.3.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/android-sdk/tree/v1.2.0/docs/README.md"
                 data-name="v1.2.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v1.2.0">v1.2.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/android-sdk/tree/v1.1.1/docs/README.md"
                 data-name="v1.1.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v1.1.1">v1.1.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/android-sdk/tree/v1.1.0/docs/README.md"
                 data-name="v1.1.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v1.1.0">v1.1.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/qiniu/android-sdk/tree/v1.0.0/docs/README.md"
                 data-name="v1.0.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="v1.0.0">v1.0.0</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/qiniu/android-sdk/tree/master" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">android-sdk</span></a></span></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/qiniu/android-sdk/tree/master/docs" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">docs</span></a></span><span class="separator"> / </span><strong class="final-path">README.md</strong> <span class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="docs/README.md" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>


  <div class="commit commit-loader file-history-tease js-deferred-content" data-url="/qiniu/android-sdk/contributors/master/docs/README.md">
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
          <span>169 lines (111 sloc)</span>
        <span>5.9 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
              <a class="minibutton disabled tooltipped leftwards" href="#"
                 title="You must be signed in to make or propose changes">Edit</a>
          <a href="/qiniu/android-sdk/raw/master/docs/README.md" class="button minibutton " id="raw-url">Raw</a>
            <a href="/qiniu/android-sdk/blame/master/docs/README.md" class="button minibutton ">Blame</a>
          <a href="/qiniu/android-sdk/commits/master/docs/README.md" class="button minibutton " rel="nofollow">History</a>
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
<td><div>Android SDK 使用指南</div></td>
  </tr></tbody>
</table><ul>
<li>Android SDK 下载地址：<a href="https://github.com/qiniu/android-sdk/tags">https://github.com/qiniu/android-sdk/tags</a>
</li>
<li>Android SDK 源码地址：<a href="https://github.com/qiniu/android-sdk">https://github.com/qiniu/android-sdk</a> (请注意非 master 分支的代码在规格上可能承受变更)</li>
</ul><p>此 Android SDK 基于 <a href="http://docs.qiniu.com/api/index.html">七牛云存储官方API</a> 构建。在开发者的 Android App 工程项目中使用此 SDK 能够非常方便地将 Android 系统里边的文件快速直传到七牛云存储。</p>

<p>出于安全考虑，使用此 SDK 无需设置密钥（AccessKey / SecretKey）。所有涉及到授权的操作，比如生成上传授权凭证（uploadToken）或下载授权凭证（downloadToken）均在业务服务器端进行。</p>

<p>业务服务器负责生成和颁发授权，此 SDK 只负责实施具体的上传业务。</p>

<h2>
<a name="%E7%9B%AE%E5%BD%95" class="anchor" href="#%E7%9B%AE%E5%BD%95"><span class="octicon octicon-link"></span></a>目录</h2>

<ul>
<li><a href="#upload-flow">上传流程</a></li>
<li><a href="#download-flow">下载流程</a></li>
<li><a href="#load">接入SDK</a></li>
<li><a href="#upload">使用SDK上传文件</a></li>
<li><a href="#demo">SDK 内置 demo 说明</a></li>
<li><a href="#concurrency">并发特性</a></li>
<li><a href="#contributing">贡献代码</a></li>
<li><a href="#license">许可证</a></li>
</ul><p><a name="upload-flow"></a></p>

<h2>
<a name="%E4%B8%8A%E4%BC%A0%E6%B5%81%E7%A8%8B" class="anchor" href="#%E4%B8%8A%E4%BC%A0%E6%B5%81%E7%A8%8B"><span class="octicon octicon-link"></span></a>上传流程</h2>

<ol>
<li><p>业务服务器使用七牛云存储服务端编程语言（如 PHP/Python/Ruby/Java）SDK 生成 uploadToken (上传授权凭证)</p></li>
<li><p>客户端 Android 使用该 uploadToken 调用此 Android 封装的上传方法直传文件到七牛云存储</p></li>
<li><p>文件直传成功，七牛云存储向 uploadToken 生成之前所指定的业务服务器地址发起回调</p></li>
<li><p>业务服务器接收来自七牛云存储回调的 POST 请求，处理相关 POST 参数，最后响应输出一段 JSON</p></li>
<li><p>七牛云存储接收业务服务器响应输出的这段 JSON，原封不动地通过 HTTP 返回给 Android 客户端程序</p></li>
</ol><p>注意事项：</p>

<ul>
<li>此 Android SDK 当前只提供上传方法，即负责上述流程中的第2个步骤。</li>
<li>业务服务器响应回调请求后输出 JSON，HTTP Headers 必须输出 <code>Content-Type</code> 为 <code>application/json</code>。</li>
<li>文件上传成功后，业务服务器输出的 JSON 数据，可从所调用SDK上传代码的返回值中获取到。</li>
</ul><p><a name="download-flow"></a></p>

<h2>
<a name="%E4%B8%8B%E8%BD%BD%E6%B5%81%E7%A8%8B" class="anchor" href="#%E4%B8%8B%E8%BD%BD%E6%B5%81%E7%A8%8B"><span class="octicon octicon-link"></span></a>下载流程</h2>

<p>此 Android SDK 没有提供下载文件的方法。所有上传到七牛云存储的文件，都能以如下方式进行访问：</p>

<p>公开资源：</p>

<pre><code>http://&lt;domain&gt;/&lt;key&gt;
</code></pre>

<p>私有资源：</p>

<pre><code>http://&lt;domain&gt;/&lt;key&gt;?token=&lt;downloadToken&gt;
</code></pre>

<p>其中&lt;domain&gt;是bucket所对应的域名。七牛云存储为每一个bucket提供一个默认域名。默认域名可以到<a href="https://portal.qiniu.com/">七牛云存储开发者平台</a>中，空间设置的域名设置一节查询。</p>

<p>出于安全考虑，此 SDK 不提供 <code>downloadToken</code> 的生成。除 Android / iOS SDK 以外，七牛云存储其他编程语言的 SDK 都有提供签发私有资源下载授权凭证（downloadToken）的实现。</p>

<p><strong>注意： key必须采用utf8编码，如使用非utf8编码访问七牛云存储将反馈错误</strong></p>

<p><a name="load"></a></p>

<h2>
<a name="%E6%8E%A5%E5%85%A5sdk" class="anchor" href="#%E6%8E%A5%E5%85%A5sdk"><span class="octicon octicon-link"></span></a>接入SDK</h2>

<p>本SDK的开发环境是 <a href="http://www.jetbrains.com/idea/">Intellij IDEA</a>，如果开发者使用的编辑器同为 IDEA, 直接打开项目即可，对于使用 <a href="http://www.eclipse.org/">Eclipse</a> 编辑器的开发者，可以尝试导入项目。</p>

<p>导入后，填写相关必要参数即可运行SDK自带的 demo 程序，配置方法见 <a href="#demo">SDK 内置 demo 说明</a> 。</p>

<p><a name="upload"></a></p>

<h2>
<a name="%E4%BD%BF%E7%94%A8sdk%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6" class="anchor" href="#%E4%BD%BF%E7%94%A8sdk%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6"><span class="octicon octicon-link"></span></a>使用SDK上传文件</h2>

<p>在 Android 中选择文件一般是通过 uri 作为路径, 一般调用以下代码</p>

<div class="highlight highlight-java"><pre><span class="c1">// 在七牛绑定的对应bucket的域名. 默认是bucket.qiniudn.com</span>
<span class="kd">public</span> <span class="kd">static</span> <span class="n">String</span> <span class="n">bucketName</span> <span class="o">=</span> <span class="s">"bucketName"</span><span class="o">;</span>
<span class="kd">public</span> <span class="kd">static</span> <span class="n">String</span> <span class="n">domain</span> <span class="o">=</span> <span class="n">bucketName</span> <span class="o">+</span> <span class="s">".qiniudn.com"</span><span class="o">;</span>
<span class="c1">// upToken 这里需要自行获取. SDK 将不实现获取过程. 当token过期后才再获取一遍</span>
<span class="kd">public</span> <span class="n">String</span> <span class="n">UP_TOKEN</span> <span class="o">=</span> <span class="s">"token"</span><span class="o">;</span>

<span class="kt">boolean</span> <span class="n">uploading</span> <span class="o">=</span> <span class="kc">false</span><span class="o">;</span>
<span class="cm">/**</span>
<span class="cm"> * 普通上传文件</span>
<span class="cm"> * @param uri</span>
<span class="cm"> */</span>
<span class="kd">private</span> <span class="kt">void</span> <span class="nf">doUpload</span><span class="o">(</span><span class="n">Uri</span> <span class="n">uri</span><span class="o">)</span> <span class="o">{</span>
    <span class="k">if</span> <span class="o">(</span><span class="n">uploading</span><span class="o">)</span> <span class="o">{</span>
        <span class="n">hint</span><span class="o">.</span><span class="na">setText</span><span class="o">(</span><span class="s">"上传中，请稍后"</span><span class="o">);</span>
        <span class="k">return</span><span class="o">;</span>
    <span class="o">}</span>
    <span class="n">uploading</span> <span class="o">=</span> <span class="kc">true</span><span class="o">;</span>
    <span class="n">String</span> <span class="n">key</span> <span class="o">=</span> <span class="n">IO</span><span class="o">.</span><span class="na">UNDEFINED_KEY</span><span class="o">;</span> <span class="c1">// 自动生成key</span>
    <span class="n">PutExtra</span> <span class="n">extra</span> <span class="o">=</span> <span class="k">new</span> <span class="n">PutExtra</span><span class="o">();</span>
    <span class="n">extra</span><span class="o">.</span><span class="na">checkCrc</span> <span class="o">=</span> <span class="n">PutExtra</span><span class="o">.</span><span class="na">AUTO_CRC32</span><span class="o">;</span>
    <span class="n">extra</span><span class="o">.</span><span class="na">params</span><span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="s">"x:arg"</span><span class="o">,</span> <span class="s">"value"</span><span class="o">);</span>
    <span class="n">hint</span><span class="o">.</span><span class="na">setText</span><span class="o">(</span><span class="s">"上传中"</span><span class="o">);</span>
    <span class="n">IO</span><span class="o">.</span><span class="na">putFile</span><span class="o">(</span><span class="k">this</span><span class="o">,</span> <span class="n">UP_TOKEN</span><span class="o">,</span> <span class="n">key</span><span class="o">,</span> <span class="n">uri</span><span class="o">,</span> <span class="n">extra</span><span class="o">,</span> <span class="k">new</span> <span class="n">JSONObjectRet</span><span class="o">()</span> <span class="o">{</span>
        <span class="nd">@Override</span>
        <span class="kd">public</span> <span class="kt">void</span> <span class="nf">onSuccess</span><span class="o">(</span><span class="n">JSONObject</span> <span class="n">resp</span><span class="o">)</span> <span class="o">{</span>
            <span class="n">uploading</span> <span class="o">=</span> <span class="kc">false</span><span class="o">;</span>
            <span class="n">String</span> <span class="n">hash</span><span class="o">;</span>
            <span class="n">String</span> <span class="n">value</span><span class="o">;</span>
            <span class="k">try</span> <span class="o">{</span>
                <span class="n">hash</span> <span class="o">=</span> <span class="n">resp</span><span class="o">.</span><span class="na">getString</span><span class="o">(</span><span class="s">"hash"</span><span class="o">);</span>
                <span class="n">value</span> <span class="o">=</span> <span class="n">resp</span><span class="o">.</span><span class="na">getString</span><span class="o">(</span><span class="s">"x:arg"</span><span class="o">);</span>
            <span class="o">}</span> <span class="k">catch</span> <span class="o">(</span><span class="n">Exception</span> <span class="n">ex</span><span class="o">)</span> <span class="o">{</span>
                <span class="n">hint</span><span class="o">.</span><span class="na">setText</span><span class="o">(</span><span class="n">ex</span><span class="o">.</span><span class="na">getMessage</span><span class="o">());</span>
                <span class="k">return</span><span class="o">;</span>
            <span class="o">}</span>
            <span class="n">String</span> <span class="n">redirect</span> <span class="o">=</span> <span class="s">"http://"</span> <span class="o">+</span> <span class="n">domain</span> <span class="o">+</span> <span class="s">"/"</span> <span class="o">+</span> <span class="n">hash</span><span class="o">;</span>
            <span class="n">hint</span><span class="o">.</span><span class="na">setText</span><span class="o">(</span><span class="s">"上传成功! "</span> <span class="o">+</span> <span class="n">hash</span><span class="o">);</span>
            <span class="n">Intent</span> <span class="n">intent</span> <span class="o">=</span> <span class="k">new</span> <span class="n">Intent</span><span class="o">(</span><span class="n">Intent</span><span class="o">.</span><span class="na">ACTION_VIEW</span><span class="o">,</span> <span class="n">Uri</span><span class="o">.</span><span class="na">parse</span><span class="o">(</span><span class="n">redirect</span><span class="o">));</span>
            <span class="n">startActivity</span><span class="o">(</span><span class="n">intent</span><span class="o">);</span>
        <span class="o">}</span>

        <span class="nd">@Override</span>
        <span class="kd">public</span> <span class="kt">void</span> <span class="nf">onFailure</span><span class="o">(</span><span class="n">Exception</span> <span class="n">ex</span><span class="o">)</span> <span class="o">{</span>
            <span class="n">uploading</span> <span class="o">=</span> <span class="kc">false</span><span class="o">;</span>
            <span class="n">hint</span><span class="o">.</span><span class="na">setText</span><span class="o">(</span><span class="s">"错误: "</span> <span class="o">+</span> <span class="n">ex</span><span class="o">.</span><span class="na">getMessage</span><span class="o">());</span>
        <span class="o">}</span>
    <span class="o">});</span>
<span class="o">}</span>
</pre></div>

<p><a name="demo"></a></p>

<h2>
<a name="sdk-%E5%86%85%E7%BD%AE-demo-%E8%AF%B4%E6%98%8E" class="anchor" href="#sdk-%E5%86%85%E7%BD%AE-demo-%E8%AF%B4%E6%98%8E"><span class="octicon octicon-link"></span></a>SDK 内置 demo 说明</h2>

<p>注意：demo 程序无法直接运行，需要配置 <code>UpToken</code>, <code>BucketName</code>, <code>Domain</code>信息, 将其填写到 MyActivity 之中。<code>key</code>值可以在操作界面修改。当文件上传成功时，会试图跳转到浏览器访问已经上传的资源。如果失败，会toast提示。</p>

<p><a name="concurrency"></a></p>

<h2>
<a name="%E5%B9%B6%E5%8F%91%E7%89%B9%E6%80%A7" class="anchor" href="#%E5%B9%B6%E5%8F%91%E7%89%B9%E6%80%A7"><span class="octicon octicon-link"></span></a>并发特性</h2>

<p>此 Android SDK 不是线程安全的，请勿在没有保护的情况下跨线程使用。</p>

<p><a name="contributing"></a></p>

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

<p>Copyright (c) 2013 <a href="http://www.qiniu.com">www.qiniu.com</a></p>

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
      <li>&copy; 2013 <span title="0.01991s from github-fe138-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
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
                 data-url="/qiniu/android-sdk/suggestions/commit">
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

