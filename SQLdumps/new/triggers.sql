create or replace trigger reserve_trigger
after insert
on Reservation
for each row

declare
starting DATE;
newStarting DATE;
ending DATE;
newEnding DATE;
PID INT;
begin
	PID := :new.PropertyID;

	SELECT StartDate, EndDate INTO starting, ending
    FROM AvailableBookingSlot
    WHERE PropertyID = PID
    AND :new.CheckInDate between StartDate and EndDate
    AND :new.CheckOutDate between StartDate and EndDate;

    if :new.CheckInDate = starting and :new.CHECKOUTDATE != ending then
        newStarting := :new.CheckOutDate + 1;
		UPDATE AVAILABLEBOOKINGSLOT set StartDate = newStarting where PROPERTYID = PID and STARTDATE=starting and ENDDATE = ending;
				
    elsif :new.CHECKINDATE != starting and :new.CheckOutDate = ending then
        newEnding := :new.CheckInDate - 1;
		UPDATE AVAILABLEBOOKINGSLOT set ENDDATE = newEnding where PROPERTYID = PID and STARTDATE=starting and ENDDATE = ending;
				
    elsif :new.CHECKINDATE != starting and :new.CHECKOUTDATE != ending then
        newEnding := :new.CheckInDate - 1;
        newStarting := :new.CheckOutDate + 1;
				
		DELETE FROM AvailableBookingSlot
		WHERE PropertyID = PID
		AND StartDate = starting
		AND EndDate = ending;
				
        INSERT INTO AvailableBookingSlot VALUES(PID, starting, newEnding);
        INSERT INTO AvailableBookingSlot VALUES(PID, newStarting, ending);

	ELSE
		DELETE FROM AvailableBookingSlot
		WHERE PropertyID = PID
		AND StartDate = starting
		AND EndDate = ending;
    end if;
end;
/

---------------------------------------------------------------------------------------------------------

drop trigger cancel_trigger;

create or replace trigger cancel_trigger
after delete
on Reservation
for each row
declare
    starting DATE;
    newStarting DATE;
    ending DATE;
    newEnding DATE;
    PID INT;
	check1 number;
	check2 number;
	check3 number;
begin
    PID := :old.PropertyID;
	newStarting := :old.CHECKINDATE - 1;
	newEnding := :old.CHECKOUTDATE + 1;
	
	is_property_present(PID, check1);
	is_startdate_present(PID, newEnding, check2);
	is_enddate_present(PID, newStarting, check3);
	
	if check1 = 0 or (check2 = 0 and check3 = 0) then 
		insert into AVAILABLEBOOKINGSLOT VALUES(PID, :old.CHECKINDATE, :old.CHECKOUTDATE);
		
	elsif check3 != 0 and check2 = 0 then
		UPDATE AVAILABLEBOOKINGSLOT set ENDDATE = :old.CHECKOUTDATE where PROPERTYID = PID and ENDDATE = newStarting;

	elsif check2 != 0 and check3 = 0 then
        UPDATE AVAILABLEBOOKINGSLOT SET STARTDATE = :old.CHECKINDATE where PROPERTYID=PID and STARTDATE = newEnding;
	
	else 
		SELECT StartDate INTO starting
		FROM AvailableBookingSlot
		WHERE PropertyID = PID
		AND ENDDATE = newStarting;
			
		SELECT EndDate INTO ending
		FROM AvailableBookingSlot
		WHERE PropertyID = PID
		AND STARTDATE = newEnding;
			
		DELETE from AVAILABLEBOOKINGSLOT where PROPERTYID = PID and (STARTDATE = starting or ENDDATE = ending);
		INSERT into AVAILABLEBOOKINGSLOT VALUES(PID, starting, ending);
	end if;
end;
/

------------------------------------------------------------------------------------------------------------------------------

CREATE or REPLACE PROCEDURE is_property_present(PID in number, checking out number) is --procedure used in cancellation of reservation
any_found number;
	
BEGIN
	select count(*) into any_found 
	from AVAILABLEBOOKINGSLOT where PROPERTYID = PID;
	
	if any_found = 0 then
		checking := 0;
	else 
		checking := 1;
	end if;
end;
/

----------------------------------------------------------------------------------------------------------------------------------

CREATE or REPLACE PROCEDURE is_startdate_present(PID in number, checkdate in date, checking out number) is --used in cancellation of reservation
any_found number;
	
BEGIN
	select count(*) into any_found 
	from AVAILABLEBOOKINGSLOT where PROPERTYID = PID and STARTDATE = checkdate;
	
	if any_found = 0 then
		checking := 0;
	else 
		checking := 1;
	end if;
end;
/

---------------------------------------------------------------------------------------------------------------------

CREATE or REPLACE PROCEDURE is_enddate_present(PID in number, checkdate in date, checking out number) is --used in cancellation of reservation
any_found number;
	
BEGIN
	select count(*) into any_found 
	from AVAILABLEBOOKINGSLOT where PROPERTYID = PID and ENDDATE = checkdate;
	
	if any_found = 0 then
		checking := 0;
	else 
		checking := 1;
	end if;
end;
/

-------------------------------------------------------------------------------------------------------------------------------

CREATE OR REPLACE procedure find_location(nCountry in VARCHAR2, nCity in VARCHAR2, located out number) IS
any_found number;            -----------check the order here,,,,first country then city!!!!------------
mCity VARCHAR2(20);
mCountry VARCHAR2(20);
BEGIN
	mCity := UPPER(nCity);
	mCountry := UPPER(nCountry);
	
	select count(*) into any_found from LOCATION where UPPER(CITY) = mCity and UPPER(COUNTRY) = mCountry;
	
	mCity := INITCAP(nCity);
	mCountry := INITCAP(nCountry);
	
	if any_found = 0 then
		insert into LOCATION(CITY, COUNTRY) VALUES(mCity, mCountry);
	end if;
	
	select LOCATIONID into located FROM LOCATION where CITY = mCity and COUNTRY = mCountry;
	DBMS_OUTPUT.PUT_LINE(located);
end;
/

--------------------------------------------------------------------------------------------------------------------------

create or replace procedure find_rating(pID in number, rate out number, total out number) is --find rating of property
sum_rating number;
BEGIN
 	select count(*) into total from PROPERTYREVIEW where PROPERTYID = pID;
 	
 	if total = 0 THEN
 		rate := 0;
 		
 	else
 		SELECT sum(Rating) into sum_rating from PROPERTYREVIEW where PROPERTYID = pID;
 		rate := ROUND(sum_rating / total, 1);
 	end if;
 	DBMS_OUTPUT.PUT_LINE('rating is '|| rate || ' and total number is ' || total);
end;
/

----------------------------------------------------------------------------------------------------------------------------

create or replace procedure find_rating_host(hID in number, rate out number, total out number) is --find rating of host
sum_rating number;
BEGIN
	select count(*) into total from PROPERTYREVIEW JOIN PROPERTY
	ON PROPERTYREVIEW.PROPERTYID = PROPERTY.PROPERTYID where PROPERTY.HOSTID = hID;
	
	if total = 0 THEN
		rate := 0;
		
	else
		SELECT sum(Rating) into sum_rating from PROPERTYREVIEW JOIN PROPERTY 
		ON PROPERTYREVIEW.PROPERTYID = PROPERTY.PROPERTYID where PROPERTY.HOSTID = hID;
		
		rate := ROUND(sum_rating / total, 1);
	end if;
	DBMS_OUTPUT.PUT_LINE('host rating is '|| rate || ' and total number is ' || total);
end;
/