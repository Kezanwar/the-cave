build: 
	@go build -o bin/game

run:
	@./bin/game

dev: 	
	@go build -o bin/game
	@./bin/game

# create-redis:
# 	@docker run -p 6379:6379 --name we-link-redis -d -it redis/redis-stack-server:latest

# start-redis: 
# 	@docker start we-link-redis

# stop-redis:
# 	@docker stop we-link-redis

# redis-cli:
# 	@docker exec -it we-link-redis redis-cli

test: 
	@go test -v ./