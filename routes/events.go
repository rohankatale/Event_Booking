package routes

import (
	"net/http"
	"strconv"

	"event.com/restapi/models"
	"github.com/gin-gonic/gin"
)



func getEvents(context *gin.Context) {
	events,err:=models.GetAllEvents()
	if err!=nil{
		context.JSON(http.StatusInternalServerError,gin.H{"message":"could not fetch the events, try again later"})
		return
	}
	context.JSON(http.StatusOK,events)
}

func createEvent(context *gin.Context){
	var event models.Event
	err:=context.ShouldBindJSON(&event)
	if err!= nil{
		context.JSON(http.StatusBadRequest,gin.H {"message":"could not parse requested data"})
		return
	}
	event.UserID =1
	err = event.Save()
	if err!=nil{
		context.JSON(http.StatusInternalServerError,gin.H{"message":"could not create the events, try again later"})
		return
	}
	context.JSON(http.StatusCreated,gin.H{"message":"Event Created","event":event})
}			

func getByID(context *gin.Context){
	var event *models.Event
	eventId,err := strconv.ParseInt(context.Param("id"),10,64)
	if err!=nil{
		context.JSON(http.StatusBadRequest,gin.H{"message":"could not convert string to float, try again later"})
		return
	}
	event ,err  = models.GetEventByID(eventId)
	if err!=nil{
		context.JSON(http.StatusInternalServerError,gin.H{"message":"could not fetch the event by id check err 1, try again later"})
		return
	}
	context.JSON(http.StatusOK,event)
}

func updateEvent(context *gin.Context){
	 eventID ,err := strconv.ParseInt(context.Param("id"),10,64)
	 if err!=nil{
		context.JSON(http.StatusBadRequest,gin.H{"message":"could not convert string to float, try again later"})
		return
	}
	_ , err = models.GetEventByID(eventID)
	if err!=nil{
		context.JSON(http.StatusInternalServerError,gin.H{"message":"could not get event by id, try again later"})
		return
	}
	var updatedEvent models.Event
	err = context.BindJSON(&updatedEvent) 
	if err!= nil{
		context.JSON(http.StatusBadRequest,gin.H {"message":"could not parse requested data"})
		return
	}
	updatedEvent.ID = eventID
	err = updatedEvent.Update()
	if err!=nil{
		context.JSON(http.StatusBadRequest,gin.H{"message":"could not update the event"})
		return 	
	}
	context.JSON(http.StatusOK,gin.H{"message":"event updated succssfully"})
}