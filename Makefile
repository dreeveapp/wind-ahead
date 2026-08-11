compose=docker compose

dc:
	@${compose} -f docker-compose.yml $(cmd)

build-containers:
	@make dc cmd="build"

up:
	@make dc cmd="up -d"

logs:
	@make dc cmd="logs -f windahead"

down:
	@make dc cmd="down --remove-orphans"

# Helpers for forks and PRs
fork-fetch-remote:
	git remote add $(remote-name) $(fork-url)
	git fetch $(remote-name) $(fork-branch-name)
	git checkout -b $(remote-name)  $(remote-name)/$(fork-branch-name)

fork-remove:
	git remote remove $(remote-name)