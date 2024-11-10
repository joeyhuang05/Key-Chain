(define-data-var connections (list 100 principal) (list))
(define-data-var bigKey principal 'SP000000000000000000002Q6VF78)

(define-public (addKey (keyid principal))
    (let 
        ((connects (var-get connections))
         (index (index-of? connects keyid)))
    
    (if (and (is-none index) (< (len connects) u100)) ;; Match the list length limit
        (ok (var-set connections (unwrap! (as-max-len? (append connects keyid) u100) (err u1))))
        (err u1)
    )
))

(define-public (removeKey (keyid principal))
    (let 
        ((connects (var-get connections)))

        (begin
            (var-set bigKey keyid)
            (var-set connections (filter isIn connects))
            (ok true)
        )
        ;;ok (concat (slice? connects u0 (unwrap! index u1)) (slice? connects (unwrap! index u0) (+ u1 (len connects)))))
))

(define-private (isIn (id principal))
    (not (is-eq id (var-get bigKey)))
)


(define-public (key_matches (user principal))
    (ok 1)
)