CREATE TABLE public.users (
	userid varchar(90) NOT NULL,
	username varchar(50) NOT NULL,
	"password" varchar(70) NOT NULL,
	fullname varchar(50) NULL,
	email varchar(50) NULL,
	"role" varchar(50) NOT NULL DEFAULT 'User'::character varying,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	updated_at timestamp NULL,
	updated_by varchar(50) NULL,
	CONSTRAINT pk_users PRIMARY KEY (userid),
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_username_key UNIQUE (username)
);

CREATE TABLE public.questions (
	questionid varchar(50) NOT NULL,
	slug varchar(50) NOT NULL,
	fullquestion text NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	updated_at timestamp NULL,
	updated_by varchar(50) NULL,
	CONSTRAINT pk_questions PRIMARY KEY (questionid)
);


CREATE TABLE public.responses (
	responseid varchar(50) NOT NULL,
	slug varchar(200) NOT NULL,
	fullresponse text NULL,
	responder varchar(50) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL,
	updated_by varchar(50) NULL,
	email varchar NULL,
	CONSTRAINT pk_answers PRIMARY KEY (responseid)
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
	responders text NULL,
	CONSTRAINT pk_surveys PRIMARY KEY (surveyid)
);