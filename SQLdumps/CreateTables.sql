-- DROP TABLE Admin;
-- 
-- DROP TABLE TRANSACTIONS;
-- 
-- DROP TABLE VisitedTA;
-- DROP TABLE TAReview;
-- DROP TABLE TAPhoto;
-- 
-- DROP TABLE TouristAttraction;
-- 
-- DROP TABLE WishList;
-- DROP TABLE Complaint;
-- 
-- DROP TABLE Reservation;
-- 
-- DROP TABLE PropertyReview;
-- 
-- DROP TABLE AvailableBookingSlot;
-- DROP TABLE PropertyPhoto;
-- DROP TABLE PropertyAmenities;
-- 
-- DROP TABLE Property;
-- DROP TABLE Location;
-- DROP TABLE Message;
-- 
-- DROP TABLE Guest;
-- DROP TABLE Host;
-- DROP TABLE UserPhoto;
-- DROP TABLE AirBNBUser;

CREATE TABLE AirBNBUser(
	
	UserID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	FirstName VARCHAR(20) NOT NULL,
	LastName VARCHAR(20) NOT NULL,
	Dob DATE NOT NULL,
	PhoneNo VARCHAR(15) NOT NULL UNIQUE,
	Email VARCHAR(200) NOT NULL UNIQUE,
	Password VARCHAR(20) NOT NULL,
	status VARCHAR2(10),
	
	PRIMARY KEY(UserID)

);

CREATE TABLE UserPhoto(
	UserID INT,
	ProfileImg VARCHAR(2000),
	
	PRIMARY KEY(UserID),
	FOREIGN KEY(UserID)
	REFERENCES AirBNBUser(UserID)
	ON DELETE CASCADE

);

CREATE TABLE Host(
	
	HostID INT,
	BankAccount VARCHAR2(30) UNIQUE NOT NULL,
	
	PRIMARY KEY(HostID),
	FOREIGN KEY(HostID)
	REFERENCES AirBNBUser(UserID)
	ON DELETE CASCADE 
	
);

CREATE TABLE Guest(
	
	GuestID INT,
	CreditCard VARCHAR2(30) UNIQUE NOT NULL,
	
	PRIMARY KEY(GuestID),
	FOREIGN KEY(GuestID)
	REFERENCES AirBNBUser(UserID)
	ON DELETE CASCADE 
	
);


-- CREATE TABLE BankAccount(
-- 	
-- 	AccountNo INT,
-- 	AccountType VARCHAR(20) NOT NULL,
-- 	RoutingNo INT NOT NULL,
-- 	HostID INT NOT NULL,
-- 	
-- 	PRIMARY KEY(AccountNo),
-- 	FOREIGN KEY(HostID)
-- 	REFERENCES Host(HostID)
-- 	ON DELETE CASCADE 
-- 	
-- );

-- CREATE TABLE CreditCard(
-- 	
-- 	CardNo INT,
-- 	CSV INT NOT NULL,
-- 	ExpirationDate DATE  NOT NULL,
-- 	CardHolderName VARCHAR(50) NOT NULL,
-- 	CardType CHAR(6) NOT NULL,
-- 	Address VARCHAR(100),
-- 	GuestID INT NOT NULL,
-- 	
-- 	PRIMARY KEY(CardNo),
-- 	FOREIGN KEY(GuestID) 
-- 	REFERENCES Guest(GuestID)
-- 	ON DELETE CASCADE
-- 	
-- 
-- );

CREATE TABLE Message(
	
	MessageID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	HostID INT NOT NULL,
	GuestID INT NOT NULL,
	MessageFrom INT NOT NULL,
	MessageTo INT NOT NULL,
	Body VARCHAR(1000),
	Created TIMESTAMP NOT NULL,
	
	PRIMARY KEY(MessageID),
	FOREIGN KEY(HostID)
	REFERENCES Host(HostID)
	ON DELETE CASCADE,
	FOREIGN KEY(GuestID)
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE
	
);

