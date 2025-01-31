build: 
	@go build -o bin/game

run:
	@./bin/game

dev: 	
	@go build -o bin/game
	@./bin/game

start-db: 
	@docker compose up -d

stop-db:
	@docker compose down 

exec-db:
	@docker exec -it the-cave-thecave-postgres psql -U postgres

test: 
	@go test -v ./