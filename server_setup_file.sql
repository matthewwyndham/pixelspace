CREATE TABLE pixels (
    id SERIAL PRIMARY KEY NOT NULL,
    x SMALLINT NOT NULL,
    y SMALLINT NOT NULL,
    r SMALLINT NOT NULL,
    g SMALLINT NOT NULL,
    b SMALLINT NOT NULL,
    a NUMERIC NOT NULL,
    username VARCHAR(100) DEFAULT 'anonymous',
    t TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO pixels(x, y, r, g, b, a, username) VALUES 
    (0, 0, 0, 0, 255, 1.0, 'House'),
    (1, 0, 0, 255, 0, 1.0, 'House'),
    (2, 0, 255, 0, 0, 1.0, 'House'),
    (3, 0, 0, 255, 255, 1.0, 'House'),
    (4, 0, 255, 0, 255, 1.0, 'House'),
    (1, 1, 255, 255, 255, 1.0, 'House'),
    (2, 1, 255, 255, 0, 1.0, 'House'),
    (3, 1, 100, 100, 100, 1.0, 'House')
;