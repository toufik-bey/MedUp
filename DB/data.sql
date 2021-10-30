use db;

insert into users
	(email, password, phone, firstname, lastname, sex, birth_date, lang, photo, subscribe_date, type) VALUES
    ('aymen@aymen.com', '123', '0784777777', 'Aymen', 'ghemam', 1, curdate(), 1, '../assets/avatar.jpg', curdate(), 1),
    ('youcef@youcef.com', '123', '0777777777', 'Youcef', 'hamaidi', 1, curdate(), 1, '../assets/avatar.jpg', curdate(), 1),
    ('younes@younes.com', '123', '0777777777', 'younes', 'bourennane', 1, curdate(), 1, '../assets/avatar.jpg', curdate(), 1);    

insert into addresses(longitude, latitude, wilaya, commune) values
    ('50', '50', 'Alger', 'Bab Ezzoua');
    
insert into specialities(speciality_name) values
    ('generaliste'),
    ('dentiste');
    
insert into doctors(id_doctor, id_speciality, id_address, work_phone, session_duration, isApprouved, description) values
	(1, 1, 1, '0555555555', 30, 1, 'this is the description...'),
    (2, 2, 1, '0555555555', 30, 1, 'this is the description...'),
    (3, 2, 1, '0555555555', 30, 1, 'this is the description...');
    
insert into work_days(day_number, id_doctor, start_time, nbr_sessions) values
	(1, 1, '08:00:00', 8),
    (2, 1, '08:00:00', 8),
    (3, 1, '08:00:00', 8),
    (4, 1, '08:00:00', 8),
    
    (1, 2, '08:00:00', 4),
    (2, 2, '08:00:00', 4),
    (3, 2, '08:00:00', 4),
    (4, 2, '08:00:00', 4),
    
    (1, 3, '08:00:00', 4),
    (2, 3, '08:00:00', 4),
    (3, 3, '08:00:00', 4),
    (4, 3, '08:00:00', 4);