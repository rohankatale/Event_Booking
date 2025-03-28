package models

import (
	"errors"

	"event.com/restapi/db"
	"event.com/restapi/utils"
)

type User struct{
	ID int64
	Email string `binding:"required"`
	Password string `binding:"required"`
} 

func (u User) Save()error{
	query := `INSERT INTO users(email,password) VALUES(?,?)`

	stmt,err := db.DB.Prepare(query)
	if err!=nil{
		return err
	}
	defer stmt.Close()
	hashedpass ,err := utils.HashPassword(u.Password)
	if err!=nil{
		return err
	}
	result,err := stmt.Exec(u.Email,hashedpass)
	if err!=nil{
		return err
	}
	userId , err := result.LastInsertId()
	if err!=nil{
		return err
	}
	u.ID = userId
	return nil
}


func (u *User) ValidateCredentials() error {  // changed to pointer receiver
	query := `SELECT id,password FROM users WHERE email = ?`
	row := db.DB.QueryRow(query, u.Email)

	var retrivedPassword string
	err := row.Scan(&u.ID, &retrivedPassword)
	if err != nil {
		return errors.New("credentials invalid")
	}

	passValid := utils.CheckPassword(u.Password, retrivedPassword)
	if !passValid {
		return errors.New("credentials invalid")
	}

	return nil
}
