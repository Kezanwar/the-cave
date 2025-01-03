build: 
	@go build -o bin/game

run:
	@./bin/game

dev: 	
	@go build -o bin/game
	@./bin/game

create-db: 
	@bash db.sh

start-db: 
	@docker start the-cave-db

stop-db:
	@docker stop the-cave-db

test: 
	@go test -v ./