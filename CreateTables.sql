DROP TABLE Admin;

DROP TABLE TAReview;
DROP TABLE TAPhoto;
DROP TABLE TouristAttraction;

DROP TABLE WishList;

DROP TABLE Reservation;

DROP TABLE PropertyReview;

DROP TABLE Complaint;
DROP TABLE Bedroom;
DROP TABLE AvailableBookingSlot;
DROP TABLE PropertyPhoto;

DROP TABLE Property;
DROP TABLE Location;
DROP TABLE Message;

DROP TABLE BankAccount;
DROP TABLE CreditCard;

DROP TABLE HostReview;

DROP TABLE Host;
DROP TABLE Guest;
DROP TABLE AirBNBUser;

CREATE TABLE AirBNBUser(
	
	UserID INT,
	FirstName VARCHAR(20) NOT NULL,
	LastName VARCHAR(20),
	Dob DATE,
	Gender CHAR CHECK(Gender IN ('M','F')),
	ProfileImgTitle VARCHAR(20),
	ProfileImg BLOB,
	PhoneNo VARCHAR(15) NOT NULL,
	Address VARCHAR(100),
	Email VARCHAR(20) NOT NULL,
	Password VARCHAR(20) NOT NULL,
	LogInCnt INT DEFAULT 0,
	LastLogIn TIMESTAMP,
	Created TIMESTAMP,
	
	PRIMARY KEY(UserID)

);

CREATE TABLE Host(
	
	HostID INT,
	AvgRating NUMBER(2,1),
	NumOfRatings INT DEFAULT 0,
	
	PRIMARY KEY(HostID),
	FOREIGN KEY(HostID)
	REFERENCES AirBNBUser(UserID)
	ON DELETE CASCADE 
	
);

CREATE TABLE Guest(
	
	GuestID INT,
	AvgRating NUMBER(2,1),
	NumOfRatings INT DEFAULT 0,
	
	PRIMARY KEY(GuestID),
	FOREIGN KEY(GuestID)
	REFERENCES AirBNBUser(UserID)
	ON DELETE CASCADE 
	
);

CREATE TABLE HostReview(
	
	ReviewID INT,
	HostID INT NOT NULL,
	GuestID INT NOT NULL,
	ReviewType VARCHAR(20),
	Rating NUMBER(2,1),
	Created TIMESTAMP NOT NULL,
	Modified TIMESTAMP,
	CommentForHost VARCHAR(1000),
	
	PRIMARY KEY(ReviewID),
	FOREIGN KEY(HostID)
	REFERENCES Host(HostID)
	ON DELETE CASCADE,
	FOREIGN KEY(GuestID)
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE 

);

CREATE TABLE BankAccount(
	
	AccountNo INT,
	AccountType VARCHAR(20) NOT NULL,
	RoutingNo INT NOT NULL,
	HostID INT NOT NULL,
	
	PRIMARY KEY(AccountNo),
	FOREIGN KEY(HostID)
	REFERENCES Host(HostID)
	ON DELETE CASCADE 
	
);

CREATE TABLE CreditCard(
	
	CardNo INT,
	CSV INT NOT NULL,
	ExpirationDate DATE  NOT NULL,
	CardHolderName VARCHAR(50) NOT NULL,
	CardType CHAR(6) NOT NULL,
	Address VARCHAR(100),
	GuestID INT NOT NULL,
	
	PRIMARY KEY(CardNo),
	FOREIGN KEY(GuestID) 
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE
	

);

