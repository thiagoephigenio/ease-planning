CREATE TABLE public.users
(
    id serial NOT NULL,
    name text,
    email text,
    password text,
    PRIMARY KEY (id)
);

CREATE TABLE public.tasks
(
    id serial NOT NULL,
    description text,
    priority text,
    author integer,
    sponsor integer,
    deadline text,
    PRIMARY KEY (id),
    CONSTRAINT author__user FOREIGN KEY (author)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT sponsor_user FOREIGN KEY (sponsor)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

INSERT INTO public.users(
	name, email, password)
	VALUES ('Thiago Ephigenio', 'teste@teste.com', '123');

INSERT INTO public.users(
	name, email, password)
	VALUES ('John Doe', 'teste2@teste.com', '123');

INSERT INTO public.users(
	name, email, password)
	VALUES ('Jane Doe', 'teste3@teste.com', '123');

