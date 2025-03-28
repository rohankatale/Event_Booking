package routes

import (
	"net/http"
	"strconv"

	"event.com/restapi/models"
	"github.com/gin-gonic/gin"
)

func registerForEvent(context *gin.Context){
	
	userId := context.MustGet(":userId").(int64)

	eventId,err := strconv.ParseInt(context.Param("id"),10,64)
	if err!=nil{
		context.JSON(http.StatusBadRequest,gin.H{"message":"could not convert string to float, try again later"})
		return
	}
	
	event,err := models.GetEventByID(eventId)
	if err!=nil{
		context.JSON(http.StatusInternalServerError,gin.H{"message":"could not fetch the event by id , try again later"})
		return
	}

	err = event.Register(userId)
	if err!=nil{
		context.JSON(http.StatusInternalServerError,gin.H{"message":"could not register for the event , try again later"})
		return
	}

	context.JSON(http.StatusCreated,gin.H{"message":"registered successfully"})

}

func cancleRegistration(context *gin.Context){
	
	userId := context.MustGet(":userId").(int64)
	eventId ,err := strconv.ParseInt(context.Param("id"),10,64)
	if err!=nil{
		context.JSON(http.StatusBadRequest,gin.H{"message":"could not convert string to float, try again later"})
		return
	}
	var event models.Event
	event.ID = eventId
	err = event.UnRegister(userId)
	if err!=nil{
		context.JSON(http.StatusInternalServerError,gin.H{"message":"could not unregister for the event , try again later"})
		return
	}
	context.JSON(http.StatusOK,gin.H{"message":"unregistered successfully"})
}