CREATE TABLE Message(
	
	MessageID INT,
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

CREATE TABLE Location(
	
	LocationID INT,
	Country VARCHAR(20) NOT NULL,
	State VARCHAR(20),
	City VARCHAR(20),
	Street VARCHAR(50),
	
	PRIMARY KEY(LocationID)

);

CREATE TABLE Property(
	
	PropertyID INT,
	HostID INT NOT NULL,
	AvgRating NUMBER(2,1),
	NumOfRatings INT DEFAULT 0,
	PropertyName VARCHAR(50),
	PricePerNight NUMBER(38,2),
	Created TIMESTAMP NOT NULL,
	LocationID INT NOT NULL,
	SpecificAddress VARCHAR(100),
	Description VARCHAR(1000),
	
	HasWifi CHAR CHECK(HasWifi IN ('0','1')),
	HasAC CHAR CHECK(HasAC IN ('0','1')),
	HasTV CHAR CHECK(HasTV IN ('0','1')),
	HasDining CHAR CHECK(HasDining IN ('0','1')),
	HasKitchen CHAR CHECK(HasKitchen IN ('0','1')),
	HasParking CHAR CHECK(HasParking IN ('0','1')),
	HasHeater CHAR CHECK(HasHeater IN ('0','1')),
	
	HouseType CHAR(20),
	bathroomCnt INT,
	BedroomCNT INT,
	GuestNum INT NOT NULL,
	
	IsRefundable CHAR CHECK(IsRefundable IN ('0','1')),
	CancellationPeriod INT,
	CancellationType VARCHAR(10),
	RefundRate NUMBER(2,1),
	
	CheckInDate DATE,
	CheckOutDate DATE,
	
	
	PRIMARY KEY(PropertyID),
	FOREIGN KEY(HostID) 
	REFERENCES Host(HostID)
	ON DELETE CASCADE,
	FOREIGN KEY(LocationID) 
	REFERENCES Location(LocationID)
	ON DELETE SET NULL
);

CREATE TABLE PropertyPhoto(

	PropertyID INT,
	PhotoTitle VARCHAR(20),
	ImageFile BLOB NOT NULL,
	
	PRIMARY KEY(PropertyID,PhotoTitle),
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE

);

CREATE TABLE AvailableBookingSlot(
	
	PropertyID INT,
	StartDate DATE,
	EndDate DATE,


	PRIMARY KEY(PropertyID,StartDate,EndDate),
	FOREIGN KEY(PropertyID) 
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE
);

CREATE TABLE Bedroom(
	
	PropertyID INT,
	RoomNumber INT,
	RoomType VARCHAR(20),
	BedType VARCHAR(10),
	BedCnt INT,
	
	PRIMARY KEY(PropertyID,RoomNumber),
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE

);

CREATE TABLE Complaint(
	
	ComplaintID INT,
	GuestID INT NOT NULL,
	HostID INT NOT NULL,
	PropertyID INT NOT NULL,
	ComplaintType VARCHAR(20),
	Category VARCHAR(20),
	Description VARCHAR(1000),
	Image BLOB,

	PRIMARY KEY(ComplaintID),
	FOREIGN KEY(GuestID)
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE,
	FOREIGN KEY(HostID)
	REFERENCES Host(HostID)
	ON DELETE CASCADE,
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE
);

CREATE TABLE PropertyReview(
	
	ReviewID INT,
	PropertyID INT NOT NULL,
	GuestID INT NOT NULL,
	ReviewType VARCHAR(20),
	Created TIMESTAMP NOT NULL,
	Modified TIMESTAMP,
	CommentForProperty VARCHAR(1000),
	
	OverAllRating NUMBER(2,1),
	LocationRating NUMBER(2,1),
	CleanlinessRating NUMBER(2,1),
	CommunicationRating NUMBER(2,1),
	CheckInRating NUMBER(2,1),
	AccuracyRating NUMBER(2,1),

	PRIMARY KEY(ReviewID),
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE,
	FOREIGN KEY(GuestID)
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE 

);



CREATE TABLE Reservation(
	
	ReservationID INT,
	GuestID INT NOT NULL,
	PropertyID INT NOT NULL,
	
	CheckInDate DATE,
	CheckOutDate DATE,
	
	GuestNum INT NOT NULL,
	Created TIMESTAMP NOT NULL,
	TotalPrice NUMBER(38,2) NOT NULL,
	AmountPaid NUMBER(38,2),
	
	IsCancelled CHAR NOT NULL CHECK(IsCancelled IN ('0','1')),
	CancelDate TIMESTAMP,
	RefundAmt NUMBER(38,2),
	RefundPaid NUMBER(38,2),
	
	PRIMARY KEY(ReservationID),
	
	FOREIGN KEY(GuestID)
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE,
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE

);

CREATE TABLE WishList(
	GuestID INT,
	Name VARCHAR(100),
	PropertyID INT,
	Created TIMESTAMP NOT NULL,
	Modified TIMESTAMP,
	
	PRIMARY KEY(GuestID,Name,PropertyID),
	FOREIGN KEY(GuestID)
	REFERENCES Guest(GuestID)
	ON DELETE CASCADE,
	FOREIGN KEY(PropertyID)
	REFERENCES Property(PropertyID)
	ON DELETE CASCADE

);

CREATE TABLE TouristAttraction(
	
	taID INT,
	title VARCHAR(50),
	Description VARCHAR(1000),
	Url BLOB NOT NULL,
	LocationID INT NOT NULL,
	AvgRating NUMBER(2,1),
	NumOfRatings INT DEFAULT 0,
	SpecificAddress VARCHAR(100) NOT NULL,
	
	PRIMARY KEY(taID),
	FOREIGN KEY(LocationID)
	REFERENCES Location(LocationID)
	ON DELETE CASCADE
	
);

CREATE TABLE TAPhoto(
	
	taID INT ,
	PhotoTitle VARCHAR(20),
	ImageFile BLOB NOT NULL,
	
	PRIMARY KEY(taID,PhotoTitle),
	FOREIGN KEY(taID)
	REFERENCES TouristAttraction(taID)
	ON DELETE CASCADE
	
);

CREATE TABLE TAReview(

	ReviewID INT,
	taID INT NOT NULL,
	userID INT NOT NULL,
	ReviewType VARCHAR(20),
	Created TIMESTAMP NOT NULL,
	Modified TIMESTAMP,
	CommentForTA VARCHAR(1000),
	
	OverAllRating NUMBER(2,1),
	LocationRating NUMBER(2,1),
	CommunicationRating NUMBER(2,1),
	AccuracyRating NUMBER(2,1),

	PRIMARY KEY(ReviewID),
	FOREIGN KEY(taID)
	REFERENCES TouristAttraction(taID)
	ON DELETE CASCADE,
	FOREIGN KEY(userID)
	REFERENCES AirBNBUser(userID)
	ON DELETE CASCADE 
	
);

CREATE TABLE Admin(
	
	AdminID INT,
	FirstName VARCHAR(20) NOT NULL,
	LastName VARCHAR(20),
	Email VARCHAR(30) NOT NULL,
	Password VARCHAR(20) NOT NULL,
	Dob DATE,
	Gender CHAR CHECK(Gender IN ('M','F')),
	ProfileImgTitle VARCHAR(20),
	ProfileImg BLOB,
	PhoneNo VARCHAR(15) NOT NULL,
	Address VARCHAR(100),
	Role VARCHAR(20),
	
	PRIMARY KEY(AdminID)

);

