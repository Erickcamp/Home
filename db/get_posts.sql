
SELECT p.title, p.content, p.img, u.username, p.id FROM posts p
JOIN users u on p.author_id = u.id
ORDER BY author_id ASC;