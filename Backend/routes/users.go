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

	// Return user data along with the token upon successful login
	// Fetch the user details again to ensure we have the latest data (optional but good practice)
	// Assuming GetUserByID exists and returns the user without the password
	loggedInUser, err := models.GetUserByID(user.ID)
	if err != nil {
		// Log the error, but proceed with login if token generation was successful
		// Or handle more gracefully depending on requirements
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch user details after login"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "login successful", "token": token, "user": loggedInUser}) // Include user data
}

// getCurrentUser handles GET /me requests
func getCurrentUser(context *gin.Context) {
	// Retrieve userId set by the Authenticate middleware
	userIdVal, exists := context.Get(":userId") // Use the key set in the middleware
	if !exists {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "User ID not found in context"})
		return
	}

	// Assert the type of userId (assuming it's int64 based on typical DB IDs)
	userId, ok := userIdVal.(int64)
	if !ok {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "User ID in context has unexpected type"})
		return
	}

	// Fetch user details from the database using the ID
	user, err := models.GetUserByID(userId) // Assuming this function exists
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch user data"})
		return
	}

	// Return the user data (ensure password is not included)
	context.JSON(http.StatusOK, user)
}
