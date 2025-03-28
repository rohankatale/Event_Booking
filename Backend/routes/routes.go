package routes

import (
	"event.com/restapi/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine ){
	server.GET("/events",getEvents)
	server.GET("/events/:id",getByID)
	// server.POST("/events",middlewares.Authenticate,createEvent)
	// server.PUT("/events/:id",updateEvent)
	// server.DELETE("/events/:id",deleteEvent)

	authnticated := server.Group("/",middlewares.Authenticate)
	authnticated.POST("/events",createEvent)
	authnticated.PUT("/events/:id",updateEvent)
	authnticated.DELETE("/events/:id",deleteEvent)
	authnticated.POST("/events/:id/register",registerForEvent)
	authnticated.DELETE("/events/:id/register",cancleRegistration)

	server.POST("/signup",signup)
	server.POST("/login",login)
	server.POST("events/search/:string",searchEvents)

}