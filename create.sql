CREATE TABLE public.users (
	userid varchar(50) NOT NULL,
	username varchar(50) unique NOT NULL,
	password varchar(50) NOT NULL,
	fullname varchar(50) NULL,
	email varchar(50) unique NULL,
	role varchar(50) NOT NULL DEFAULT 'User'::character varying,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	updated_at timestamp NULL,
	updated_by varchar(50) NULL,
	CONSTRAINT pk_users PRIMARY KEY (userid)
);

CREATE TABLE public.questions (
	questionid varchar(50) NOT NULL,
	surveyid varchar(50) NOT NULL,
	type varchar(50) NOT NULL,
	is_required boolean NOT NULL default false,
	fullquestion text NULL,
	hint text NULL,
	choices text NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	updated_at timestamp NULL,
	updated_by varchar(50) NULL,
	CONSTRAINT pk_questions PRIMARY KEY (questionid),
	CONSTRAINT fk_surveyid_surveys FOREIGN KEY (surveyid) REFERENCES surveys(surveyid)
);


CREATE TABLE public.answers (
	answerid varchar(50) NOT NULL,
	questionid varchar(50) NOT NULL,
	surveyid varchar(50) NOT NULL,
	fullanswer text NULL,
	participantid varchar(50) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	updated_at timestamp NULL,
	updated_by varchar(50) NULL,
	CONSTRAINT pk_answers PRIMARY KEY (answerid),
	CONSTRAINT fk_questionid_questions FOREIGN KEY (questionid) REFERENCES questions(questionid),
	CONSTRAINT fk_surveyid_surveys FOREIGN KEY (surveyid) REFERENCES surveys(surveyid),
	CONSTRAINT fk_participantid_participants FOREIGN KEY (participantid) REFERENCES participants(participantid)
);


CREATE TABLE public.surveys (
	surveyid varchar(50) NOT NULL,
	surveyname varchar(128) NOT NULL,
	slug varchar(128) NOT NULL,
	userid varchar(50) NOT NULL,
	accesstype varchar(50) NOT NULL DEFAULT 'User'::character varying,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	updated_at timestamp NULL,
	updated_by varchar(50) NULL,
	CONSTRAINT pk_surveys PRIMARY KEY (surveyid),
	CONSTRAINT fk_userid_users FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE public.participants (
	participantid varchar(50) NOT NULL,
	participantname varchar(128) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	updated_at timestamp NULL,
	updated_by varchar(50) NULL,
	CONSTRAINT pk_participants PRIMARY KEY (participantid)
);