CREATE TABLE Location(  -- may have to separate into different table (country)
	
	LocationID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	Country VARCHAR(20) NOT NULL,
	City VARCHAR(20),
	
	PRIMARY KEY(LocationID)

);

CREATE TABLE Property(
	
	PropertyID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	HostID INT NOT NULL,
	--AvgRating NUMBER(2,1),
	--NumOfRatings INT DEFAULT 0,
	PropertyName VARCHAR(50),
	PricePerNight NUMBER(38,2),
	LocationID INT NOT NULL,
	Street VARCHAR(100),
	Description VARCHAR(1000),
	
	HouseType CHAR(20),
	bathroomCnt INT,
	BedroomCNT INT,
	GuestNum INT NOT NULL,
	
	IsRefundable CHAR CHECK(IsRefundable IN ('0','1')),
	CancellationPeriod INT,
	CancellationType VARCHAR(10),
	RefundRate NUMBER(2,1),
	
	AvailableFrom DATE,
	AvailableUpto DATE,
	
	status VARCHAR2(10),
	
	PRIMARY KEY(PropertyID),
	FOREIGN KEY(HostID) 
	REFERENCES Host(HostID)
	ON DELETE CASCADE,
	FOREIGN KEY(LocationID) 
	REFERENCES Location(LocationID)
	ON DELETE SET NULL
);

CREATE TABLE PropertyAmenities(

	PropertyID INT,
	
	HasWifi CHAR  DEFAULT '0' CHECK(HasWifi IN ('0','1')),
	HasAC CHAR  DEFAULT '0' CHECK(HasAC IN ('0','1')),
	HasTV CHAR DEFAULT '0' CHECK(HasTV IN ('0','1')) ,
	HasKitchen CHAR DEFAULT '0' CHECK(HasKitchen IN ('0','1')) ,
	HasHeating CHAR DEFAULT '0' CHECK(HasHeating IN ('0','1')) ,
	HasWasher CHAR DEFAULT '0' CHECK(HasWasher IN ('0','1')),
	HasIron CHAR DEFAULT '0' CHECK(HasIron IN ('0','1')) ,
	HasDryer CHAR DEFAULT '0' CHECK(HasDryer IN ('0','1')) ,

	
	HasParking CHAR DEFAULT '0' CHECK(HasParking IN ('0','1')) ,
	HasPool CHAR DEFAULT '0' CHECK(HasPool IN ('0','1')) ,
	HasGym CHAR DEFAULT '0' CHECK(HasGym IN ('0','1')) ,
-- 	HasFirePlace CHAR DEFAULT '0' CHECK(HasFirePlace IN ('0','1')) ,
	HasFrontyard CHAR DEFAULT '0' CHECK(HasFrontyard IN ('0','1')) ,
	HasBackyard CHAR DEFAULT '0' CHECK(HasBackyard IN ('0','1')) ,
	
	PRIMARY KEY(PropertyID),
	FOREIGN KEY(PropertyID) 
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE
	
);

CREATE TABLE PropertyPhoto(

	PropertyID INT,
	ImageFile VARCHAR(2000),
	
	PRIMARY KEY(ImageFile),
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE

);

CREATE TABLE AvailableBookingSlot(  -- may need a lots of trigger
	
	PropertyID INT,
	StartDate DATE,
	EndDate DATE,


	PRIMARY KEY(PropertyID,StartDate),
	FOREIGN KEY(PropertyID) 
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE
);

CREATE TABLE PropertyReview(
	
	ReviewID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	PropertyID INT NOT NULL,
	GuestID INT NOT NULL,
	CommentForProperty VARCHAR(1000),
	
	Rating NUMBER(2,1),

	PRIMARY KEY(ReviewID),
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE,
	FOREIGN KEY(GuestID)
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE 

);



