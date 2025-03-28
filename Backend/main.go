package main

import (
	"time"

	"event.com/restapi/db"
	"event.com/restapi/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)
  

func main(){

	db.InitDB()
	server := gin.Default()
	
	config := cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"}, // Replace with your allowed origin(s)
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }

	server.Use(cors.New(config))

	routes.RegisterRoutes(server)

	server.Run(":8080")   // localhost:8080
}

