package middlewares

import (
	"net/http"

	"event.com/restapi/utils"
	"github.com/gin-gonic/gin"
)

func Authenticate(context *gin.Context){

	token := context.Request.Header.Get("Authorization")
	if token == ""{
		context.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{"message":"not authorized"})
		return 
	}
	userId,err := utils.IsTokenValid(token)
	if err!=nil{
		context.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{"message":"not authorized"})
		return 
	}
	context.Set(":userId",userId)
}