CREATE TABLE Reservation(
	
	ReservationID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	GuestID INT NOT NULL,
	PropertyID INT NOT NULL,
	
	CheckInDate DATE,
	CheckOutDate DATE,
	
	GuestNum INT NOT NULL,
	TotalPrice NUMBER(38,2) NOT NULL,
	
	PRIMARY KEY(ReservationID),
	
	FOREIGN KEY(GuestID)
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE,
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE

);

CREATE TABLE Complaint(
	
	ComplaintID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	ComplaintByID INT NOT NULL,
	ComplaintAgainstID INT NOT NULL,
	PropertyID INT NOT NULL,
	ReservationID INT NOT NULL,
	
	ComplaintType VARCHAR(20),
	Description VARCHAR(1000),

	PRIMARY KEY(ComplaintID),
	FOREIGN KEY(ComplaintByID)
	REFERENCES AirBNBUser(UserID)
	ON DELETE CASCADE,
	FOREIGN KEY(ComplaintAgainstID)
	REFERENCES AirBNBUser(UserID)
	ON DELETE CASCADE,
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE,
	FOREIGN KEY(ReservationID)
	REFERENCES Reservation(ReservationID)
	ON DELETE CASCADE
);

CREATE TABLE WishList(
	GuestID INT,
	PropertyID INT,
	
	PRIMARY KEY(GuestID,PropertyID),
	FOREIGN KEY(GuestID)
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE,
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE

);

CREATE TABLE TouristAttraction(
	
	taID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	title VARCHAR(50),
	Description VARCHAR(1000),
	Url VARCHAR(2000) NOT NULL,
	Type VARCHAR2(50),
	LocationID INT NOT NULL,
	--AvgRating NUMBER(2,1),
	--NumOfRatings INT DEFAULT 0,
	street VARCHAR(100) NOT NULL,
	
	PRIMARY KEY(taID),
	FOREIGN KEY(LocationID)
	REFERENCES Location(LocationID)
	ON DELETE CASCADE
	
);

CREATE TABLE TAPhoto(
	
	PhotoID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	taID INT ,
	ImageFile VARCHAR(2000) NOT NULL,
	
	PRIMARY KEY(PhotoID),
	FOREIGN KEY(taID)
	REFERENCES TouristAttraction(taID)
	ON DELETE CASCADE
	
);

CREATE TABLE TAReview(

	ReviewID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	taID INT NOT NULL,
	userID INT NOT NULL,
	CommentForTA VARCHAR(1000),
	
	Rating NUMBER(2,1),

	PRIMARY KEY(ReviewID),
	FOREIGN KEY(taID)
	REFERENCES TouristAttraction(taID)
	ON DELETE CASCADE,
	FOREIGN KEY(userID)
	REFERENCES AirBNBUser(userID)
	ON DELETE CASCADE 
	
);

create table VisitedTA(
    UserID INT,
    taID INT,
    PRIMARY KEY(UserID, taID),
    FOREIGN KEY(UserID) REFERENCES AirBNBUser(UserID)
    ON DELETE CASCADE,
    FOREIGN KEY(taID) REFERENCES TouristAttraction(taID)
    ON DELETE CASCADE
);

create table Transactions(
    TransactionID Number GENERATED by DEFAULT as IDENTITY,
    HostID INT,
    GuestID INT,
    ReservationID INT,
    Type VARCHAR2(10),
    Amount Number,
    DateOfTransaction DATE,

    PRIMARY KEY(TransactionID),
    FOREIGN KEY(HostID) references Host(HostID)
    ON DELETE CASCADE,
    FOREIGN KEY(GuestID) references Guest(GuestID)
    ON DELETE CASCADE,
    FOREIGN KEY(ReservationID) references reservation(ReservationID)
    ON DELETE CASCADE
);

