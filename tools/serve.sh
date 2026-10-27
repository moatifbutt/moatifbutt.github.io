#!/usr/bin/env bash
# Preview the site locally at http://127.0.0.1:4000 (auto-reloads on save;
# restart after editing _config.yml).
#
# Uses Homebrew's Ruby 3.3 (same major version as the GitHub deploy workflow).
# SDKROOT points at the macOS 26.5 SDK because the newest Command Line Tools
# SDK cannot link native gems on this machine; drop it once that is fixed.
set -euo pipefail
cd "$(dirname "$0")/.."

export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"
SDK=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk
[ -d "$SDK" ] && export SDKROOT="$SDK"

bundle config set --local path vendor/bundle >/dev/null
bundle check >/dev/null 2>&1 || bundle install
exec bundle exec jekyll serve --livereload "$@"
