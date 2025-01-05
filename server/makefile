build: 
	@go build -o bin/game

run:
	@./bin/game

dev: 	
	@go build -o bin/game
	@./bin/game

create-db: 
	@bash create-db.sh

start-db: 
	@docker start the-cave-db

exec-db:
	@bash exec-db.sh

stop-db:
	@docker stop the-cave-db

test: 
	@go test -v ./