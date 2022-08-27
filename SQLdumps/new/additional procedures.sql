--edit review

CREATE OR REPLACE procedure editReview(pID in NUMBER, uID in number, comment in VARCHAR2, uRating in number) IS
	rID NUMBER;
BEGIN
	select REVIEWID into rID from PROPERTYREVIEW where PROPERTYID=pID and GUESTID=uID;
	UPDATE PROPERTYREVIEW set COMMENTFORPROPERTY=comment, RATING=uRating where REVIEWID=rID;
end;
/

--edit ta review

CREATE OR REPLACE procedure editTAReview(ntaID in NUMBER, uID in number, comment in VARCHAR2, uRating in number) IS
	rID number;
BEGIN
	select REVIEWID into rID from TAREVIEW where TAID=ntaID and USERID=uID;
	UPDATE TAREVIEW set COMMENTFORTA=comment, RATING=uRating where REVIEWID=rID;
end;
/

--remove user

CREATE OR REPLACE procedure removeUser(uID IN NUMBER) IS
begin
	update AIRBNBUSER set status='block' where USERID=uID;
	DELETE from PROPERTY where HOSTID=uID;
	delete from GUEST where GUESTID=uID;
	delete from HOST where HOSTID=uID;
END;
/

--find type (host or guest) function

create or REPLACE FUNCTION find_type(uID in NUMBER) return varchar2 AS
result NUMBER;
begin
	select count(*) into result from HOST where HOSTID=uID;
	if result = 0 THEN
		return 'GUEST';
	ELSE
		return 'HOST';
	end if;
end;
/