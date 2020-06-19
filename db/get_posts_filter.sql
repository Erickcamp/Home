  
SELECT p.title, p.content, p.img, u.username FROM posts p
JOIN users u on p.author_id = u.id
WHERE p.title ilike ('%'||$1||'%');