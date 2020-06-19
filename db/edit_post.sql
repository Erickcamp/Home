  
UPDATE posts 
SET title = $2, img = $3, content= $4, author_id = $5
WHERE id = $1
returning *;