CREATE TABLE Admin(
	
	AdminID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	FirstName VARCHAR(20) NOT NULL,
	LastName VARCHAR(20),
	Email VARCHAR(30) NOT NULL UNIQUE,
	Password VARCHAR(20) NOT NULL,
	Dob DATE,
	PhoneNo VARCHAR(15) NOT NULL,
	
	PRIMARY KEY(AdminID)

);

-- DROP SEQUENCE REVIEW_SEQ;
CREATE SEQUENCE "REVIEW_SEQ" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;


CREATE OR REPLACE PROCEDURE "ADD_REVIEW"(A_PROPERTYID IN NUMBER,A_GUESTID IN NUMBER,A_COMMENTFORPROPERTY IN VARCHAR2,A_RATING IN NUMBER) AS
		A_REVIEW_ID NUMBER;
		RESULT VARCHAR2(200);
BEGIN
    A_REVIEW_ID := REVIEW_SEQ.NEXTVAL;
    INSERT INTO PROPERTYREVIEW(ReviewID,PropertyID,GuestID,CommentForProperty,Rating)
		VALUES(A_REVIEW_ID,A_PROPERTYID,A_GUESTID,A_COMMENTFORPROPERTY,A_RATING);

    RESULT := 'Review is added';

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RESULT := 'Review already exists';
    WHEN OTHERS THEN
        RESULT := 'Please fill up the field correctly';
END;

-- BEGIN
-- 	ADD_REVIEW(2,3,'goooood',3);
-- END;

-- DROP SEQUENCE REVIEW_SEQ;
CREATE SEQUENCE "ADMIN_SEQ" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;


CREATE OR REPLACE PROCEDURE "ADD_ADMIN"( FIRSTNAME IN VARCHAR2,LASTNAME IN VARCHAR2,EMAIL IN VARCHAR2,PASSWORD IN VARCHAR2,DOB IN DATE,PHONENO IN VARCHAR2 ) AS
		A_ADMIN_ID NUMBER;
		RESULT VARCHAR2(200);
BEGIN
    A_ADMIN_ID := ADMIN_SEQ.NEXTVAL;
    INSERT INTO ADMIN
		VALUES(A_ADMIN_ID,FIRSTNAME,LASTNAME,EMAIL,PASSWORD,DOB,PHONENO);

    RESULT := 'Admin is added';

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RESULT := 'Admin already exists';
    WHEN OTHERS THEN
        RESULT := 'Please fill up the field correctly';
END;

-- BEGIN
-- 	ADD_REVIEW(2,3,'goooood',3);
-- END;


-- DROP SEQUENCE LOCATION_SEQ;
CREATE SEQUENCE "LOCATION_SEQ" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- DROP FUNCTION FIND_LOCATION;

CREATE OR REPLACE FUNCTION find_location(nCountry in VARCHAR2, nCity in VARCHAR2)
RETURN number IS
any_found number;            -----------check the order here,,,,first country then city!!!!------------
mCity VARCHAR2(20);
mCountry VARCHAR2(20);
A_LOCATION_ID NUMBER;
BEGIN
	mCity := UPPER(nCity);
	mCountry := UPPER(nCountry);
	
	select count(*) into any_found from LOCATION where UPPER(CITY) = mCity and UPPER(COUNTRY) = mCountry;
	
	mCity := INITCAP(nCity);
	mCountry := INITCAP(nCountry);
	
	if any_found = 0 then
		A_LOCATION_ID := LOCATION_SEQ.NEXTVAL;
		insert into LOCATION(LOCATIONID, CITY, COUNTRY) VALUES(A_LOCATION_ID,mCity, mCountry);
	else
		select LOCATIONID into A_LOCATION_ID FROM LOCATION where CITY = mCity and COUNTRY = mCountry;
	end if;
	
-- 			DBMS_OUTPUT.PUT_LINE(A_LOCATION_ID);
	return A_LOCATION_ID;
end;


DECLARE
	loc_id NUMBER;
BEGIN
	loc_id := find_location('Bangladesh','Dhaka');
	
END;
