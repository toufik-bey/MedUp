CREATE SCHEMA IF NOT EXISTS db DEFAULT CHARACTER SET utf8 ;
USE `db` ;

CREATE TABLE IF NOT EXISTS `users` (
  id_user INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  phone varchar(10) not null,
  firstName VARCHAR(255) not NULL,
  lastname VARCHAR(255) ,
  Sex tinyint(1) not NULL,
  birth_date date not null,
  lang tinyint(1) not NULL default 1,
  photo varchar(200),
  subscribe_date datetime,
  `type` tinyint not null,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `patients` (
  id_patient INT NOT NULL,
  `status` int not null default 1,
  primary key(id_patient),
  foreign key (id_patient) references users(id_user)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS addresses (
   id_address int not null auto_increment,
   longitude float ,
   latitude float ,
   wilaya varchar(30) not null,
   commune varchar(30) not null,
   PRIMARY KEY (id_address)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS specialities (
  id_speciality INT NOT NULL AUTO_INCREMENT,
  speciality_name VARCHAR(60) not null,
  PRIMARY KEY (id_speciality)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS forms (
	id_form int not null auto_increment,
	licence_photo varchar(200) not null,
    card_photo varchar(200) not null,
    primary key (id_form)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `doctors` (
   id_doctor INT NOT NULL,
   `description` varchar(500),
   id_speciality int not null,
   id_address int not null,
   id_form int default null,
   work_phone varchar(20) not null,
   session_duration int not null,
   isApprouved int not null default 0,
   PRIMARY KEY (id_doctor),
  foreign key (id_doctor) references `users`(id_user),
  foreign key (id_address) references addresses(id_address),
  foreign key (id_speciality) references specialities(id_speciality),
  foreign key (id_form) references forms(id_form)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS work_days(
    day_number int not null,
    id_doctor int not null,
    start_time time not null,
    nbr_sessions int not null,
    primary key(id_doctor, day_number),
    foreign key(id_doctor) references doctors(id_doctor)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS rdvs(
    id_doctor int not null,
    id_patient int not null,
    time_rdv datetime not null,
    state int not null default 0,
    primary key(id_doctor, id_patient, time_rdv),
    foreign key(id_doctor) references doctors(id_doctor),
    foreign key(id_patient) references patients(id_patient)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS physical_rdvs(
    id_doctor int not null,
    time_rdv datetime not null,
    primary key(id_doctor, time_rdv),
    foreign key(id_doctor) references doctors(id_doctor)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS favorites(
    id_doctor int not null,
    id_patient int not null,
    primary key(id_doctor, id_patient),
    foreign key(id_doctor) references doctors(id_doctor),
    foreign key(id_patient) references patients(id_patient)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS reviews(
    id_doctor int not null, 
    id_patient int not null,
    review int not null,
    primary key(id_doctor, id_patient),
    foreign key(id_doctor) references doctors(id_doctor),
    foreign key(id_patient) references patients(id_patient)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS gallery(
    id_doctor int not null,
    image_src varchar(300) not null,
    foreign key(id_doctor) references doctors(id_doctor)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS reports(
	id_report int not null auto_increment,
    cause varchar(400) not null,
    id_doctor int not null,
    id_patient int not null,
    primary key(id_report),
    foreign key(id_doctor) references doctors (id_doctor),
    foreign key(id_patient) references patients (id_patient)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS messages(
	id_message int not null auto_increment,
    `text` varchar(500) not null,
    date_message datetime,
    id_sender int not null,
    id_receiver int not null,
    primary key(id_message),
    foreign key(id_receiver) references users(id_user),
    foreign key(id_sender) references users(id_user)
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS chats(   
    id_doctor int not null,
    id_patient int not null,
    doctor_last_seen_message int default null,
    patient_last_seen_message int default null,
    primary key(id_doctor, id_patient),
    foreign key(id_doctor) references doctors(id_doctor),
    foreign key(id_patient) references patients(id_patient),
    foreign key(doctor_last_seen_message) references messages(id_message),
    foreign key(patient_last_seen_message) references messages(id_message)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS admins(
    id_admin int not null auto_increment,           
    useranme varchar(100),
    `password` varchar(400),
    primary key(id_admin)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS feedbacks(
    id_feedback int not null auto_increment,
    id_user int not null,
    `text` varchar(500),
    primary key(id_feedback),
    foreign key (id_user) references users(id_user)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;