BIN = ./node_modules/.bin

test: lint
	@$(BIN)/mocha -t 5000 -b -R spec spec.js

lint:
	@$(BIN)/jsxhint index.js example/

install:
	npm install

example::
	@$(BIN)/node-dev example/server.js

release-patch: test
	@$(call release,patch)

release-minor: test
	@$(call release,minor)

release-major: test
	@$(call release,major)

publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1) --message 'release v%s'
endef
