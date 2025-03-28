package routes

import (
	"net/http"

	"event.com/restapi/models"
	"event.com/restapi/utils"
	"github.com/gin-gonic/gin"
)


func signup(context *gin.Context){
	var user models.User
	err := context.ShouldBindJSON(&user)

	if err!= nil{
		context.JSON(http.StatusBadRequest,gin.H{"message":"could not parse the data"})
	}

	err = user.Save()

	if err!= nil{
		context.JSON(http.StatusInternalServerError,gin.H{"message":"could not save the user data"})
	}

	context.JSON(http.StatusCreated ,gin.H{"message":"user created successfully"})

}

func login(context *gin.Context){
	var user models.User
	err := context.ShouldBindJSON(&user)

	if err!= nil{
		context.JSON(http.StatusBadRequest,gin.H{"message":"could not parse the data"})
	}

	err = user.ValidateCredentials()

	if err!= nil{
		context.JSON(http.StatusUnauthorized,gin.H{"message":"invalid credentials"})
		return 
	}

	token ,err := utils.GenerateToken(user.Email,user.ID) 

	if err!= nil{
		context.JSON(http.StatusInternalServerError,gin.H{"message":"could not generate token"})
		return 
	}

	context.JSON(http.StatusOK,gin.H{"message":"login successful","token":token})
}