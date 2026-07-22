# Helpers for forks and PRs
fork-fetch-remote:
	git remote add $(remote-name) $(fork-url)
	git fetch $(remote-name) $(fork-branch-name)
	git checkout -b $(remote-name)  $(remote-name)/$(fork-branch-name)

fork-remove:
	git remote remove $(remote-name)