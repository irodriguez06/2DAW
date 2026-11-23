IF OBJECT_ID(N'dbo.Likes', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Likes (
        id UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_Likes PRIMARY KEY
            CONSTRAINT DF_Likes_Id DEFAULT NEWID(),

        track_id UNIQUEIDENTIFIER NOT NULL,

        [like] INT NOT NULL,

        [date] DATETIME2 NOT NULL
            CONSTRAINT DF_Likes_Date DEFAULT SYSDATETIME(),

        CONSTRAINT CK_Likes_Value CHECK ([like] IN (-1, 1)),

        CONSTRAINT FK_Likes_Track
            FOREIGN KEY (track_id)
            REFERENCES dbo.Track(id)
    );
END;
