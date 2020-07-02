  
SELECT p.title, p.content, p.img, u.username FROM posts p
LEFT JOIN users u on (p.author_id = u.id)
WHERE p.title ilike ('%'||$1||'%') or p.content ilike ('%'||$1||'%') or u.username ilike ('%'||$1||'%');