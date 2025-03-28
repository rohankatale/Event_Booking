package models

import (
	"time"

	"event.com/restapi/db"
)
type Event struct{
	ID int64
	Name string				`binding:"required"`
	Description string 		`binding:"required"`
	Location string			`binding:"required"`
	DateTime time.Time
	UserID int64 	
}

func(e *Event) Save()error{
	query :=`
	INSERT INTO events(name ,description,location,dateTime,user_id) 
	VALUES (?,?,?,?,?)`
	stmt,err := db.DB.Prepare(query)
	if err!=nil{
		return err
	}
	defer stmt.Close()
	result , err := stmt.Exec(e.Name,e.Description,e.Location,e.DateTime,e.UserID) // exec is used when we want to modify the values int the database 
	if err!=nil{
		return err
	}
	id , err := result.LastInsertId()
	e.ID = id
	return err 
}

func GetAllEvents()([]Event,error){
	query := "SELECT * FROM events"
	rows, err := db.DB.Query(query)  // query is used insted of exec if we just want to fetch the data 
	if err!=nil{
		return nil,err
	}
	defer rows.Close()
	var events [] Event
	for rows.Next(){
		var event Event
		err := rows.Scan(&event.ID,&event.Name,&event.Description,&event.Location,&event.DateTime,&event.UserID)
		if err!=nil{
			return nil,err
		}
		events = append(events, event) 
	}
	return events,nil
}

func GetEventByID(id int64) (*Event, error) {
	var e Event
	query := "SELECT * FROM events WHERE id = ?"
	rows := db.DB.QueryRow(query, id)
	 // advance the cursor
	err := rows.Scan(&e.ID, &e.Name, &e.Description, &e.Location, &e.DateTime, &e.UserID);
	if err!=nil{
		return nil,err
	}

	return &e, nil
}

func (event Event) Update()error{
	query := `
	UPDATE events
	SET name = ?, description = ?,location = ?,dateTime = ?
	WHERE id =? `

	stmt , err := db.DB.Prepare(query)
	if err != nil{
		return err
	}

	defer stmt.Close()

	_,err = stmt.Exec(event.Name,event.Description,event.Location,event.DateTime,event.ID)
	return err
}

func DeleteEventByID(id int64) error {
	query := "DELETE FROM events WHERE id = ?"
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(id)
	return err
}

func (e Event) Register(userId int64) error{
	query := `INSERT INTO registrations(event_id,user_id) VALUES(?,?)`
	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}
	defer stmt.Close()
	
	_ ,err = stmt.Exec(e.ID, userId)		

	if err!=nil{
		return err
	}

	return nil
}

func (e Event) UnRegister(userId int64) error {
	// Correct the table name from 'registrartions' to 'registrations'
	query := `DELETE FROM registrations WHERE event_id = ? AND user_id = ?`
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(e.ID, userId)
	return err
}


func GetSearchedEvents(searchString string) ([]Event, error) {
	query := `SELECT * FROM events WHERE name LIKE ? OR description LIKE ? OR location LIKE ?`
	// add wildcards for partial matching
	pattern := "%" + searchString + "%"
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	rows, err := stmt.Query(pattern, pattern, pattern)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var events []Event
	for rows.Next() {
		var event Event
		err := rows.Scan(&event.ID, &event.Name, &event.Description, &event.Location, &event.DateTime, &event.UserID)
		if err != nil {
			return nil, err
		}
		events = append(events, event)
	}
	return events, nil
}