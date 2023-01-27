# RFID ESP WebSocketIO Backend

## Program Start In Development Mode
```
npm run dev
```

## Program Start In Normal Mode
```
npm start
```

## Endpoints SwaggerUI
- Future....

## Users

- Main URL= http://xyí:3001/user

- Create User 
    - Method: POST
    - URL: /
    - BODY: {"rfId": "54902366", "enabled": 1}
    - Respons: {"message": "User create Successfully"}
---
- Update User 
    - Method: PUT
    - URL: /
    - BODY: {"rfId": "54902366", "enabled": 1} (Just enter the item you want to modify. )
    - Respons: {"message": "Users update successfully","data":{"id": 1,"rfId": "54902366","enabled": true}}
---
- Get User By ID
    - Method: GET
    - URL: /1 (UserID)
    - response: OBJECT
---
- Get All Users
    - Method: GET
    - URL: /all/0/10 (offset, limit)
    - response: OBJECT
---
- Get Users By Enabled
    - Method: GET
    - URL: /enabled/1 (1 = true / 0 = false)
    - response: OBJECT
---
- Get Users By RFID
    - Method: GET
    - URL: /rfId/432523 (RFID Numbers)
    - response: OBJECT
---
- Delete Users
    - Method: DELETE
    - URL:/1 (UserID)
    - response: OBJECT
---
### User Connect Socket Rooms 

- Add User To Room
    - Method: POST
    - BODY: {"roomId": 1, "userId": 1}
    - URL: /usertoroom/
    - response: OBJECT
---
- Delete User From Room
    - Method: DELETE
    - URL: /usertoroom/1 (userID)
    - response: OBJECT
---
---
## Socket Rooms

- Main URL= http://xyí:3001/socketroom

- Create Room 
    - Method: POST
    - URL: /
    - BODY: {"roomName": "Szoba", "enabled": 1}
    - Respons: {"message": "SocketRooms create Successfully"}
---
- Update User 
    - Method: PUT
    - URL: /
    - BODY: {"roomName": "Szoba", "enabled": 1} (Just enter the item you want to modify. )
    - Respons: OBJECT
---
- Get User By ID
    - Method: GET
    - URL: /1 (UserID)
    - response: OBJECT
---
- Get All Rooms
    - Method: GET
    - URL: /all/0/10 (offset, limit)
    - response: OBJECT
---
- Get Rooms By Enabled
    - Method: GET
    - URL: /enabled/1 (1 = true / 0 = false)
    - response: OBJECT
---
- Get Rooms By Name
    - Method: GET
    - URL: /name/Szoba (Room Name)
    - response: OBJECT
---
- GetUsersInSocketRoomsByRoomId
   - Method: GET
    - URL: /usersinroom/1 (Get userCards in room)
    - response: OBJECT
---
- Delete Users
    - Method: DELETE
    - URL: /1 (UserID)
    - response: OBJECT
---
---
## Logs

- Main URL= http://xyí:3001/logs

- Get User By ID
    - Method: GET
    - URL: /1 (UserID)
    - response: OBJECT
---
- Get User By RoomID
    - Method: GET
    - URL: /roomid/1 (RoomId)
    - response: OBJECT
---
- Get User By UserID
    - Method: GET
    - URL: /userid/1 (UserID)
    - response: OBJECT
---
- Get User By RoomName
    - Method: GET
    - URL: /roomname/Szoba (Room Name)
    - response: OBJECT
---
- Get User By UserRFID
    - Method: GET
    - URL: /userrfid/543212 (RFID Numbers)
    - response: OBJECT
---
- Get All Rooms
    - Method: GET
    - URL: /all/0/10 (offset, limit)
    - response: OBJECT
---